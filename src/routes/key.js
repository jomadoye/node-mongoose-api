import { Router } from 'express';
import uuidv4 from 'uuid/v4';
import { CONSTANTS } from '../utils/constants'
import { addSecondsToDate, ErrorHandler } from '../utils/utils'

const router = Router();

router.get('/', async (req, res) => {
  try {
    const keys = await req.context.models.Key.find();
    return res.send(keys);
  } catch (err) {
    throw new ErrorHandler(500, err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const key = await req.context.models.Key.find({ key: id })

    if (key.length > 0) {

      const { createdAt, TTL } = key
      /**
       * THIS check if the TTL is still valid
       */
      if (Date.now() > addSecondsToDate(createdAt, TTL)) {
        console.log('Cache hit', key)
        return res.send(key);
      }
    }

    console.log('Cache miss')
    const randomString = uuidv4()
    const newKey = await req.context.models.Key.create({
      key: id,
      keyData: randomString,
      TTL: req.body.TTL || CONSTANTS.DEFAULT_TTL // defaults to 60 seconds
    });
    return res.send(newKey);
  } catch (err) {
    throw new ErrorHandler(500, err)
  }
});

router.post('/', async (req, res) => {
  try {
    const noOfDocuments = await req.context.models.Key.find()

    /**
     * If number of documents is more than 5 delete the oldest document and create a new document
     */
    if (noOfDocuments.length > CONSTANTS.DEFAULT_MAX_NUMBER_OF_DOCUMENT) {
      const oldestKey = await req.context.models.Key.findOne({}, [], { $orderby: { 'createdAt': 1 } })

      let result = null;
      if (oldestKey) {
        result = await oldestKey.remove();
        console.log('Cache oldestKey deleted')
        return res.send(result);
      }

      return res.send(result);
    } else {
      const key = await req.context.models.Key.create({
        key: req.body.key,
        keyData: req.body.keyData,
        TTL: req.body.TTL || CONSTANTS.DEFAULT_TTL // defaults to 60 seconds
      });

      return res.send(key);
    }
  } catch (err) {
    throw new ErrorHandler(500, err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const key = await req.context.models.Key.findOne({ key: req.params.id });

    let result = null;
    if (key) {
      result = await key.remove();
      console.log('Cache deleted')
    }

    return res.send(result);
  } catch (err) {
    throw new ErrorHandler(500, err)
  }
});

export default router;
