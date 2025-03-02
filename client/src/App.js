// client/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [formInput, setFormInput] = useState({
    name: '',
    email: '',
    date: '',
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('/appointments');
      setAppointments(res.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/appointments', formInput);
      setFormInput({ name: '', email: '', date: '' });
      fetchAppointments();
    } catch (err) {
      console.error('Error creating appointment:', err);
    }
  };

  return (
    <div className="App">
      <h1>Book an Appointment</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" id="name" placeholder="Your Name" value={formInput.name} onChange={handleChange} required />
        <input type="email" id="email" placeholder="Your Email" value={formInput.email} onChange={handleChange} required />
        <input type="datetime-local" id="date" value={formInput.date} onChange={handleChange} required />
        <button type="submit">Book Appointment</button>
      </form>

      <h2>All Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            {appointment.name} ({appointment.email}) - {new Date(appointment.date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
