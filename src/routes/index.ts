import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => response.json({ Olá: 'mundo' }));

export default routes;
