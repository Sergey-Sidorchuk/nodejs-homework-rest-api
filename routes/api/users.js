const express = require("express");
const router = express.Router();

const {
  controllerWrapper,
  authenticate,
  upload,
} = require("../../middelwares");
const { users: ctrl } = require("../../controllers");

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(ctrl.updateAvatar)
);

module.exports = router;
