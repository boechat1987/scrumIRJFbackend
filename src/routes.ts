import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import ExhibitionsController from './controllers/ExhibitionsController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/exhibitions', ExhibitionsController.index);
routes.get('/exhibitions/:id', ExhibitionsController.show);
routes.post('/exhibitions', upload.array('images'), ExhibitionsController.create);

export default routes;
