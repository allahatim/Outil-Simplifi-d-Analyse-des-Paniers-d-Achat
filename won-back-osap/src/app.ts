import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import connectDB from './database.js';
import router from './routes/analyticsRoutes.js';
const cors = require('cors');

const app = express();

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
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
