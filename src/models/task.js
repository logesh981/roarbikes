const mongoose = require('mongoose')

const serviceSchema=mongoose.Schema({
    typeofservice:{
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }, 
    location:{
        type:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
},{
    timestamps:true
})
const Service = mongoose.model('Service',serviceSchema )

module.exports = Service