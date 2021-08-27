import express from 'express';

import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);

app.listen(3333, () =>
  console.log(
    '\x1b[35m',
    '🚀 Server started and listening in:',
    '\x1b[36m',
    'http://localhost:3333/'
  )
);
