const express=require('express');
const user=require('../controller/userController');
const multer=require('multer')

const userRouter=express.Router();

const multStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images/users')
    },
    filename:(req,file,cb)=>{
        cb(null ,file.originalname)
    }
})

const upload=multer({storage:multStorage})

userRouter.post('/createuser', upload.single('photo'),user.createUser);

userRouter.route("/")
.get(user.getAllUser);

//userRouter.post("/uploadImage", upload.single('photo'),user.uploadImage);

userRouter.route("/:id")
.get(user.getUser)
.patch(upload.single('photo'),user.updateUser)
.delete(user.deleteUser);


module.exports=userRouter;