const http=require('http');
const app=require('./backend/app');
const bodyParser=require('body-parser');
const cors=require('cors')
const mongoose=require("mongoose");

const port=8080;

app.set("port",port);

mongoose.connect('mongodb://localhost:27017/newproject',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(()=>console.log("connection was successfull"));


app.listen(port,(req,res)=>{
    console.log("server is responed");
});
 

//santhosh kumarremote