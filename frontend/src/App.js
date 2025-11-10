// frontend/src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [editId, setEditId] = useState(null);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/students");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/api/students/update/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/api/students/add", form);
    }
    setForm({ name: "", email: "", age: "" });
    fetchStudents();
  };

  const handleEdit = (student) => {
    setForm(student);
    setEditId(student.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/delete/${id}`);
    fetchStudents();
  };

  return (
    <div style={{ width: "600px", margin: "50px auto" }}>
      <h2>📚 Student CRUD App</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <table border="1" width="100%" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.age}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
