import {Router} from 'express'
import { verifyUserEmailController, refreshController, signinController,  signupController, resetStartController, resetCodeController, resetPasswordController, signoutController, } from './controllers'

const authRoute = Router()

authRoute.post('/', refreshController)
authRoute.post('/signin', signinController)
authRoute.post('/signup', signupController)
authRoute.post('/verify/email', verifyUserEmailController)
authRoute.post('/recovery/start', resetStartController)
authRoute.post('/recovery/code', resetCodeController)
authRoute.post("/recovery/code", resetCodeController);
authRoute.post('/recovery/password', resetPasswordController)
authRoute.post('/signout', signoutController)


export default authRoute