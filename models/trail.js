import mongoose from 'mongoose'

const trailSchema = new mongoose.Schema({
  name: String,
  content: String,
  place:String,
  rating:Number
}, {
  timestamps: true
})

const Trail = mongoose.model('Trail', trailSchema)

export {
  Trail
}