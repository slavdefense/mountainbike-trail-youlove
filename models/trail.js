import mongoose from 'mongoose'

const contentSchema = new mongoose.Schema({
  review:{type:String,required:true},
  rating:{type:Number,required:true}
})

const trailSchema = new mongoose.Schema({
  name: String,
  content: [contentSchema],
  place:String,
  boss: {type: mongoose.Schema.Types.ObjectId,ref: "Profile"}
  
}, {
  timestamps: true
})

const Trail = mongoose.model('Trail', trailSchema)

export {
  Trail
}