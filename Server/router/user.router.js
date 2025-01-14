import { Router } from "express";
import { registerUser,
    login,
    PatientDetail,
    foodChartMenu,
    pantrypersonal,
    retrievePatient,
    particularPatientDetail,
    fetchFoodMenu } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name : "coverImage",
            maxCount:1
        }
    ])
    ,registerUser
)

router.route("/login").post(login)

router.route("/patientDetail").post(
    upload.fields([{
        name : "patientimage",
        maxCount : 1
    }]),PatientDetail
)

router.route("/foodchartmenu").post(
    upload.fields([{
        name : "coverImage1",
        maxCount : 1
    },{
        name : "coverImage2",
        maxCount : 1
    },
    {
        name : "coverImage3",
        maxCount : 1
    }]),foodChartMenu
)
router.route("/pantry").post(
    upload.fields([
      {  name : "pantrypersonal",
        maxCount : 1
      }
    ]),
    pantrypersonal
)

router.route("/patientdata").get(retrievePatient)

router.route("/particularpatientdata").post(particularPatientDetail)

router.route("/menu").get(fetchFoodMenu)


export default router