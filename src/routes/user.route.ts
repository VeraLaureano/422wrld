import { Router } from 'express'
import { postUserLogin, postUserSignup } from '../controllers/user.controller'

const router = Router()

router.route('/signup').post(postUserSignup)
router.route('/login').post(postUserLogin)

export { router as userRouter }