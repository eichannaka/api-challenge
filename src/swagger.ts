import swaggerUi from "swagger-ui-express";
import { Router } from "express";

import swaggerDocument from "./swagger.json";

const router = Router();
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
