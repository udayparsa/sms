import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentDept, setStudentDept] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', {
        Student_id: studentId,
        Student_name: studentName,
        Student_dept: studentDept,
        phonenumber: phoneNumber,
        email: email,
      });
      setStatus('success');
      setError(''); // Clear any previous errors
    } catch (error) {
      setStatus(''); // Clear any previous success messages
      if (error.response) {
        setError(`Error: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        setError('Error: No response received from server.');
      } else {
        setError(`Error: ${error.message}`);
      }
    }
  };
  

  return (
    <div style={styles.container}>
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="studentId" style={styles.label}>Student ID:</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="studentName" style={styles.label}>Name:</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="studentDept" style={styles.label}>Department:</label>
          <input
            type="text"
            id="studentDept"
            name="studentDept"
            value={studentDept}
            onChange={(e) => setStudentDept(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="phoneNumber" style={styles.label}>Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Register</button>
        {status === 'success' && <div style={styles.alertSuccess}>Registered successfully</div>}
        {error && <div style={styles.alertError}>{error}</div>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    marginBottom: '5px',
    display: 'block'
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box'
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  alertSuccess: {
    marginTop: '15px',
    color: 'green',
  },
  alertError: {
    marginTop: '15px',
    color: 'red',
  }
};
