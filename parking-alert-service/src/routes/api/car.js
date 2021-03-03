import { Router } from 'express';
import connections from '../../connections';
const { firebaseClient: firebase, lineClient: line } = connections;
const router = Router();

const lineParkingAlert = line.getInstance();
const carRef = firebase.firestore.collection('car');

router.post('/', async (req, res, next) => {
  const body = req.body;
  if (!body.plateNumber) {
    res.status(404).json({
      message: 'plateNumber is required',
    });
  }
  if (!body.lineUserID) {
    res.status(404).json({
      message: 'lineUserID is required',
    });
  }
  try {
    const carID = body.plateNumber.replace(/\s/g, '-');
    await carRef.doc(carID).set({
      plateNumber: body.plateNumber,
      plateCountry: body.plateCountry,
      lineUserID: body.lineUserID,
      brand: body.brand,
      tell: body.tell,
      owner: body.owner,
    });
    res.json({
      message: 'success',
      data: {
        carID: carID,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({});
  }
});

router.get('/:carID', async (req, res, next) => {
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
    res.json({
      message: 'success',
      data: {
        plateNumber: carData.plateNumber,
        plateCountry: carData.plateCountry,
        brand: carData.brand,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({});
  }
});

export default router;
