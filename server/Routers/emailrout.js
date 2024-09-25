const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

var otpStore='';
const transporter = nodemailer.createTransport((
    {
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:"udayparsa69@gmail.com",
            pass:"gvolhvlljcgxqopl"
        }
    }
));

function generateOpt(){
    return Math.floor(1000+Math.random()*900000).toString();

}
router.post("/",async(req,res)=>{
  try{
    const email=req.body.email;
      const otp=generateOpt();
      otpStore=otp;
      console.log(otp);
      const mailOption ={
          from:"udayparsa@gmail.com",
          to:email,
          subject:"REAL-ESTATE OTP verification",
          text:`Hii! Dear customer,\n  please verify the OTP  :${otp} to move nexts steps. \n thank you for visting ☺️.\n please dont share the otp to anyone else for your saftey`,
      };
      try{
     await transporter.sendMail(mailOption,( err,info)=>{
  if(err){
  console.log(err);
  return;
  }
  console.log(`OPT SENT SUCCESSFULLY TO YOU MAIL ${email}`);
     });
     return res.status(200).json({
  message:'OTP SENT SUCCESSFULLY'
      })}
      catch(err){
  console.error("Error sending OTP: " ,err);
   return res.status(404).json({success:false,message:"Error sending OTP"});
  
      }    
} catch (error) {
    res.status(500).json({ message: error.message });
}
});


router.post("/verify-otp",async(req,res)=>{
    const otp = req.body.otp;
  // Get the expected OTP from memory
  const expectedOTP = otpStore;
  // expected OTP is not set, return an error
  if (!expectedOTP) {
    res.status(400).json({
      message: "Expected OTP not set.",
    });
    return res.status(400);
  }
  console.log(otp);
  console.log(expectedOTP);
  // Verify the OTP
  if (otp !== expectedOTP) {
    res.status(401).json({
      message: "OTP is invalid.",
    });
    return;
  }
  return res.status(200).json({
    status: 200,
    message: "OTP verified successfully.",
  });
});

module.exports= router;