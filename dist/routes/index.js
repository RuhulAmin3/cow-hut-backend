"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("../app/modules/user/user.route"));
const cow_route_1 = __importDefault(require("../app/modules/cow/cow.route"));
const order_route_1 = __importDefault(require("../app/modules/order/order.route"));
const admin_route_1 = __importDefault(require("../app/modules/admin/admin.route"));
const auth_route_1 = __importDefault(require("../app/modules/auth/auth.route"));
const router = express_1.default.Router();
const Routes = [
    { path: "/users", route: user_route_1.default },
    { path: "/auth", route: auth_route_1.default },
    { path: "/cows", route: cow_route_1.default },
    { path: "/orders", route: order_route_1.default },
    { path: "/admins", route: admin_route_1.default },
];
Routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
