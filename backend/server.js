const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);




const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  role:{
    type:String,
    required:true
  }
},{timeseries:true});

const User = mongoose.model('User',userSchema);

app.get("/users", async(req,res)=>{
  try {
    const result = await User.find();
    return res.status(200).json({result:result})
  } catch (error) {
    return res.status(200).json({result:error.message})
  }
})

app.post("/addUser", async(req,res)=>{
  try {
    const {name, role} = req.body;
    if(!name || !role){
      return res.status(400).json({result:"All filed are required"})
    }
    const newUser = new User({name,role});
    const result = await newUser.save();
    if(!result){
      return res.status(500).json({result:"Try Again"})
    }
    return res.status(201).json({result:"Added successfully"})
  } catch (error) {
    return res.status(500).json({result:error.message})
  }
})


app.get("/user/:id", async(req,res)=>{
  try {
    const {id} = req.params
    if(!id){
      return res.status(400).json({result:"Invalid request"})
    }
    
    const result = await User.findById({_id:id});
    if(!result){
      return res.status(500).json({result:{}})
    }
    return res.status(200).json({result:result})
  } catch (error) {
    return res.status(500).json({result:error.message})
  }
})



app.delete("/user/:id", async(req,res)=>{
  try {
    const {id} = req.params
    if(!id){
      return res.status(400).json({result:"Invalid request"})
    }
    
    const result = await User.findByIdAndDelete({_id:id});
    if(!result){
      return res.status(500).json({result:"Try Again"})
    }
    return res.status(200).json({result:'deleted successfully'})
  } catch (error) {
    return res.status(500).json({result:error.message})
  }
})


app.patch("/user/:id", async(req,res)=>{
  try {
    const {id} = req.params;

    const {name, role} = req.body;
    if(!name || !role){
      return res.status(400).json({result:"All filed are required"})
    }

    if(!id){
      return res.status(400).json({result:"Invalid request"})
    }
    
    const result = await User.findOneAndUpdate({_id:id},{name, role});
    if(!result){
      return res.status(500).json({result:"Invalid request"})
    }
    return res.status(200).json({result:'Updated successfully'})
  } catch (error) {
    return res.status(500).json({result:error.message})
  }
})



app.use("/", (req,res)=>{
  res.send("server is running")
});

const dbConnection = ()=>{
  return mongoose.connect('mongodb://127.0.0.1:27017/employee_db').then((result)=>{
    console.log("db connected successfully")
  }).catch((error)=>{
    console.log("error while connecting db")
  })
}


const port = 5000;
// dbConnection();
app.listen(port, ()=>{
  dbConnection().then((res)=>{
    console.log(`server is running on port ${port}`)

  }).catch((error)=>{
    console.log("error while connecting db")
  })
});


