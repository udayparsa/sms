const express=require('express');
const Register=require('../Models/registermodel');
const router=express.Router();

router.post("/", async (req, res) => {
    try {
      const register = new Register(req.body);
      await register.save();
      res.status(200).json(register);
    } catch (error) {
      console.error('Error:', error); // Log the error
      res.status(400).json({ message: error.message });
    }
  });


  router.post('/login', (req, res) => {
    const { Student_id, password } = req.body;
    Student.findOne({ Studentid: Studentid })
      .then(user => {
        if (user) {
          if (user.password === password) {
            res.json("Success login");
          } else {
            res.json("Password is incorrect");
          }
        } else {
          res.json("No Student Found");
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json("Server Error");
      });
  });
  


module.exports=router;