const router = require("express").Router();
const thoughtRoute = require("./api/thoughtRoute");
const userRoute = require("./api/userRoute");

router.use("/thought", thoughtRoute);
router.use("/user", userRoute);

module.exports = router;
