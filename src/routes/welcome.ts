import express from 'express';

import {start} from '../controllers/start'
import { JwtPayload } from 'jwt-decode';

export interface JwtPayloadOptions extends JwtPayload {
    role: string,
    sub: string
}


const Router = express.Router();

Router.route('/').get(start);

export default Router;