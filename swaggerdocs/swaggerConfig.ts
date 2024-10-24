import { Application, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import logger from '../config/logger';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E Tern API',
      version: '1.0.0',
      description: 'backend API for E Tern',
    },
  },
  apis: ['./swaggerdocs/*.yaml'],
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app: Application, port: number) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  logger.info(`Docs available at http://localhost:${port}/api/docs`);
}

export default setupSwagger;
