import { Router } from 'express'
import * as commentCtrl from '../controllers/comment.js'


const router = Router()
router.get('/',commentCtrl.index)

router.post('/',commentCtrl.create)

export {
  router
}