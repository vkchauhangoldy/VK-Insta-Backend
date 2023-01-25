const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true
  },
  likes: {
    type: Number,
    default: 100
  },
  description: {
    type: String,
    require: true
  },
  image:{
    type:String,
    require:true
  },
  date:{
    type: Date,
    default: Date.now
  }
})

const myModel = mongoose.model('postData', postSchema);

module.exports = myModel;