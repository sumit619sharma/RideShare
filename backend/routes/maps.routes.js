import express from "express";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import * as mapController from "../controllers/maps.controller.js";
import { query } from "express-validator";

const router = express.Router();

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getCoordinates
);

router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getDistanceTime
);

router.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 1 }),
  authMiddleware.authUser,
  mapController.getAutoCompleteSuggestions
);

export default router;
