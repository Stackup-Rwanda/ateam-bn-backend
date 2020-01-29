import express from 'express';
import swaggerUi from 'swagger-ui-express';
import apiDocumentation from '../swagger.json';
import '../server/source/dbconnection';
import userRoute from '../server/joRoutes/userRoute';
import '../server/strategies/fbStrategy';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use( '', userRoute );
const basePath = '/api/v-unknown';

app.listen(process.env.PORT || 3000, () => {
  console.log('server is running on port 3000');
});
app.use(`${basePath}/documentation`, swaggerUi.serve, swaggerUi.setup(apiDocumentation));
app.get('**', (req, res) => {
  res.status(400).send({
    status: 400,
    message: `Hey !! You are Welcome to BareFoot Nomad, Use the link below its documentation of application`,
    data: `/api/v-unknown/documentation`
  });
});

export default app;
