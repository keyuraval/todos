require("dotenv").config()
const express= require("express");
const app= express();
const port=process.env.PORT || 5000;
const {connectToMongoDB}=require("./db")
const path=require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname,"build")));
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"build/index.html"));
})

const router=require("./routes");
app.use("/api",router);

async function startServer(){
    await connectToMongoDB();
    app.listen(port,()=>{
        console.log(`server is live on ${port}`); 
    })
};

startServer();
 

