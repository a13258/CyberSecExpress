'user strict';
//esquema dos users
const mongoose= require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

    macAddr:{type:String,require:true},
    heartrateMeasurement:{type:[Number],default:undefined},
    },
    {collection:'users'}
)

const User= mongoose.model('User',userSchema)

module.exports=User