import {Trail} from '../models/trail.js'


function index(req,res){
  Trail.find({})
  // .populate('profile')
  .then((trail)=>{

    res.render('trails/index',{trail,title:'All Trails',user:req.user})
    // console.log(trail[0].content[0].review)
    
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
    // console.log(trail.content)
    res.render('trails/show',{trail,user:req.user,title:'Your trail'})
  })
  .catch((err)=>console.log(err))
  

}

function edit(req,res){
  console.log(`edit id:${req.params.id}`)
  res.render('trails/edit',{id:req.params.id,title:'Trail Edit',user:req.user})

}


function fix(req,res){
  // console.log('fixed')
  // console.log(req.body)
  console.log(req.params.id)
//  Trail.findByIdAndUpdate("6186ffecdaccd9312f9f0481",req.body,{new:true})
//  .then(()=> res.redirect('/trails'))
// Trail.findById("6186ffecdaccd9312f9f0481")
// .then((data)=> console.log(data.content[0].review,req.params.id))
Trail.findById(req.params.id)
.then(data=>{
  data.content[0]=req.body
  data.save()
  res.redirect('/trails')
})

}
function deleteTrails(req,res){
  // Trail.findById(req.params.id)
  // .then((data)=>{
  //    delete data.content[0].review
  //    delete data.content[0].rating
  //   console.log(req.params.id)
  //   data.save()
  //   res.redirect('/trails')
  // })
  Trail.findByIdAndDelete(req.params.id)
  .then(()=> res.redirect('/trails'))
  

}



export{
  index,
  newTrail as new,
  createTrail as create,
  show,
  edit,
  fix as update,
  deleteTrails as delete

}