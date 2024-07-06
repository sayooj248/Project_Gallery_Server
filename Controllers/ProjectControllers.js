
const projects=require('../Models/ProjectModel')
// const { json } = require('express')

exports.addprojects=async(req,res)=>{
    const userId=req.payload
    console.log(userId)
    const {title,overview,language,github,demo}=req.body
    const image=req.file.filename
    console.log(title,overview,language,github,demo,userId,image)
    try{
        const exisitingProject=await projects.findOne({github})
        console.log(exisitingProject);
        if(exisitingProject){
            res.status(406).json("Project already added")
        }
        else{
            const newProject=new projects({
                title,overview,languages:language,github,demo,image,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch(err){
        console.log(err)
        res.status(401).json(err)
    }
   
}


exports.homeprojects = async (req,res)=>{
    try{
        const result=await projects.find().limit(3)
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(401).json("No projects available")
        }
    }
    catch(err){
        console.log(err);
        res.status(406).json(err)
    }
}


exports.allprojects = async (req,res)=>{
    console.log("inside all projects");
    const search =req.query.search
    console.log(search);
    try{
        const query={
            languages:{$regex:search,$options:'i'}
        }
        const result=await projects.find(query)
        // console.log(result);
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(401).json("No projects available")
        }
    }
    catch(err){
        console.log(err);
        res.status(406).json(err)
    }
}




exports.userprojects = async (req,res)=>{
    try{
        const userId=req.payload
        const result=await projects.find({userId})
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(401).json("No projects available")
        }
    }
    catch(err){
        console.log(err);
        res.status(406).json(err)
    }
}

exports.editprojects=async(req,res)=>{
    const { title,overview,language,github,demo,image }=req.body
    const userId =req.payload
    const projectImage=req.file? req.file.filename : image
    const {pid} =req.params
    try{
        const updateproject =await projects.findByIdAndUpdate({_id:pid},{
            title,overview,languages:language,github,demo,image:projectImage,userId },{new:true})
            await updateproject.save ()
            res.status(200).json(updateproject)
        
    }
    catch(err){
        console.log(err);
        res.status(406).json(err)

    }
}



exports.deleteproject = async (req,res)=>{
    try{
        const {pid}= req.params
        const result=await projects.findOneAndDelete({_id:pid})
        res.status(200).json(result)
    }
    catch(err){
        console.log(err);
        res.status(406).json(err)
    }
}


