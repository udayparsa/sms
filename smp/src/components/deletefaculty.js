import React from 'react'
import Axios from 'axios';
import { Button, Card, Divider, FormLabel, Paper, Stack, TextField,Alert, Grid, CardContent, Typography} from '@mui/material'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import {useEffect, useState} from 'react'
import UpdateIcon from '@mui/icons-material/Update';
export default function Viewfaculty() {
  const [data,setData]=useState([]);
  const [status,setStatus]=useState(false);//upload

 
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await Axios.get('http://localhost:5000/api/faculty')//grtting the data through axios by using the postman link
        setData(response.data);//all the data is storing in the setData

      }catch(error){
        console.log(error.message)
      }
    };
    fetchData();

  },[])
  const handleDelete = async (_id, data, setData) => {
    try {
        await Axios.delete(`http://localhost:5000/api/faculty/${_id}`);
        const updateData = data.filter(item => item._id !== _id);
        setData(updateData);
    } catch (error) {
        console.error("error deleting item", error);
    }
}
  return (
    <div>
       <h1 style={{textAlign:"center"}}> Delete faculty</h1>
       <Stack><Paper elevation={6} style={{marginTop:1}} sx={{height:'258vh',width:'170vh',backgroundColor:'#92C7CF' }}>
                <h1 align="center"><font color="#7D0A0A"> Faculty Data </font></h1> 
                <Grid container spacing={1} sx={{m:1}}>
                  {
                data.map((item,index)=>{//rendering the data
                        return(
                          <Grid item xs={2} sm={2} md={4} key={index}>
                          <Card sx={{backgroundColor:'#F9E897'}}>
                            <CardContent>
                              <Typography variant='h6' components='h5'> 
                              Faculty_id: {item.faculty_id}
                              </Typography>
                              <Typography color="primary"> 
                               Facultyname:{item.faculty_name}
                              </Typography>
                              <Typography color="textsecondary"> 
                               FacultyDEPT:{item.faculty_dept}
                              </Typography>
                              <Typography color="textsecondary"> 
                               Qualification:{item.qualification}
                              </Typography>
                              <Typography color="textsecondary"> 
                               Designation:{item.designation}
                              </Typography>
                              <Typography color="textsecondary"> 
                               Email:{item.email}
                              </Typography>
                              <Typography color="textsecondary"> 
                               Password:{item.password}
                              </Typography>
                              <Stack direction="row" spacing={2}>
                              <Button onClick={()=>handleDelete(item._id)} variant='outlined' startIcon={<DeleteSharpIcon/>} sx={{backgroundColor:'#67C6E3'}}></Button>
                              {status&&<Alert  severity="success">Faculty deleted successfully</Alert>}
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