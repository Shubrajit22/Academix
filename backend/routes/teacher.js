import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('TEACHER ROUTE');
});

export default router;