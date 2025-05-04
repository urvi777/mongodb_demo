import { useState } from 'react'
import axios from 'axios'
import DemoData from './DemoData'
import './App.css'

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

function App() {
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'demo'

  return (
    <div className="container">
      <div className="tabs">
        <button 
          className={activeTab === 'users' ? 'active' : ''} 
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button 
          className={activeTab === 'demo' ? 'active' : ''} 
          onClick={() => setActiveTab('demo')}
        >
          Demo Data
        </button>
      </div>

      {activeTab === 'users' ? <UserManagement /> : <DemoData />}
    </div>
  )
}

// User Management Component
function UserManagement() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  })
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/users', formData)
      setMessage('User added successfully!')
      setError('')
      setFormData({ name: '', email: '', age: '' })
      fetchUsers()
    } catch (error) {
      setError(error.response?.data?.message || 'Error adding user')
      setMessage('')
      console.error('Error:', error)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users')
      setUsers(response.data.data)
      setMessage('Users fetched successfully!')
      setError('')
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching users')
      setMessage('')
      console.error('Error:', error)
    }
  }

  return (
    <>
      <h1>User Management System</h1>
      
      <div className="form-container">
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit">Add User</button>
        </form>
      </div>

      <div className="users-container">
        <h2>User List</h2>
        <button onClick={fetchUsers}>Fetch Users</button>
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}
        <div className="users-list">
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Age:</strong> {user.age}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
