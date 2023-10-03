import { Router } from 'express'
import { postUserLogin, postUserSignup } from '../controllers/user.controller'
import { createAccountLimiter } from '../utils/limiter'

const router = Router()

router.route('/signup').post(createAccountLimiter, postUserSignup)
router.route('/login').post(postUserLogin)

export { router as userRouter }