import { Router } from 'express'
import { deleteUser, getAllUsers, getLogin, getSignup, postUserLogin, postUserSignup } from '../controllers/user.controller'

const router = Router()

router.route('/').get(getAllUsers)
router.route('/:id').delete(deleteUser)
router.route('/signup').get(getSignup).post(postUserSignup)
router.route('/login').get(getLogin).post(postUserLogin)

export { router as userRouter }