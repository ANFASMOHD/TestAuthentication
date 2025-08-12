import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

function WelcomePage() {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/test"); 
  };

  return (
<>
<Navbar/>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center">
     
        <h1 className="text-4xl font-bold mb-2">
          Welcome to{" "}
          <span className="text-black">TSEEP</span>{" "}
          <span className="underline decoration-yellow-500">Mastery Box</span>
        </h1>
        <p className="text-gray-500 mb-8">
          Unlock your potential with <span className="font-semibold">AI inspired tool</span>
        </p>
  
     
        <hr className="w-full max-w-2xl border-gray-300 mb-6" />
  
      
        <div className="flex items-center justify-center gap-2 mb-6">
          <input
            type="checkbox"
            id="terms"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="w-4 h-4"
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I confirm that I have read and accept the{" "}
            <span className="font-semibold">terms and conditions</span> and{" "}
            <span className="font-semibold">privacy policy</span>.
          </label>
        </div>
  
     
        <button
          onClick={handleStart}
          disabled={!isChecked}
          className={`px-6 py-2 rounded transition-all ${
            isChecked
              ? "bg-blue-900 text-white hover:bg-blue-800"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Get Started
        </button>
      </div>
</>
  );
}

export default WelcomePage;
