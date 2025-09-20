import express, {Request, Response} from 'express';
import * as dotenv from 'dotenv';
import routes from '../src/routes/routes';

const app = express();
dotenv.config();

app.use(express.json());

app.use('/api', routes);

app.get('/health', async (req: Request, res: Response) => {
  res.json({ ok: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});