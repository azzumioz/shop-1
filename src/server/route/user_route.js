const {Router} = require('express');
const router = Router();

const {
    getLogin,
    getCryptPassword,
    checkToken,
    getUserEmail
} = require('../controller/user_controller');

router.post('/panel/login', getLogin);
router.get('/api/bcrypt', getCryptPassword);
router.get('/api/me', checkToken);
router.get('/api/me', getUserEmail);

module.exports = router;
