import React, { useEffect, useState } from "react";
import API from "../Services/Api";
import Navbar from "../Components/Navbar";

function EmplyeeDash() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get("/user/details")
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p className="text-blue-700 font-semibold text-center mt-10">
        Loading employees...
      </p>
    );
  if (error)
    return (
      <p className="text-red-600 font-semibold text-center mt-10">
        Error: {error}
      </p>
    );

  return (

   <>
   <Navbar/>
      <div className="p-6 max-w-full overflow-x-auto">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Employee Dashboard</h2>
        <table className="min-w-full border border-blue-300 rounded-md shadow-md">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Test Mark</th>
              <th className="py-3 px-6 text-left">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No employees found.
                </td>
              </tr>
            ) : (
              employees.map((emp, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-blue-50"}
                >
                  <td className="py-3 px-6 border-t border-blue-300">{emp.fullName}</td>
                  <td className="py-3 px-6 border-t border-blue-300">{emp.email}</td>
                  <td className="py-3 px-6 border-t border-blue-300">
                    {emp.testMark !== null ? emp.testMark : "N/A"}
                  </td>
                  <td className="py-3 px-6 border-t border-blue-300">
                    {Array.isArray(emp.feedbacks) && emp.feedbacks.length > 0 ? (
                      <ul>
                        {emp.feedbacks.map((fb, i) => (
                          <li key={i}>
                            {fb.emoji ? <span>{fb.emoji} </span> : null}
                            {fb.comment ? <span>{fb.comment}</span> : null}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400">No feedback</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
   </>
  );
}

export default EmplyeeDash;
