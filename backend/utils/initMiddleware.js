import cors from 'cors';
import express from 'express';

const initMiddleware = (app) => {
  app.use(cors());
  app.use(express.json());
};

export default initMiddleware
