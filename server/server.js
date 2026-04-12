import 'dotenv/config';
import app from './src/app.js';
import { env } from './src/config/env.js';

const port = Number(env.PORT) || 5000;

app.listen(port, () => {
  console.log(`Railframe API listening on port ${port}`);
});
