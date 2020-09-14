const {Router} = require('express');
const router = Router();

const {
    serveSPA
} = require ('../controller/root_controller');

router.get('/', serveSPA);

module.exports = router;
