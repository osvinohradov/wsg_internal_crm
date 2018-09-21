import mongoose from 'mongoose';
import body_parser from 'body-parser';
import express from 'express';
import cors from 'cors';
import cookie_parser from 'cookie-parser';

import { register_routes } from './controllers';

const app = express();
const port = 6000;
const baseUrl = '/wsg/api/v1';

app.use(body_parser);
app.use(cookie_parser());
app.use(cors({ origin: '*' }))

register_routes(app, baseUrl);


mongoose.connect(`mongodb://localhost:27017/wsg_db`);

const server = app.listen(port, () => {
    console.log(`Server runing on port ${port}`);
});

export default app;