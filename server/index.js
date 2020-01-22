import express from 'express';
import swaggerUi from 'swagger-ui-express';
import apiDocumentation from '../swagger.json';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const basePath = '/api/v-unknown';

app.listen(process.env.PORT || 3000, () => { console.log('server is running on port 3000'); });
app.use(`${basePath}/documentation`, swaggerUi.serve, swaggerUi.setup(apiDocumentation));
app.get('**', (req, res) => {
    res.status(400).send({ 
        status: 400,
        message: 'Hey !! are you looking for BareFoot Nomad,  If yes Use the link below it is documentation of application',
        data: docUrl,
    });
  });

export default app;
