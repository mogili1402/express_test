const express=require("express")
const app=express()

app.get("/",(req,res)=>{
    res.send("Hello world it is working ")
})
app.post("/doichecking",(req,res)=>{
    const data =req.body
    console.log(data)
    res.send("Thanks for subscribing")
})
PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    console.log("App  is listening on ",PORT)
})