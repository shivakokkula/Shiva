import errorHandler from '../middlewares/error.js';
import authRoutes from "../routes/auth.route.js";
import userRoutes from "../routes/user.route.js";
import eventRoutes from "../routes/event.route.js";
import roleRoutes from "../routes/role.route.js";
import qrRoutes from "../routes/qr.route.js";
import companyRoutes from "../routes/company.route.js";
import staffRoutes from "../routes/staff.route.js";
import vendorRoutes from "../routes/vendor.route.js";
import faqRoutes from "../routes/faq.route.js";
import auth from "../middlewares/checkAuth.js";

export default (app) => {
    app.get('/', async (req, res) => res.json('Hello! Welcome To PAYX'));
    app.get('/ping', async (req, res) => res.json('pong!'));
    app.use("/auth", authRoutes);

    app.use(auth.checkToken);
    app.use("/user", userRoutes);
    // app.use(auth.isVIP);//host,admin
    app.use("/event/company",companyRoutes);
    app.use("/event/qr",qrRoutes);
    app.use("/event/staff",staffRoutes);
    app.use("/event/vendor",vendorRoutes);
    app.use("/event", eventRoutes);

    // app.use(auth.isAdmin);//admin
    app.use("/role", roleRoutes);
    app.use("/faq", faqRoutes);

    app.use((req, res, next) => next(Error('Not found')));
    app.use(errorHandler);
}
