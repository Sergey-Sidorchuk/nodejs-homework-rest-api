const express = require("express");

const router = express.Router();

const {
  controllerWrapper,
  validator,
  authenticate,
} = require("../../middelwares");
const { auth: ctrl } = require("../../controllers");
const { joiSchema } = require("../../schemas/users");

router.post(
  "/register",
  validator(joiSchema),
  controllerWrapper(ctrl.register)
);

router.post("/login", validator(joiSchema), controllerWrapper(ctrl.login));

router.get("/logout", authenticate, controllerWrapper(ctrl.logout));

router.get("/current", authenticate, controllerWrapper(ctrl.current));

module.exports = router;
