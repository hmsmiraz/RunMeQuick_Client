import { useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
const RunCode = () => {
  const [code, setCode] = useState("");
  const [runtime, setRuntime] = useState("py");
  const [isMaxLengthReached, setIsMaxLengthReached] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const axiosPublic  =  useAxiosPublic();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const codeDetails = {
    //   code,
    //   runtime,
    // };
    // console.log("Submission:", codeDetails);
    try {
      const response = await axiosPublic.post('/execute-code', { code, runtime });
      setResult(response.data.result);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const handleCodeChange = (e) => {
    const value = e.target.value;
    setCode(value);
    setIsMaxLengthReached(value.length >= 10000); 
  };

  return (
    <div className="my-5">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Code Submission Form</h1>
      </div>
      <form className="container mx-auto p-4" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
          <div>
            <label className="label">
              <span className="label-text">Your Code</span>
            </label>
            <textarea
              placeholder="Code"
              className="textarea textarea-bordered textarea-lg w-full max-w-xs"
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
              <option value="py">Python</option>
              <option value="cpp">C++</option>
              <option value="go">Go</option>
              <option value="js">JavaScript</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-center mt-4">
          <button type="submit" className="btn btn-neutral text-white ">
            Submit
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
