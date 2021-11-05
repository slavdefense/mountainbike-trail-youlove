import {Trail} from '../models/trail.js'


function index(req,res){
  Trail.find({},function(err,trail){
    res.render('trails/index',{trail,title:'All Trails',user:req.user})
  })

}








export{
  index

}