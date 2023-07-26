const express= require("express");
const connect= require("./configs/db");
const  cors= require("cors");
const userController= require("./controllers/user.controller");
const adminController=require("./controllers/admin.controller")
const path=require('path')
const app= express();
const port=process.env.PORT || 4568;


app.use(cors());
app.use(express.json())
 app.use('/uploads',express.static(path.join(__dirname, 'uploads')))


app.use("/users",userController )
app.use("/admin",adminController)

app.listen( port  , async()=>{
    try {
          await connect()
          console.log(`listening port number ${port}   `)
    } catch (error) {
        console.log("Error while connecting to database" , error.message)
    }
})