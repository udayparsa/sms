import React from 'react'
import {useEffect, useState} from 'react'
import Axios from 'axios';
import { Alert,Button} from '@mui/material';

export default function Addfaculty() {
  const[status,setStatus]=useState(false);
  const [faculty_id,setFaculty_id]=useState(0);
  const [faculty_name,setFaculty_name]=useState('');
  const [faculty_dept,setFaculty_dept]=useState('');
  const [qualification,setQualification]=useState('');
  const [designation,setDesignation]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
 

//posting data
  const handleSubmits = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post('http://localhost:5000/api/faculty', {
        faculty_id: faculty_id,
        faculty_name: faculty_name,
        faculty_dept: faculty_dept,
        qualification:qualification,
        designation:designation,
        email:email,
        password:password,
      });
      if (response.status === 200) {
        setStatus(true);
      } else {
        console.log('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.log('error sending data', error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };
  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
      <h1>ADD FACULTY</h1>
    <form style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor="faculty_id" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Faculty ID:</label>
      <input type="number" id="faculty_id" name="faculty_id" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} 
      onChange={(e)=>{setFaculty_id(parseInt(e.target.value, 10))}}
       />

      <label htmlFor="faculty_name" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Name:</label>
      <input type="text" id="faculty_name" name="faculty_name" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} 
      onChange={(e)=>{setFaculty_name(e.target.value)}}
      />

      <label htmlFor="faculty_dept" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Department:</label>
      <input type="text" id="faculty_dept" name="faculty_dept" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
      onChange={(e)=>{setFaculty_dept(e.target.value)}}
      />

      <label htmlFor="qualification" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Qualification:</label>
      <input type="text" id="qualification" name="qualification" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
      onChange={(e)=>{setQualification(e.target.value)}}
      />

      <label htmlFor="designation" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Designation:</label>
      <input type="text" id="designation" name="designation" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
      onChange={(e)=>{setDesignation(e.target.value)}}
      />

      <label htmlFor="email" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
      <input type="email" id="email" name="email" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} 
      onChange={(e)=>{setEmail(e.target.value)}}
      />

      <label htmlFor="password" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Password:</label>
      <input type="password" id="password" name="password" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} 
      onChange={(e)=>{setPassword(e.target.value)}}
      />

      <Button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}  onClick={handleSubmits}>Submit</Button>
      {status&&<Alert  severity="success">Faculty inserted successfully</Alert>}

    </form>
  </div>
  
  );
}
