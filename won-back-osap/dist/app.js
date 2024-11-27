"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const database_js_1 = __importDefault(require("./database.js"));
const analyticsRoutes_js_1 = __importDefault(require("./routes/analyticsRoutes.js"));
const cors = require('cors');
const app = (0, express_1.default)();
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Outil Simplifié d\'Analyse des Paniers d\'Achat API',
            version: '1.0.0',
            description: 'API for analyzing shopping cart data.',
            contact: {
                name: 'Hatim ALLAOUI',
                email: 'hatime.alla@gmail.com',
            },
        },
    },
    apis: ['./src/routes/analyticsRoutes.ts'],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
(0, database_js_1.default)();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json());
app.use('/api', analyticsRoutes_js_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
