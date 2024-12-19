import express, { Request, Response } from 'express';

const app = express();
// src/index.ts
const unusedVar = 42; // This will trigger a linting warning

const port: string | number = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Hello, World!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // log the server listening message on console.log() function.  // It will print 'Server is running on port 3000' in the console.  // This is because we set the environment variable PORT to 3000. If the environment variable is not set, it will default to 3000.  // This is the way to handle port numbers in Node.js.  // The port number is set in the .env file in the root directory of your project.  // The dotenv package is used to load environment variables from a .env file into process.env.  // The dotenv package is installed using npm install dotenv.  // The dotenv package is then required in your index.ts file.  // The dotenv package is used to load environment variables from a .env file into process.env.  // The dotenv package is
});
