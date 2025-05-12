import express from "express";
import { deleteUser, login,logout,register,updateProfile } from "../controllers/user.controller.js";
import isAunthenticated from "../middlewares/isAuthenticated.js";
import multiUpload from "../middlewares/multiUpload.js";
import singleUpload from "../middlewares/multer.js";
const router=express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
//router.route("/profile/update").post(isAunthenticated,singleUpload,updateProfile);
router.route("/profile/update").post(isAunthenticated, multiUpload, updateProfile);
router.route("/delete/:id").delete(isAunthenticated,deleteUser);


export default router;