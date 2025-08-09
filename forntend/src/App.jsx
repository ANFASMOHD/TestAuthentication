import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Test from "./Pages/Test";
import Result from "./Pages/Result"; // ✅ Correct import

import Home from "./Pages/WelcomePage";
import ProtectedRoute from "./Components/ProtectedRoute";
import EmplyeeDash from "./Pages/EmplyeeDash";
import WelcomePage from "./Pages/WelcomePage";

export default function App() {


  return (
    <Router>
      <Routes>
     
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}

           <Route
          path="/welcome"
          element={
            <ProtectedRoute>
           <WelcomePage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/test"
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          }
        />
        <Route allowedRoles={[""]}
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmplyeeDash/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>

  );
}
