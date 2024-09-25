import { Button, Card, Divider, FormLabel, Paper, Stack, TextField,Alert, Grid, CardContent, Typography} from '@mui/material'
import React,{useEffect, useState} from 'react'
import Axios from 'axios'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import UpdateIcon from '@mui/icons-material/Update';
export default function Course() {
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
    //getting the data from the mongodb to show on the grids
    useEffect(()=>{
      const fetchData=async()=>{
        try{
          const response=await Axios.get('http://localhost:5000/api/course')//grtting the data through axios by using the postman link
          setData(response.data);//all the data is storing in the setData

        }catch(error){
          console.log(error.message)
        }
      };
      fetchData();

    },[])


      //deleting
    const handleDelete = async (_id, data, setData) => {
      try {
          await Axios.delete(`http://localhost:5000/api/course/${_id}`);
          const updateData = data.filter(item => item._id !== _id);
          setData(updateData);
      } catch (error) {
          console.error("error deleting item", error);
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
            <Paper elevation={6} style={{marginLeft:15,marginTop:1}} sx={{height:'85vh',width:'70%',backgroundColor:'#92C7CF' }}>
                <h1 align="center"><font color="#7D0A0A"> Course Data </font></h1> 
                <Grid container spacing={1} sx={{m:1}}>
                  {
                data.map((item,index)=>{//rendering the data
                        return(
                          <Grid item xs={2} sm={2} md={4} key={index}>
                          <Card sx={{backgroundColor:'#F9E897'}}>
                            <CardContent>
                              <Typography variant='h6' components='h5'> 
                              Coursecode: {item.coursecode}
                              </Typography>
                              <Typography color="primary"> 
                               Coursename:{item.coursename}
                              </Typography>
                              <Typography color="textsecondary"> 
                               Year:{item.year}
                              </Typography>
                              <Stack direction="row" spacing={2}>
                              <Button onClick={()=>handleDelete(item._id)} variant='outlined' startIcon={<DeleteSharpIcon/>} sx={{backgroundColor:'#67C6E3'}}></Button>
                              <Button variant='outlined'startIcon={<UpdateIcon/>} sx={{backgroundColor:'#67C6E3'}}></Button>
                              </Stack>
                            </CardContent>
                          </Card>
                        </Grid>
                        ) 
                })
              }
                </Grid>    
        </Paper>
        </Stack>
    </div>
  )
}
