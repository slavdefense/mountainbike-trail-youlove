import { request } from 'express'

import {Trail} from '../models/trail.js'

//show all trails on the index page
function index(req,res){
  Trail.find({})
  .then((trail)=>{
    console.log(trail)
    res.render('trails/index',{trail,title:'All Trails',user:req.user})
    
  })
    .catch((err)=> console.log(err))
  }

// render new trail to trails/new.ejs
function newTrail(req,res){
   res.render('trails/new',{title:'Add a trail',user:req.user})
}

//create a new trail with trail name, place, original review, owner, and image
function createTrail(req,res){
   const trail = new Trail()
   trail.boss = req.user.profile._id
   trail.name=req.body.name
   trail.place= req.body.place
   trail.content=req.body
   trail.image=req.file.path
   trail.save()
   .then(()=>res.redirect('/trails'))  
}

//render a show page for a trail with a trail title passing the trail to render
function show(req,res){
 
  Trail.findById(req.params.id)
  .populate('boss')
   .then((trail)=>{
   res.render('trails/show',{trail,title:'Your trail'})
  })
  .catch((err)=>console.log(err))
}

// render an edit page trail to trails/edit
function edit(req,res){ 
  Trail.findById(req.params.id)
  .then((trail)=>{
    if(trail.boss.equals(req.user.profile._id)){
      res.render('trails/edit',{id:req.params.id,title:'Trail Edit',user:req.user})
    }
    else{
      res.redirect('/trails')
    }   
  })
}

//edit a trail with updated review and ratings only
function fix(req,res){
 Trail.findById(req.params.id)
 .then(data=>{
  data.content[0]=req.body
  data.save()
  res.redirect('/trails')
})
}

// completely delete a trail 
//first check if the person who is signed in is the person who created the trail. Only display delete if so is the case. Then delete the trail completely with a delete button
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
    }
  })
}

//create comments for trails. Any one can comment without having to log in. Derogatory comments are deleted by the site admin
function createComments(req,res){
  Trail.findById(req.params.id)
  .then((trail)=>{
    trail.superman.push(req.body)
    trail.save()
  .then(()=>res.redirect(`/trails/${trail._id}`))
  })
}

//export all functions
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