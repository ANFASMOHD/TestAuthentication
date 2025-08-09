import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import API from "../Services/Api";
import { useAuth } from "../Context/AuthContext";

const schema = yup.object().shape({
  mobileNumber: yup.string().required("Mobile number is required"),
  password: yup.string().required("Password is required")
});

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
       if (res.data.user.role === "employee") {
        navigate("/employee");
      } else if (res.data.user.role === "student") {
        navigate("/welcome");
      } else {
        navigate("/");
      }
    } 
    catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm"
      >
      
        <h2 className="text-center text-2xl font-bold mb-6">
          Login
          <span className="block w-12 h-1 bg-yellow-500 mx-auto mt-1 rounded"></span>
        </h2>

      
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Mobile Number
          </label>
          <div className="flex border rounded-lg overflow-hidden">
            <span className="flex items-center px-3 bg-gray-100 border-r">
              🇮🇳 +91
            </span>
            <input
              type="text"
              placeholder="Enter your phone number"
              {...register("mobileNumber")}
              className="flex-1 p-2 outline-none"
            />
          </div>
          <p className="text-red-500 text-sm">{errors.mobileNumber?.message}</p>
        </div>

 
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            {...register("password")}
            className="border rounded-lg w-full p-2 outline-none"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

     
        <button
          type="submit"
          className="bg-blue-900 text-white w-full py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Login
        </button>

      
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 font-medium hover:underline">
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
}
