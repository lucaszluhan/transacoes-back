import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use(routes);

app.listen(process.env.PORT || 8181, () => console.log(`app rodando..`));
