import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({ hello: 'world' });
});

app.listen(3333, () =>
  console.log('🚀 Server started and listening in: http://localhost:3333/')
);
