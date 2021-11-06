import {Trail} from '../models/trail.js'


function index(req,res){
  Trail.find({})
  // .populate('content')
  .then((trail)=>{

    res.render('trails/index',{trail,title:'All Trails',user:req.user})
    console.log(trail[0].content[0].review)
  }
  )
    .catch((err)=> console.log(err))
  }



function newTrail(req,res){
  res.render('trails/new',{title:'Add a trail',user:req.user})
}

function createTrail(req,res){
  //collect form data and put in inside Trail->content

  const trail = new Trail()
  trail.content=req.body
  
  // console.log(trail.content) 
  trail.save()

  .then(()=>res.redirect('/trails'))

  // console.log(req.body)



}
function show(req,res){
  Trail.findById(req.params.id)

  .then((trail)=>{
    console.log(trail.content)
    res.render('trails/show',{trail,user:req.user,title:'Your trail'})
  })
  .catch((err)=>console.log(err))
  

}







export{
  index,
  newTrail as new,
  createTrail as create,
  show

}