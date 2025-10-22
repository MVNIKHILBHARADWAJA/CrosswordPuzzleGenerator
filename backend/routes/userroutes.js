import {Router} from "express";
import { getUser, logOut, signIn, signUp } from "../controllers/usercontrollers.js";

const router=Router();

router.route("/signUp").post(signUp);
router.route("/signIn").post(signIn);
router.route("/logout").get(logOut);
router.route("/profile").post(getUser);

export default router;