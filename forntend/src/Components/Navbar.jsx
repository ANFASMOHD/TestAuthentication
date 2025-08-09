import React ,{useEffect}from "react";
import logo from "../assets/image.png";
import { useAuth } from "../Context/AuthContext";


function Navbar() {
  const { user } = useAuth();
  useEffect(() => {
  console.log("auth user updated", user);
}, [user]);

  return (
    <div className="p-3 flex justify-between items-center bg-white shadow">
      <img src={logo} alt="Logo" className="h-20" />
      <div className="text-gray-700 font-semibold">
        {user ? user.email : ""}
      


      </div>
      {user && user.role === 'student' ?  (
        <div className="font-semibold text-blue-600">
          Enrollment ID: {user.enrollmentId}
        </div>
      ) : ""}
    </div>
  );
}

export default Navbar;
