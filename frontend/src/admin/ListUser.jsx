import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ListUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const GetDeleted = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(prev => prev.filter(user => user.id !== id));
      setSuccessMessage(res.data.message);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      alert("Error while deleting");
    }
  };

  return (
    <div className="mt-3">
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMessage}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setSuccessMessage("")}></button>
        </div>
      )}

      <h2 className="mb-3">List of Users</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Age</th>
              <th>Course</th>
              <th>Address</th>
              <th>Work Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.mobile}</td>
                  <td>{user.age}</td>
                  <td>{user.course}</td>
                  <td>{user.address}</td>
                  <td>{Array.isArray(user.worktype) ? user.worktype.join(", ") : user.worktype}</td>
                  <td>
                    {user.status === 0 ? (
                      <span className="badge bg-danger">Inactive</span>
                    ) : (
                      <span className="badge bg-success">Active</span>
                    )}
                  </td>
                  <td><div className="d-flex gap-2">
                    <button className="btn btn-primary" onClick={() => navigate(`/adduser`, { state: { id: user.id.toString() } })}>Edit</button>
                    <button className="btn btn-dark" onClick={() => GetDeleted(user.id)}>Delete</button>
                  </div></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
