"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const console_stamp_1 = __importDefault(require("console-stamp"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
require("reflect-metadata");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./swagger.json"));
const CheckCache_1 = require("./middlewares/CheckCache");
const ValidateInput_1 = require("./middlewares/ValidateInput");
const ParseRequest_1 = require("./middlewares/ParseRequest");
const routes_1 = require("./routes");
const Api_1 = require("./lib/Api");
console_stamp_1.default(console, {
    pattern: 'mm/dd/yyyy HH:MM:ss.l',
});
const devResponseLogger = (req, res, next) => {
    if (process.env.NODE_ENV !== 'development') {
        return next();
    }
    console.log(`\n\nRESPONSE:\n\n${req.method} ${req.path} \
    \n  params: ${JSON.stringify(req.params)} \
    \n  query: ${JSON.stringify(req.query)} \
    \n  body: ${JSON.stringify(req.body)} \
    \n-> \
    \n${res.statusCode} ${res.statusMessage}`);
    next();
};
const loggingOptions = [
    'error',
    'warn',
    'schema',
];
if (process.env.NODE_ENV !== 'production') {
    loggingOptions.push('query');
}
exports.app = async () => typeorm_1.createConnection()
    .then((connection) => {
    const router = express_1.default();
    const port = parseInt(process.env.PORT || '8080');
    router.use(express_1.default.json({ limit: '1mb' }));
    router.use(cors_1.default());
    router.use(helmet_1.default());
    router.use('/api/v1/api-doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    routes_1.Routes.forEach((route) => {
        if (route.cache === true) {
            router[route.method](route.path, CheckCache_1.checkCache);
        }
        router[route.method](route.path, (request, response, next) => {
            request.sortableFields = route.sortable || [];
            next();
        });
        router[route.method](route.path, ParseRequest_1.parseRequest);
        if (route.validate) {
            router[route.method](route.path, route.validate);
            router[route.method](route.path, ValidateInput_1.checkValidationResult);
        }
        router[route.method](route.path, (request, response, next) => {
            route
                .action(request, response)
                .then(() => next())
                .catch((err) => next(err));
        });
    });
    router.use(Api_1.Api.handleUncaughtException);
    if (process.env.NODE_ENV !== 'test') {
        router.listen(port, () => {
            console.log(`Toy API Service. Listening at http://localhost:${port}/`);
        });
    }
    router.use(devResponseLogger);
    return router;
})
    .catch((error) => {
    console.log('TypeORM connection error: ', error);
});
//# sourceMappingURL=app.js.map