import React from 'react'
import { Button, Card,   Paper, Stack,  Grid, CardContent, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import Axios from 'axios'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import UpdateIcon from '@mui/icons-material/Update';
export default function Viewcourses() {
    const [data,setData]=useState([]);//to show in grids
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


    //deleting the course
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
        <Stack>
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
