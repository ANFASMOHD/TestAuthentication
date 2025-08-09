import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import API from "../Services/Api";
import { useAuth } from "../Context/AuthContext";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobileNumber: yup.string().required("Mobile number is required"),
  role: yup.string().required("Please select a role"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
});

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const res = await API.post("/auth/register", data);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user); // Update AuthContext immediately

      if (res.data.user.role === "employee") {
        navigate("/employee");
      } else if (res.data.user.role === "student") {
        navigate("/welcome");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm"
      >
        {/* Title */}
        <h2 className="text-center text-2xl font-bold mb-6">
          Register
          <span className="block w-16 h-1 bg-yellow-500 mx-auto mt-1 rounded"></span>
        </h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Full Name</label>
          <input
            placeholder="Enter your name"
            {...register("fullName")}
            className="border rounded-lg p-2 w-full outline-none"
          />
          <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Email</label>
          <input
            placeholder="Enter your email"
            {...register("email")}
            className="border rounded-lg p-2 w-full outline-none"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        {/* Mobile Number */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Mobile Number</label>
          <div className="flex border rounded-lg overflow-hidden">
            <span className="flex items-center px-3 bg-gray-100 border-r">🇮🇳 +91</span>
            <input
              type="text"
              placeholder="Enter your phone number"
              {...register("mobileNumber")}
              className="flex-1 p-2 outline-none"
            />
          </div>
          <p className="text-red-500 text-sm">{errors.mobileNumber?.message}</p>
        </div>

        {/* Role Selection */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Current Status</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" value="student" {...register("role")} />
              Student
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="employee" {...register("role")} />
              Employee
            </label>
          </div>
          <p className="text-red-500 text-sm">{errors.role?.message}</p>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            {...register("password")}
            className="border rounded-lg p-2 w-full outline-none"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-blue-900 text-white w-full py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Save
        </button>

        {/* Login Link */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-medium hover:underline">
            Login Now
          </Link>
        </p>
      </form>
    </div>
  );
}
