// import 'dotenv/config'; // load all environment variables to process.env
import express from 'express';
import cors from 'cors';
import Youch from 'youch';
// import io from 'socket.io';
// import http from 'http';
// import routes from './routes';

class App {
  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
    this.exceptionHandle();
  }

  middlewares() {
    // Enter a server inside the cors if you want to restrict the access to this API:
    // this.app.use(cors({ origin: true }));
    this.app.use(
      cors({
        origin: true,
        credentials: true,
      })
    );

    // Make the application eligible to receibe requires in JSon format.
    this.app.use(express.json());
  }

  routes() {
    // this.app.use(routes);
  }

  exceptionHandle() {
    this.app.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

// By using the module "sucrase" you can use the syntaxe "export default" instead of module.exports
// module.exports = new App().server;
export default new App().server;
