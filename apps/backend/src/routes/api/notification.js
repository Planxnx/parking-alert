import { Router } from 'express';
import connections from '../../connections';
const { firebaseClient: firebase, lineClient: line } = connections;
const router = Router();

const lineParkingAlert = line.getInstance();
const carRef = firebase.firestore.collection('car');

router.post('/:carID', async (req, res, next) => {
  if (!req.params.carID) {
    res.status(404).json({
      message: 'car not found',
    });
  }

  try {
    const result = await carRef.doc(req.params.carID).get();
    if (!result.exists) {
      res.status(404).json({
        message: 'car not found',
      });
      return;
    }
    const carData = result.data();

    let lastNoti = carData.lastNoti ? carData.lastNoti.toDate(): new Date("1996-01-01");
    let nowDate = new Date();
    let diffMins = Math.round(((nowDate - (lastNoti % 86400000)) % 3600000) / 60000); // minutes
    if (diffMins < 5) {
      res.status(400).json({
        code: '001',
        message: "too much notification, please try again in a few minutes",
      });
      return;
    }
    const message = `แจ้งเตือน🚨\nมีคนแจ้งเตือนขอให้เลื่อนรถ`;
    const psMessage = req.body.message ? `\nเพิ่มเติม: ${req.body.message}` : '';
    await lineParkingAlert.pushMessage(carData.lineUserID, {
      type: 'text',
      text: message + psMessage,
    });
    carRef.doc(req.params.carID).update({
      lastNoti: new Date(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({});
  }

  res.json({
    message: 'alert success',
  });
});

export default router;
