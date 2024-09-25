const express=require('express');
const Faculty=require('../Models/facultymodel');
const router=express.Router();

router.post("/",async(req,res)=>{
    try{
        const faculty=new Faculty(req.body);
        await faculty.save();
        res.status(200).json(faculty);
    }catch(error){
        res.status(400).json({message:error.message})
    }
});
module.exports=router;


//getting faculty data
router.get('/',async(req,res)=>{
    try{
        const faculy=await Faculty.find();
        res.json(faculy)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
});
async function getFaculty(req,res,next){
    let faculty;
    try{
        faculty=await Faculty.findById(req.params.id)
        if(faculty==null){
            return res.status(404).json({message:"Record not found"})

        }
    }
    catch(error){
        return res.status(400).json({message:error.message})
    }
    res.faculty=faculty;
    next();
}
//getting through id
router.get('/:id',getFaculty,async(req,res,next)=>{
    res.json(res.faculty)
})
//deleting the data
router.delete('/:id',getFaculty,async(req,res)=>{
    try{
        await res.faculty.deleteOne(); //removing from the database
        res.json({message:"faculty deleted successfully"})

    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})