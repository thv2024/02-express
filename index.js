import dotenv from "dotenv";
import express from "express"

dotenv.config({
  path: "./.env",
});

const app = express()

const port = process.env.PORT

console.log(`port = ${port}`)

app.use(express.json())
let teaData = []
let nextId = 1

app.post('/teas', (req,res) => {
  const {name, price} = req.body
  const newTea = {id:nextId++, name, price}
  teaData.push(newTea);
  res.status(201).send(newTea);
})

app.get("/teas",(req,res)=>{
  res.status(200).send(teaData)
})

app.get("/teas/:id",(req,res)=>{
  const tea= teaData.find(t=>t.id == parseInt(req.params.id))
  if (!tea)
    return res.status(404).send("Tea not found")
  else
    return res.status(200).send(tea)
})

// update
app.put("/teas/:id",(req,res)=>{
  const tea= teaData.find(t=>t.id == parseInt(req.params.id))
  if (!tea)
    return res.status(404).send("Tea not found")
  else {
    const {name,price} = req.body
    tea.name = name
    tea.price = price
    return res.status(200).send(tea)
  }
});

// delete tea
app.delete("/teas/:id",(req,res)=>{
  console.log("delete tea")
  const teaIndex= teaData.findIndex(t=>t.id == parseInt(req.params.id))
  if (teaIndex == -1)
  {
    console.log("delete tea 2")
    return res.status(404).send("Tea not found")
  }
  else {
    console.log("delete tea 3 ", teaIndex)
    teaData.splice(teaIndex,1);
    console.log(teaData)
    return res.status(204).send("tea is deleted")
  }
});


app.get("/",(req,res)=>{
  res.send("Hello from 02_express")
})

app.get("/ice-tea",(req,res)=>{
  res.send("Hello from 02_express ice tea")
})
app.listen(port,()=>{
  console.log(`server is running at port ${port} ...`)
})
