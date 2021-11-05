const express = require("express");
const router = express.Router();

const {
  controllerWrapper,
  authenticate,
  upload,
} = require("../../middelwares");
const { users: ctrl } = require("../../controllers");

router.get("verify/:verificationToken", controllerWrapper(ctrl.verify));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(ctrl.updateAvatar)
);

module.exports = router;
