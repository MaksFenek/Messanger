import express from 'express';
import socket from 'socket.io';
import ChatController from '../controllers/ChatController';
import MessageController from '../controllers/MessageController';
import UserController from '../controllers/UserController';
import {
  loginValidation,
  registerValidation,
} from '../middlewares/validations';

const createRoutes = (app: express.Express, io: socket.Server) => {
  const UserCtrl = new UserController(io);
  const ChatCtrl = new ChatController(io);
  const MessageCtrl = new MessageController(io);

  app.use(express.json({ type: 'text/plain' }));
  app.use(express.json());

  // routes
  app.post('/api/auth/register', registerValidation, UserCtrl.register);
  app.post('/api/auth/login', loginValidation, UserCtrl.login);
  app.post('/api/auth/token', UserCtrl.token);

  app.post('/api/chats/create', ChatCtrl.create);
  app.get('/api/chats/list', ChatCtrl.getList);
  app.get('/api/chats/:id', ChatCtrl.getChat);

  app.post('/api/message/create', MessageCtrl.create);
  app.patch('/api/message/update', MessageCtrl.update);
  app.delete('/api/message/delete', MessageCtrl.delete);
};

export default createRoutes;
