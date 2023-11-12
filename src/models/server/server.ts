import express, { Application } from 'express';
import { Sequelize } from 'sequelize';
import cors from 'cors';
import sequelizeConnect from '../../db/conection';
import userRouter from '../../routes/user/route';


export class Server {
  public app: Application;
  private port: string;
  private sequelize: Sequelize;

  constructor(){
    this.app = express();
    this.port = process.env.PORT ?? '2023';
    this.midlewares();
    this.sequelize = sequelizeConnect;
    this.initDatabase();
    this.listen();
    this.routes();
  }

  async initDatabase() {
    try {
      await this.sequelize.authenticate();
      console.log('Connection to the database has been established successfully. 🚀');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening server on port http://localhost:${this.port}`);
    });
  }

  routes() {
    this.app.disable('x-powered-by');

    const userCors = cors({
      origin: ['https://crmacdatatech.netlify.app', 'http://localhost:5173'],
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
      allowedHeaders: ['Content-Type', 'authorization']
    });
    // Define routes
    this.app.use('/user', cors());
    this.app.use('/user', userRouter)
  }
  /**
  * Función para parciar el json
  */
  midlewares() {
    this.app.use(express.json());
  }
}




