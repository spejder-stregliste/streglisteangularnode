import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { getUsers, updateUser, creatUser } from './user/user';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.static("dist/web/"));

app.get('/', (req: Request, res: Response) => {
  res.sendFile('/', {root: '/dist/web'})
})

app.get('/user', async (req: Request, res: Response) => {
  try {
    const data = await getUsers()
    return res.json(data).status(200).send();
  }
  catch (e) {
    return res.status(500).end();
  }
});

app.put('/user', async (req: Request, res: Response) => {
  const body = req.body;

  const check = checkForUser(body, res);
  if (check) {
    return check;
  }

  try {
    const data = await updateUser({ Name: body['Name'], Lines: body['Lines'] })
    return res.json(data).status(200).send();
  }
  catch (e) {
    return res.status(500).end();
  }
})

app.post('/user', async (req: Request, res: Response) => {
  const body = req.body;

  const check = checkForUser(body, res);
  if (check) {
    return check;
  }

  try {
    const data = await creatUser({ Name: body['Name'], Lines: body['Lines'] })
    return res.json(data).status(200).send();
  }
  catch (e) {
    return res.status(500).end();
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at on port: ${port}`);
});



function checkForUser(body: any, res: Response): express.Response | null {
  if (!body['Name'] || !body['Lines']) {
    res.statusMessage = "Mangler påkrævede properties";
    return res.status(400).end();
  }

  if (typeof body['Name'] !== 'string' || typeof body['Lines'] !== 'number') {
    res.statusMessage = "properties har forket type";
    return res.status(400).end();
  }

  if (!Number.isInteger((body['Lines']))) {
    res.statusMessage = "property 'Lines' skal være en integer";
    return res.status(400).end();
  }

  if (body['Name'] === "") {
    res.statusMessage = "property 'Name' må ikke være tom string";
    return res.status(400).end();
  }

  return null;
} 