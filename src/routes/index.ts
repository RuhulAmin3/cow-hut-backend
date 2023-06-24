import express from "express";
import userRoutes from "../app/modules/user/user.route";
import cowRoutes from "../app/modules/cow/cow.route";
import orderRoutes from "../app/modules/order/order.route";
import adminsRoutes from "../app/modules/admin/admin.route";
const router = express.Router();

const Routes = [
  { path: "/", route: userRoutes },
  { path: "/cows", route: cowRoutes },
  { path: "/orders", route: orderRoutes },
  { path: "/admins", route: adminsRoutes },
];

Routes.forEach((route) => router.use(route.path, route.route));

export default router;
