import React, { useEffect } from "react";
import logo from "../assets/image.png";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("auth user updated", user);
  }, [user]);

  const handleLogout = () => {
    if (logout) {
      logout();
    } else {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <div className="p-3 flex flex-wrap gap-4 justify-between items-center bg-white shadow">
      {/* Logo */}
      <img src={logo} alt="Logo" className="h-16 sm:h-20" />

      {/* User email */}
      <div className="text-gray-700 font-semibold text-sm sm:text-base">
        {user?.email || ""}
      </div>

      {/* Enrollment ID for students */}
      {user && user.role === "student" && (
        <div className="font-semibold text-blue-600 text-sm sm:text-base">
          Enrollment ID: {user.enrollmentId}
        </div>
      )}

      {/* Logout Button */}
      {user && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm sm:text-base"
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Navbar;
