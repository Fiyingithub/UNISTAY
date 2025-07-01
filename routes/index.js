import express from "express";
import userRoute from "./user.route.js";
import downloadRoutes from "./download.route.js";

const router = express.Router();

router.use("/users", userRoute);

router.use("/download", downloadRoutes);

const routes = router;

export default routes;
