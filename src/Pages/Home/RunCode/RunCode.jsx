import { useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const RunCode = () => {
  const [code, setCode] = useState("");
  const [runtime, setRuntime] = useState("");
  const [isMaxLengthReached, setIsMaxLengthReached] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const codeDetails = {
      code,
      input: "", 
      lang:
        runtime === "py"
          ? "Python"
          : runtime === "cpp"
          ? "C++"
          : runtime === "js"
          ? "JavaScript"
          : "",
      inputRadio: "false", 
    };

    try {
      const response = await axiosPublic.post("/compilecode", codeDetails);
      if (response.data.error) {
        setError(response.data.error);
        setResult("");
      } else {
        setError("");
        setResult(response.data.output);
      }
    } catch (error) {
      setError("An error occurred during code submission.");
      setResult("");
    }
  };

  const handleCodeChange = (e) => {
    const value = e.target.value;
    setCode(value);
    setIsMaxLengthReached(value.length >= 10000);
  };

  const handleReset = () => {
    setCode("");
    setRuntime("");
    setError("");
    setResult("");
  };

  return (
    <div className="my-5">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Code Submission Form</h1>
      </div>
      <form className="container mx-auto p-4" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
          <div>
            <label className="label">
              <span className="label-text">Your Code</span>
            </label>
            <textarea
              placeholder="Code"
              className="textarea textarea-bordered textarea-lg w-full min-w-96 min-h-64"
              value={code}
              maxLength={10000}
              disabled={isMaxLengthReached}
              onChange={handleCodeChange}
            ></textarea>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Select Your runtime</span>
            </label>
            <select
              label="Select runtime"
              value={runtime}
              className="select select-bordered"
              onChange={(e) => setRuntime(e.target.value)}
            >
              <option value="" disabled selected>
                Select a runtime
              </option>
              <option value="py">Python</option>
              <option value="cpp">C++</option>
              <option value="js">JavaScript</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button type="submit" className="btn btn-neutral text-white mr-4">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-error text-white ml-4"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
      <div className="text-center font-bold">
        {error && <p className="text-red-600">{error}</p>}
        {result && <p className="text-green-600">{result}</p>}
      </div>
    </div>
  );
};

export default RunCode;
