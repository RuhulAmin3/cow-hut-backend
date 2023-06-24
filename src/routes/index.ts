import express from "express";
import userRoutes from "../app/modules/user/user.route";
import cowRoutes from "../app/modules/cow/cow.route";
import orderRoutes from "../app/modules/order/order.route";
import adminsRoutes from "../app/modules/admin/admin.route";
import authRoutes from "../app/modules/auth/auth.route";
const router = express.Router();

const Routes = [
  { path: "/users", route: userRoutes },
  { path: "/auth", route: authRoutes },
  { path: "/cows", route: cowRoutes },
  { path: "/orders", route: orderRoutes },
  { path: "/admins", route: adminsRoutes },
];

Routes.forEach((route) => router.use(route.path, route.route));

export default router;
