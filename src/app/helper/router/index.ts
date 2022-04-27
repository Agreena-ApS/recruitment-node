import express from "express";
const router = express.Router();
import routers from "./routers";

router.use("/auth", routers.AuthRouter);
router.use("/users", routers.UserRouter);
router.use("/certificates", routers.CertificateRouter);

router.get("/", (req, res, next) => res.json({ index: "/" }));

export = router;
