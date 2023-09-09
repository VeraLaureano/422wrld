import { Router } from 'express'
import { getAllUsers, postUserLogin, postUserSignup } from '../controllers/user.controller'

const router = Router()

router.route('/').get(getAllUsers)
router.route('/signup').post(postUserSignup)
router.route('/login').post(postUserLogin)

export { router as userRouter }