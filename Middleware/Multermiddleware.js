const multer=require('multer')

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },

    filename:(req,file,callback)=>{
        console.log(file);
        callback(null,`img-${Date.now()}-${file.originalname}`)
    }
})


const FileFilter=(req,file,callback)=>{
    if(file.mimetype=="image/jpg" || file.mimetype=="image/jpeg" || file.mimetype=="image/png"){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error(" please upload file with following extentions only!!"))
    }
}


const multerconfig=multer({
    storage,FileFilter
})

module.exports=multerconfig