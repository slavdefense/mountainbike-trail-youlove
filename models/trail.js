import mongoose from 'mongoose'

const contentSchema = new mongoose.Schema({
  review:{type:String,required:true},
  rating:{type:Number,required:true}
})
const commentSchema = new mongoose.Schema({
  comment:{type:String,required:true},
  commentator:{type:String,required:true}
})


const trailSchema = new mongoose.Schema({
  name: String,
  content: [contentSchema],
  place:String,
  image:{type:String,required:false},
  boss: {type: mongoose.Schema.Types.ObjectId,ref: "Profile"},
  superman: [commentSchema]
  
}, {
  timestamps: true
})

const Trail = mongoose.model('Trail', trailSchema)

export {
  Trail
}