import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '..';

async function create() {
  const connection = await createConnection();
  const id = uuidV4();
  const password = await hash('admin', 8);
  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', '1234567890')
    `
  );
  await connection.close;
}

create().then(() => console.log('admin user created'));
