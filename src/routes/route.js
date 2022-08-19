const express = require('express');
const { userAll, userId, userAdd, userUpd, userDel } = require('../controllers/User');
// const { getbirthDate } = require('../controllers/Birthdate');
// const { getTimezone, sendHook } = require('../controllers/Tes');

const router = express.Router();

router.get('/user', userAll);
router.get('/user/:id', userId);
router.post('/user/', userAdd);
router.put('/user/:id', userUpd);
router.delete('/user/:id', userDel);

// router.get('/', getbirthDate);

// router.get('/tes', getTimezone);
// router.get('/tes/sendhook', sendHook);

module.exports = router;