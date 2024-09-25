import { Route, Routes } from "react-router-dom";
import Course from "./components/Course";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Student from "./components/student"
import Faculty from "./components/faculty";
import Viewcourses from "./components/viewcourses";
import Addfaculty from "./components/addfaculty";
import Viewfaculty from "./components/viewfaculty";
import Deletefaculty from "./components/deletefaculty";
import Updatefaculty from "./components/updatefaculty";
import Addcourse from "./components/addcourse";
import Register from "./components/register";
function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/courses" element={<Course/>}/>
        <Route path="/add" element={<Addcourse/>}/>
        <Route path='/view' element={<Viewcourses/>}/>
        <Route path="/faculty" element={<Faculty/>}/>
        <Route path="/faculty/addfaculty"e element={<Addfaculty/>}/>
        <Route path="/faculty/viewfaculty"e element={<Viewfaculty/>}/>
        <Route path="/faculty/editfaculty"e element={<Updatefaculty/>}/>
        <Route path="/faculty/deletefaculty"e element={<Deletefaculty/>}/>
        <Route path="/students" element={<Student/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
