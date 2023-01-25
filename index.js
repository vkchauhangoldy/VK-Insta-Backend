const express = require('express')
const mongoose = require('mongoose')
const Post = require('./models/posts')
const path = require("path")
const port = 3030 || process.env.PORT
const cors = require("cors")
const fileUpload = require("express-fileupload")
const url = "mongodb+srv://vkgoldy:vkgoldy@vk-insta-clone.wsslkmn.mongodb.net/?retryWrites=true&w=majority"

const app = express()
app.use(cors())

//using cors
app.use(express.json())
app.use(fileUpload())

mongoose.set('strictQuery', true)
mongoose.connect(url, (err) => {
    if(err) {
        console.log("Connection to Database is failed...!")
    }
    else console.log("Connected to Database Successfully....!")
})

app.get('/',(req,res)=>{
  try{
    res.send("Welcome to VK Chauhan Goldy's Website!")
  }catch(e){
    res.json(e.message)
  }
})

app.post('/post',async (req,res)=>{
  const data = await Post.create(req.body)
  if(data){
    console.log(data)
    res.status(200).send(data)
  }else{
    res.json({
      status:"failed"
    })
  }
})

app.get('/all',async (req,res)=>{
  const data = await Post.find()
  if(data){
    console.log(data)
    res.send(data)
  }else{
    res.json({
      status:"failed"
    })
  }
})

app.get("/images/:fileName", async (req, res) => {
  console.log(`./uploads/${req.params.fileName}`)
  res.sendFile(path.join(__dirname, `./uploads/${req.params.fileName}`))
})

app.post("/api", (req, res) => {
  const { name, address, description }  = req.body
  const {image} = req.files
  image.mv("./uploads/"+image.name, async (err) => {
      if(err) {
          res.json({message: err})
      }
      else {
          const post = new Post({
              ...{ name, address, description },
              image: image.name
          })
          try{
              const response = await post.save()
              res.json({message: 'Everything is fine', response})
          }catch(e){
              res.json({message: 'Something went wrong' , response: e })
          }
      }
  })
})

app.get('/delete',async (req,res)=>{
  try{
    const data = await Post.deleteMany()
    console.log('deleted')
  }catch(e){
    res.json({message:e.message})
  }
})

app.listen(port,()=>{
  console.log(`Server is up and Running at port ${port}`)
})