const mongoose=require("mongoose")
const Banner=new mongoose.Schema({
    image:{
        type:String,

    },
    text:{
        type:String
    },
    banner:{
        required:true,
        type:String,
            }

})
module.exports=mongoose.model("Banner",Banner)