import mongoose from 'mongoose'

const contentSchema = new mongoose.Schema({
  review:{type:String,required:true},
  rating:{type:Number,required:true}
})

const trailSchema = new mongoose.Schema({
  name: String,
  content: [contentSchema],
  place:String,
  image:{type:String,required:false},
  boss: {type: mongoose.Schema.Types.ObjectId,ref: "Profile"},
  superman: {type: mongoose.Schema.Types.ObjectId,ref: "Comment"}
  
}, {
  timestamps: true
})

const Trail = mongoose.model('Trail', trailSchema)

export {
  Trail
}