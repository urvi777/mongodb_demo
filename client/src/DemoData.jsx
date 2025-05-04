import { useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

function DemoData() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    status: 'active'
  });
  const [demoData, setDemoData] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/demo-data', formData);
      setMessage('Demo data added successfully!');
      setError('');
      setFormData({ title: '', description: '', category: '', status: 'active' });
      fetchDemoData();
    } catch (error) {
      setError(error.response?.data?.message || 'Error adding demo data');
      setMessage('');
      console.error('Error:', error);
    }
  };

  const fetchDemoData = async () => {
    try {
      const response = await api.get('/demo-data');
      setDemoData(response.data.data);
      setMessage('Demo data fetched successfully!');
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching demo data');
      setMessage('');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h1>Demo Data Management</h1>
      
      <div className="form-container">
        <h2>Add New Demo Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <button type="submit">Add Demo Data</button>
        </form>
      </div>

      <div className="demo-data-container">
        <h2>Demo Data List</h2>
        <button onClick={fetchDemoData}>Fetch Demo Data</button>
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}
        <div className="demo-data-list">
          {demoData.map((item) => (
            <div key={item._id} className="demo-data-card">
              <p><strong>Title:</strong> {item.title}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Status:</strong> {item.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DemoData; 