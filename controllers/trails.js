import { request } from 'express'

import {Trail} from '../models/trail.js'


function index(req,res){
  Trail.find({})
  
  
  .then((trail)=>{
    console.log(trail)
    
    res.render('trails/index',{trail,title:'All Trails',user:req.user})
    // console.log(trail[0].content[0].review) 
  }
  )
    .catch((err)=> console.log(err))
  }



function newTrail(req,res){
   
  // console.log(req.body.owner)

  res.render('trails/new',{title:'Add a trail',user:req.user})
}

function createTrail(req,res){
  //collect form data and put in inside Trail->content
  const trail = new Trail()
  trail.boss = req.user.profile._id
  // console.log(trail.boss)
  // console.log(req.body)
  // console.log(req.file.path)


   trail.name=req.body.name
   trail.place= req.body.place
   trail.content=req.body
   trail.image=req.file.path


  // console.log(trail)

  // console.log(req.body.owner)
  // trail.content=req.body
  // trail.name=req.body
  // console.log(trail.name)
  // console.log(trail.content)
  
  
   trail.save()
   .then(()=>res.redirect('/trails'))
  

  // console.log(req.body)

}

function show(req,res){
  // console.log(req.user.profile.name)
  Trail.findById(req.params.id)
  .populate('boss')
  
  .then((trail)=>{
   console.log(trail)
   res.render('trails/show',{trail,title:'Your trail'})
  })
  .catch((err)=>console.log(err))
}

function edit(req,res){
  
  Trail.findById(req.params.id)
  .then((trail)=>{
    // console.log(trail.boss)
    // console.log(req.user.profile._id)
    if(trail.boss.equals(req.user.profile._id)){
      res.render('trails/edit',{id:req.params.id,title:'Trail Edit',user:req.user})
    }
    else{
      res.redirect('/trails')
      // console.log('cannot edit others trail')
    }
    
  })
  
  // console.log(`edit id:${req.params.id}`)
  // res.render('trails/edit',{id:req.params.id,title:'Trail Edit',user:req.user})

}


function fix(req,res){
  // console.log('fixed')
  // console.log(req.body)
  // console.log(req.params.id)
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

  Trail.findById(req.params.id)
  .then((trail)=>{
    if(trail.boss.equals(req.user.profile._id)){
      Trail.findByIdAndDelete(req.params.id)
      .then((data)=>res.redirect('/trails'))
      .catch((err)=>{
        res.redirect('/trails')
        console.log(err)
      })

    }
    else{
      res.redirect('/trails')
      console.log('You do not have authorization')
    }
  })


}
  // Trail.findById(req.params.id)
  // .then((data)=>{
  //    delete data.content[0].review
  //    delete data.content[0].rating
  //   console.log(req.params.id)
  //   data.save()
  //   res.redirect('/trails')
  // })
  // console.log(isLoggedIn)
//   Trail.findByIdAndDelete(req.params.id)
//   .then(()=> res.redirect('/trails'))
  

// }
function createComments(req,res){
  console.log(req.params.id)
  Trail.findById(req.params.id)
  .then((trail)=>{
    trail.superman.push(req.body)
    trail.save()
    
    .then(()=>res.redirect(`/trails/${trail._id}`))
  })

}


export{
  index,
  newTrail as new,
  createTrail as create,
  show,
  edit,
  fix as update,
  deleteTrails as delete,
  createComments

}