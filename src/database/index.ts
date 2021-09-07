import { createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

getConnectionOptions().then((options) => {
  const newOptions = options as IOptions;
  newOptions.host = 'localhost'; // Quando rodar em container, usar database
  createConnection({
    ...options,
  });
});
