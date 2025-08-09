import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function AddUser() {
  const navigate = useNavigate();
  const location = useLocation();

  const editId = location.state?.id || null;
  const handleChange = (e) => {
    const { name, value, checked, type, files } = e.target;
      
    setFormData((prev) => {
      // ✅ For multi-select checkbox (worktype)
      if (type === "file") {
        return { ...prev, [name]: files[0] };
      }
      if (name === "worktype") {
        let updatedWorkTypes = Array.isArray(prev.worktype) ? [...prev.worktype] : [];

        if (checked) {
          // Add if checked
          if (!updatedWorkTypes.includes(value)) {
            updatedWorkTypes.push(value);
          }
        } else {
          // Remove if unchecked
          updatedWorkTypes = updatedWorkTypes.filter((item) => item !== value);
        }

        return { ...prev, worktype: updatedWorkTypes };
      }

      // ✅ For all other inputs (text, select, radio)
      return { ...prev, [name]: value };
    });
  };


  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mobile: "",
    course: "",
    address: "",
    worktype: [],
    status: "1",
    profile: null,
  });


  useEffect(() => {
    if (editId) {
      axios.get(`http://localhost:5000/api/users/${editId}`)
        .then((res) => {
          const user = Array.isArray(res.data) ? res.data[0] : res.data;
          setFormData({
            name: user.name || "",
            mobile: user.mobile || "",
            age: user.age || "",
            course: user.course || "",
            address: user.address || "",
            worktype: user.worktype ? user.worktype.split(",") : [],
            status: String(user.status ?? "1"),
            profile: null, 
          });
        })
        .catch((err) => console.error(err));
    }
  }, [editId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

     const form = new FormData();
    form.append("name", formData.name);
    form.append("mobile", formData.mobile);
    form.append("age", formData.age);
    form.append("course", formData.course);
    form.append("address", formData.address);
    form.append("status", formData.status);
    formData.worktype.forEach((item) => form.append("worktype[]", item));
    if (formData.profile) {
      form.append("profile", formData.profile);
    }
    if (editId) {
      form.append("id", editId);
    }

    console.log(formData);

    try {
      if (!editId) {
        const res = await axios.post("http://localhost:5000/api/users", formData);
        navigate("/listuser", { state: { message: res.data.message } });
      } else {
        const res = await axios.patch("http://localhost:5000/api/users", formData);
        navigate("/listuser", { state: { message: res.data.message } });
      }

    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };
const element = <h1>Hello, world!</h1>;

  return (
    <form
      className="card border-top border-0 border-4 border-primary"
      onSubmit={handleSubmit}
    >
      <div className="card-body p-4">
        <h5 className="mb-0 text-uppercase">{editId ? "Edit User" : "Add User"}</h5>
        <hr />

        <div className="row g-3">
          {/* Name */}
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" value={formData.name} onChange={handleChange} name="name" required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Mobile</label>
            <input type="text" className="form-control" value={formData.mobile} onChange={handleChange} name="mobile" required />
          </div>
          
          <div className="col-md-6">
            <label className="form-label">Profile</label>
            <input type="file" className="form-control" value={formData.profile} onChange={handleChange} name="profile" required />
          </div>

          {/* Age */}
          <div className="col-md-6">
            <label className="form-label">Age</label>
            <input type="text" className="form-control" value={formData.age} onChange={handleChange} name="age" required />
          </div>

          {/* Course */}
          <div className="col-6">
            <label className="form-label">Select Course</label>
            <select className="form-select" name="course" value={formData.course} onChange={handleChange} required>
              <option value="">Select a course</option>
              <option value="React">React</option>
              <option value="Node.js">Node.js</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
            </select>
          </div>

          {/* Address */}
          <div className="col-md-6">
            <label className="form-label">Address</label>
            <textarea className="form-control" name="address" value={formData.address} onChange={handleChange} />
          </div>

          {/* Work Type */}
          <div className="col-6">
            <label className="form-label width-100">Work Type</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="worktype" id="worktype1"
                  value="On-Site" onChange={handleChange} checked={formData.worktype?.includes("On-Site")}
                />
                <label className="form-check-label" htmlFor="worktype1">On-Site</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="worktype" id="worktype2"
                  value="Remote" onChange={handleChange} checked={formData.worktype?.includes("Remote")}
                />
                <label className="form-check-label" htmlFor="worktype2">Remote</label>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="col-6">
            <label className="form-label width-100">Status</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status" id="status1"
                  value="1" onChange={handleChange} checked={formData.status === "1"}
                />
                <label className="form-check-label" htmlFor="status1">Active</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status" id="status2"
                  value="0" onChange={handleChange} checked={formData.status === "0"}
                />
                <label className="form-check-label" htmlFor="status2">Inactive</label>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
