import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import ExhibitionsController from './controllers/ExhibitionsController';
import UsersController from './controllers/UsersController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/exhibitions', ExhibitionsController.index);
routes.get('/exhibitions/name/:name', ExhibitionsController.exhibitionName);
routes.get('/exhibitions/:id', ExhibitionsController.show);
routes.post('/exhibitions', upload.array('images'), ExhibitionsController.create);

// Criar Users
routes.post('/users', UsersController.create);

// Logar
routes.post('/users/auth', UsersController.auth);

export default routes;
