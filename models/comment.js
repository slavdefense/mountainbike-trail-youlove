import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  comment: {type:String,required:true},
  commentator: {type: mongoose.Schema.Types.ObjectId,ref: "Profile"}
  
}, {
  timestamps: true
})

const Comment = mongoose.model('Profile', commentSchema)

export {
  Comment
}