const http=require('http');
const app=require('./backend/app');
const bodyParser=require('body-parser');
const cors=require('cors')
const mongoose=require("mongoose");

const port=8080;

app.set("port",port);

mongoose.connect('mongodb+srv://max:max@cluster0.iwqg8.mongodb.net/<newproject>?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(()=>console.log("connection was successfull")).catch(()=>console.log("connection failed"));

app.listen(port,(req,res)=>{
    console.log("server is responed");
});
 

