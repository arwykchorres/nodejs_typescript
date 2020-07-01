import express, { Request, Response } from 'express';
import routes from '~routes/index';
const app = express();
const basePath = '/api';

app.set('env', 'development');

app.get(basePath, (req: Request, res: Response) => {
  res.status(200).json({ hola: 12 });
});

app.use(basePath, routes);
app.use('*', (req: Request, res: Response) => res.status(404).json({ error: 'not found' }));

app.listen(3500, () => {
  console.warn(`Server started on http://localhost:3501${basePath}  ()`);
});
