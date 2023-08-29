import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import { getUsers, updateUser, creatUser } from './user/user';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['html', 'js', 'scss', 'css'],
  index: false,
  maxAge: '1y',
  redirect: true,
}

app.use(express.static("web", options));
app.use(express.json())

//#region api routes
app.get('/user', async (req: Request, res: Response) => {
  try {
    const data = await getUsers();
    res.send(data);
  }
  catch (e) {
    res.status(500).end();
  }
});

app.put('/user', async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);

  const check = checkForUser(body);
  if (check) {
    res.statusMessage = check;
    res.status(400).end();
    return;
  }

  try {
    const data = await updateUser({ name: body['name'], lines: body['lines'] })
    res.send(data);
  }
  catch (e) {
    res.status(500).end();
  }
})

app.post('/user', async (req: Request, res: Response) => {
  const body = req.body;

  const check = checkForUser(body);
  if (check) {
    res.statusMessage = check;
    res.status(400).end()
    return;
  }

  try {
    const data = await creatUser({ name: body['name'], lines: body['lines'] })
    res.send(data);
  }
  catch (e) {
    res.status(500).end();
  }
})
//#endregion

app.get('*', (req: Request, res: Response) => {
  res.sendFile('/', { root: 'web/' });
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at on port: ${port}`);
});


//#region helper function
function checkForUser(body: any): string | null {
  if (!body) {
    return "Ingen data sendt";
  }

  if (!body['name'] || (!body['lines'] && body['lines'] !== 0)) {
    return "Mangler påkrævede properties";
  }

  if (typeof body['name'] !== 'string' || typeof body['lines'] !== 'number') {
    return "properties har forket type";
  }

  if (!Number.isInteger((body['lines']))) {
    return "property 'lines' skal være en integer";
  }

  if (body['name'] === "") {
    return "property 'name' må ikke være tom string";
  }

  return null;
}
//#endregion