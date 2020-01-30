import express from 'express';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
// import './source/dbconnection';
import apiDocumentation from '../swagger.json';
import allRoutes from './routes/allRoutes';
import db from './config/db';
import '../server/strategies/fbStrategy';
import '../server/strategies/googleStrategy';
import authRoutes from '../server/routes/authRoutes'

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const basePath = '/api';

app.listen(process.env.PORT || 3000, () => {
  console.log('server is running on port 3000');
});

app.use(basePath, allRoutes);

app.use(`${basePath}/documentation`, swaggerUi.serve, swaggerUi.setup(apiDocumentation));
app.use('',authRoutes)
app.get('**', (req, res) => {
  res.status(400).send({
    status: 400,
    message: `Hey !! You are Welcome to BareFoot Nomad, Use the link below its documentation of application`,
    data: `/api/documentation`
  });
});

export default app;
