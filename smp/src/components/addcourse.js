import { Button, Card, Divider, FormLabel, Paper, Stack, TextField,Alert, Grid, CardContent, Typography} from '@mui/material'
import React,{useEffect, useState} from 'react'
import Axios from 'axios'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import UpdateIcon from '@mui/icons-material/Update';
export default function Addcourse() {
  const [file,setFile]=useState(null);//file
  const [status,setStatus]=useState(false);//upload
  const [data,setData]=useState([]);//to show in grids
  const [coursecode,setCourseCode]=useState('');
  const [coursename,setCourseName]=useState('');
  const [year,setYear]=useState('');

  //choosing the file
  function handleFileChange(event){
    setFile(event.target.files[0])
}
 //posting the data
 const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post('http://localhost:5000/api/course', {
        coursecode: coursecode,
        coursename: coursename,
        year: year,
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
   //for uploading the csv file
   const handleUpload = async () =>{
    if(!file)return;
    const formData=new FormData();
    formData.append('file',file);
    try{
      await Axios .post('http://localhost:5000/api/course/upload',formData,{
        headers:{
          'content-type':'multipart/form-data'
        },
      });
      setStatus(true);
    }
    catch(error){
      console.error('error upload data:',error)
    }

  }

  return (
    <div>
        <Stack direction="row" spacing={3} style={{marginLeft:35,marginTop:35}}>
        <Paper elevation={6} sx={{ ml: 15, mt: 15, height: '85vh', width: '30%', backgroundColor: '#92C7CF' }}>
      <Stack direction="column" spacing={2} sx={{ p: 3 }}>
        <h1 align="center" style={{ color: '#7D0A0A' }}>Course Bulk Posting</h1>
        <Paper sx={{ backgroundColor: '#F9E897', m: 3, p: 2 }}>
          <FormLabel>File Upload in CSV Format Only</FormLabel>
          <TextField type="file" name='file' onChange={handleFileChange} label="Browse" fullWidth margin="normal" />
          <Button onClick={handleUpload} variant="contained" sx={{ mt: 1 }}>Upload</Button>
         { status && <Alert severity="success">CSV FILE UPLOAD SUCCESSFULLY</Alert>}
        </Paper>
        <Divider sx={{ backgroundColor: '#7D0A0A', my: 2 }} />
        <Paper sx={{ backgroundColor: '#F9E897', p: 1, overflow: 'auto' }}> 
      <Card sx={{ p: 1, backgroundColor: '#F9E897', boxShadow: 'none' }}> 
        <Stack direction="column" spacing={2}>
          <TextField
            label="Course Code"
            fullWidth
            margin="dense" 
            variant="outlined"
            onChange={(e)=>{setCourseCode(e.target.value)}}
          />
          <TextField
            label="Course Name"
            fullWidth
            margin="dense" 
            variant="outlined"
            onChange={(e)=>{setCourseName(e.target.value)}}
          />
          <TextField
            label="Year"
            fullWidth
            margin="dense" 
            variant="outlined"
            onChange={(e)=>{setYear(e.target.value)}}
          />
          <Button variant="contained" sx={{ mt: 1 }} onClick={handleSubmit}>POST</Button> 
          {status&&<Alert  severity="success">Course insert successfully</Alert>}
        </Stack>
      </Card>
    </Paper>
            </Stack>
            </Paper>
            </Stack>
</div>
  )
}
