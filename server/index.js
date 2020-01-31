import express from 'express';
import swaggerUi from 'swagger-ui-express';
import apiDocumentation from '../swagger.json';
import importAuthUserRoute from './source/routes/authUserRoute';

const app = express();
const basePath = '/api/v-unknown';
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(basePath, importAuthUserRoute);
app.use(`${basePath}/documentation`, swaggerUi.serve, swaggerUi.setup(apiDocumentation));
app.listen(8080, () => {
  console.log('server is running on port 8080');
});
app.get('**', (req, res) => {
  res.status(400).send({
    status: 400,
    message: `Hey !! are you looking for BareFoot Nomad,  If yes Use the link below it is documentation of application`,
    data: '/api/v-unknown/documentation/'
  });
});

export default app;
