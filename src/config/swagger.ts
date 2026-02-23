// src/config/swagger.ts (nouveau fichier)
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mon API',
      version: '1.0.0',
    },
  },
  apis: ['src/routes/*.ts'], // ← chemin correct vers tes routes
};

export const swaggerSpec = swaggerJSDoc(options);
