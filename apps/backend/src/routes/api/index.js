import { Router } from 'express';
import carRouter from './car';
import notificationRouter from './notification';
const router = Router();

router.use('/notification', notificationRouter);
router.use('/car', carRouter);

router.get('/', (req, res, next) => {
  res.json({});
});

router.post('/webhook', (req, res, next) => {
  const events = req.body.events;
  for (let event of events) {
    console.log(`Received Webhook events:${JSON.stringify(event)}\n`);
  }
  res.json({});
});

export default router;
