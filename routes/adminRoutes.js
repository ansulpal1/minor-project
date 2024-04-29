const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const {
    findDonarsListController,
    getDonarsListController,
    getHospitalListController,
    getOrgListController,
    deleteDonarController,
    notificationController,
    currentNotificationController
} = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

//router object
const router = express.Router();

//Routes

//GET ||find  DONAR LIST
router.post(
    "/notification",

    notificationController
);
//GET ||find  DONAR LIST
router.get(
    "/find-donar-list",
    authMiddelware,
    findDonarsListController
);
//GET ||current notification
router.get(
    "/get-notification",
    //authMiddelware,
    currentNotificationController
);
//GET || DONAR LIST
router.get(
    "/donar-list",
    authMiddelware,
    adminMiddleware,
    getDonarsListController
);
//GET || HOSPITAL LIST
router.get(
    "/hospital-list",
    authMiddelware,
    adminMiddleware,
    getHospitalListController
);
//GET || ORG LIST
router.get("/org-list", authMiddelware, adminMiddleware, getOrgListController);
// ==========================

// DELETE DONAR || GET
router.delete(
    "/delete-donar/:id",
    authMiddelware,
    adminMiddleware,
    deleteDonarController
);

//EXPORT
module.exports = router;