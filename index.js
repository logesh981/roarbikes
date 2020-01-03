const express = require('express');
const hbs=require('hbs')
const cookieParser = require('cookie-parser')
const auth=require('./src/midedleware/auth')
const app = express();
require('./src/db/mongoose')
const {sendWelcomeEmail,sendOrderEmail,feedbackMail}=require('./src/email/email')
const User=require('./src/models/user')
const Service=require('./src/models/task')
const path = require('path');
const pathDirectory=path.join(__dirname,'./public')
const viewsPath=path.join(__dirname,'./templates/views')
app.set('view engine', 'hbs')
app.set('views',viewsPath)
app.use(express.static(pathDirectory))


app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
//const router = express.Router()
app.get('/aboutus',(req,res)=>{
  res.render('aboutus')
})
app.get('/',(req,res)=>{
  
    res.render('index')
    //__dirname : It will resolve to your project folder.
  });
app.get('/contactus',(req,res)=>{
  res.render('contactus')
})
app.post('/contactus',(req,res)=>{
  try{
    console.log(req.body)
    feedbackMail(req.name,req.email,req.message)
  res.render('index')}
  catch{
    res.send("An error Occured while sending your Message")
  }
  
})
app.get('/signup',(req,res)=>{
  res.render('Signup')
})
app.post('/signup',async (req,res)=>{

  const user=new User(req.body)
  try{
    const user=new User(req.body)
    await user.save()
    sendWelcomeEmail(user.email,user.username)
    const token= await user.generateAuthToken()
    res.cookie('auth_token', token)
    res.render('dashboard',{username:user.username})
  }catch(e){
    res.send("A Error occured").status(404)
  }
})
app.get('/login',(req,res)=>{
  res.render('login')
})
app.post('/login',async (req,res)=>{
  try{
  const user=await User.findByCredentials(req.body.email,req.body.password)
  const token= await user.generateAuthToken()
  
  if(user){
    res.cookie('auth_token', token)
    res.render('dashboard',{username:user.username})
  }
  else{  
    res.send('Could not find user').status(400)
    
  }
}catch(e){
  res.send("Cannot login, Please use correctcredentials").status(400)
}
})
app.get("/bookonline",auth,(req,res)=>{
  res.render('bookonline')
})
app.post("/bookonline",auth,async (req,res)=>{
  try{const service=new Service({
    ...req.body,owner:req.user._id  
  })
  
  await service.save()
  sendOrderEmail(req.user.email,req.user.username)
  res.render('dashboard',{message:'Order received',username:req.user.username})
}
catch{
  res.send("uh!oh an unknown error occured").status(400)
}
})
app.get("/logout",auth,async(req,res)=>{
  try{
  res.cookie('auth_token', '')
  req.user.tokens=req.user.tokens.filter((token)=>{
      return token.token!==req.token
  })
  await req.user.save()
  res.render('index')
}catch(e){
 res.status(500).send()
}
})

app.get("/logoutall",auth,async(req,res)=>{
  try{
  res.cookie('auth_token', '')
  req.user.tokens=[]
  await req.user.save()
  res.render('index')
}catch(e){
 res.status(500).send()
}
})

app.listen(process.env.port || 3000,()=>{
      console.log("Server running on 3000")
});