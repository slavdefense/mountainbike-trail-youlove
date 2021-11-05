import { Router } from 'express'
import * as trailCtrl from '../controllers/trails.js'

const router = Router()

//display all trails @ localhost:300/trails
router.get('/',trailCtrl.index)




export {
  router
}