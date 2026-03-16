import { Router, type IRouter } from "express";
import { router as healthRouter } from "./health.js";

const router: IRouter = Router();

router.use(healthRouter);

export default router;
