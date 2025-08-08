import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import API from "../Services/Api";

const schema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  mobileNumber: yup.string().required(),
  role: yup.string().required(),
  password: yup.string().min(6).required()
});

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const res = await API.post("/auth/register", data);
      localStorage.setItem("token", res.data.token);
     
      
        if (res.data.user.role === "employee") {
      navigate("/employee");
    } else if (res.data.user.role === "student") {
      navigate("/test");
    } else {
      navigate("/");
    }
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-lg rounded space-y-4 w-96">
        <input placeholder="Full Name" {...register("fullName")} className="border p-2 w-full"/>
        <p className="text-red-500">{errors.fullName?.message}</p>

        <input placeholder="Email" {...register("email")} className="border p-2 w-full"/>
        <p className="text-red-500">{errors.email?.message}</p>

        <input placeholder="Mobile Number" {...register("mobileNumber")} className="border p-2 w-full"/>
        <p className="text-red-500">{errors.mobileNumber?.message}</p>

        <select {...register("role")} className="border p-2 w-full">
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="employee">Employee</option>
        </select>
        <p className="text-red-500">{errors.role?.message}</p>

        <input type="password" placeholder="Password" {...register("password")} className="border p-2 w-full"/>
        <p className="text-red-500">{errors.password?.message}</p>

        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Register</button>
      </form>
    </div>
  );
}
