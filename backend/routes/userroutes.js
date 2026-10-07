import {Router} from "express";
import { forgotPassword, getUser, logOut, resetPassword, signIn, signUp } from "../controllers/usercontrollers.js";

const router=Router();

router.route("/signUp").post(signUp);
router.route("/signIn").post(signIn);
router.route("/logout").get(logOut);
router.route("/profile").post(getUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);


export default router;