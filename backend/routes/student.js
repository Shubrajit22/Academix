import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('STUDENT ROUTE');
});

router.get('/assignment', (req, res) => {
  res.send('STUDENT Assignment');
});

export default router;