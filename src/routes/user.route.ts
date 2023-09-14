import { Router } from 'express'
import { getLogin, getSignup, postUserLogin, postUserSignup } from '../controllers/user.controller'

const router = Router()

router.route('/signup').get(getSignup).post(postUserSignup)
router.route('/login').get(getLogin).post(postUserLogin)

export { router as userRouter }