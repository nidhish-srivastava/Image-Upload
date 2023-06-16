const mongoose = require('mongoose')

const {Schema,model} = mongoose

const PostSchema = new Schema({
      heading:String,
      content:String
},{
    timestamps:true
})

module.exports = model('Post',PostSchema)