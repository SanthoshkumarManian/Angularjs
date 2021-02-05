const user = require('../models/userModel');


exports.createUser = async(req, res) => {
    try {
        req.body.photo=req.file.filename
        const newUser = await user.create(req.body);
        res.status(201).json({
            status: "success",
            data: newUser
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error
        })
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const users = await user.find();
        res.status(200).json({
            users

        });
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: error
        })
    }
}
exports.getUser = async (req, res) => {
    try {
        const userId = await user.findById(req.params.id)
        res.status(200).json({
            status: "success",
            userId
        })
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: error
        })
    }
}
exports.updateUser = async (req, res) => {
    try {
        req.body.photo=req.file.filename;
        const updatedUser = await user.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            status: "success",
            data: {
                updatedUser
            }
        })
    } catch (error) {
        console.log(console.log(req.params.id))
        res.status(404).json({
            status: "error",
            message: error
        })
    }
}

exports.deleteUser = async (req, res) => {
    const deletedUser = await user.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status: "Succcess",
        data: deletedUser
    });
}

exports.uploadImage=async(req,res)=>{
    console.log(req.file);
    const request=req.body
    res.status(200).json({
        status:"success",
        request
    })
}

