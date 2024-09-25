const express=require('express');
const router=express.Router();
const Courses=require('../Models/coursemodel');
const csvtojson=require('csvtojson');
const multer=require('multer'); //to post the data in csv file format
//posting the data to the database through postman
router.post('/',async(req,res)=>{
    try{
        const course=new Courses(req.body);
        await course.save();
        res.status(200).json(course);

    }
    catch(error){
        res.status(400).json({message:error.message})
    }
});

//getting the data
router.get('/',async(req,res)=>{
    try{
        const course=await Courses.find();
        res.json(course)

    }
    catch(error){
        res.status(400).json({message:error.message})
    }

});

//to get the data by searching  
async function getCourses(req,res,next){
    let course;
    try{
        course=await Courses.findById(req.params.id)
        if(course==null){
            return res.status(404).json({message:"Record not found"})

        }
    }
    catch(error){
        return res.status(400).json({message:error.message})
    }
    res.course=course;
    next();
}
//getting through id
router.get('/:id',getCourses,async(req,res,next)=>{
    res.json(res.course)
})
//updating the data by using put function by ID
router.put('/:id',getCourses,async (req,res)=>{
    if(req.body.coursecode!=null){//checking wheather the coursecode is empty or not
        res.course.coursecode=req.body.coursecode;
    }
    if(req.body.coursename!=null){//checking wheather the coursename is empty or not
        res.course.coursename=req.body.coursename;
    }
    if(req.body.year!=null){ //checking wheather the year is empty or not
        res.course.year=req.body.year;
    }
    try{
        const updatedCourse=await res.course.save();
        res.json(updatedCourse)

    }
    catch(error){
        res.status(400).json({message:error.message})
    }

})
//deleting the data by using delete function
router.delete('/:id',getCourses,async(req,res)=>{
    try{
        await res.course.deleteOne(); //removing from the database
        res.json({message:"Course deleted successfully"})

    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})
//uploading of csv file BULK uploading
const storage=multer.memoryStorage();//giving storage to the csv file
const upload=multer({storag:storage.storag})
router.post('/upload',upload.single('file'),async(req,res)=>{
    if(!req.file){//checking wheather the file is empty or not
        return res.status(400).json('no file uploaded');
    }
    try{
        const jsnarray=await csvtojson().fromString(req.file.buffer.toString());
        await Courses.insertMany(jsnarray);
        res.json({message:"Csv file uploaded successfully"});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})

module.exports=router;