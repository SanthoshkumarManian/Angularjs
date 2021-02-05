const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
        firstName:{
            type:String,
            required:[true,"A user must have firstname"]
        },
        lastName:{
            type:String,
            required:[true,"A user must have lastname"]
        },
        mobileNumber:{
            type:Number,
            required:[true,"A user must have mobile number"]
        },
        dateOfBirth:{
            type:Date,
            required:[true,"A user must have a date of birth"]
        },
        email:{
            type:String,
            required:[true,"A user must have a Email Id"],
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            required:[true,"A user must have a password"],
            minlength:8,
        },
        confirmPassword:{
            type:String,
            required:[true,"A user must have a password"],
            validate:function(el){
               return el===this.password;
            }
        },
        photo:{
            type:String,
        }
        
});

const userModel=mongoose.model("user",userSchema);

module.exports=userModel;
