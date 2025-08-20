import express from 'express';

import { login, register } from '../controllers/authentication';

import { getAllUsers } from '../controllers/users';

export default ( router: express.Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.get('/getUser', getAllUsers);
};
