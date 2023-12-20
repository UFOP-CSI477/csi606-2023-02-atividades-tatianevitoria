//import {Router} from 'express';
const express = require('express');

const mainRouter = express.Router();

mainRouter.get('/', (request, response) => {
    response.json({
        message: "Server is running."
    });
});

module.exports = mainRouter;