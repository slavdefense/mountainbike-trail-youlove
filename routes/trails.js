import { Router } from 'express'
import * as trailCtrl from '../controllers/trails.js'

const router = Router()

//display all trails @ localhost:3000/trails
router.get('/',trailCtrl.index)

//render a new trail page @ localhost:3000/trails/new
router.get('/new',trailCtrl.new)

//creat a new trail @ localhost:3000/trails
router.post('/',trailCtrl.create)

//read a specific trail @localhose:3000/trails/:id
router.get('/:id',trailCtrl.show)

export {
  router
}