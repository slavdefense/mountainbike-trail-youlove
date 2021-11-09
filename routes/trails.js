import { Router } from 'express'
import multer from 'multer'
import {storage} from '../cloudinary/index.js'
const upload = multer({ storage })
import * as trailCtrl from '../controllers/trails.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//display all trails @ localhost:3000/trails
router.get('/',trailCtrl.index)

//render a new trail page @ localhost:3000/trails/new
router.get('/new',isLoggedIn,trailCtrl.new)

//creat a new trail @ localhost:3000/trails
router.post('/',upload.single('image'),trailCtrl.create)

//read a specific trail @localhost:3000/trails/:id
router.get('/:id',trailCtrl.show)

//edit a specific trail @localhost:3000/trails/:id/edit
router.get('/:id/edit',isLoggedIn,trailCtrl.edit)

//put/patch a edit request @ localhost:3000/trails/:id
router.patch('/:id',trailCtrl.update)

//delete a trail @localhost:3000/trails/:id
router.delete('/:id',isLoggedIn,trailCtrl.delete)









export {
  router
}