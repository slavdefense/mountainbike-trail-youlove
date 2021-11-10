import {Comment} from '../models/comment.js'

function index(req,res){
  Comment.find({})
}

function create(req,res){
 const reply = new Comment()
 reply.commentator = req.user.profile.name
 reply.comment= req.body.comment
 reply.save()
 console.log(reply)
//  console.log(reply)
// reply.save()
// .then(()=>res.redirect('/comments'))
}

export {
  create,
  index
}