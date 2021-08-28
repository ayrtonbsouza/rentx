import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { router } from './routes';
import swaggerFile from './swagger.json';

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.listen(3333, () =>
  console.log(
    '\x1b[35m',
    '🚀 Server started and listening in:',
    '\x1b[36m',
    'http://localhost:3333/'
  )
);
