import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from '@shared/docs/swagger.json';
import { AppError } from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm';

import { router } from './routes';
import '@shared/container';

createConnection();
const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${error.message}`,
    });
  }
);

app.listen(3333, () =>
  console.log(
    `\x1b[35m 🚀 Server started and listening in:\x1b[36m http://localhost:3333/`
  )
);
