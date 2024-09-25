const express=require('express');
const mongoose=require('mongoose'); //using the functions from the mongoose to connect with mongodb
const bodyParser=require('body-parser');//to convert the data into json format
const cors=require('cors');// able to open the project in public ip adderss
const courseRoute=require('./Routers/courseroute');
const email=require('./Routers/emailrout');
const register=require('./Routers/registerrouter');
const app=express();
const facultyroute=require('./Routers/facultyroute');
app.use(bodyParser.json());
app.use(cors());
//connecting nodejs and mongodb
const MONGO_URI='mongodb+srv://udaykumarparsa:uday3535@cluster0.1junhfd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGO_URI,{
    useNewURlParser:true,
    useUnifiedTopology:true,
});
const db=mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error:'))
app.use('/api/course',courseRoute)
app.use('/api/faculty',facultyroute)
app.use('/email',email)
app.use('/register',register)

app.listen(5000,() => {
    console.log('server is running on port 5000');
})


