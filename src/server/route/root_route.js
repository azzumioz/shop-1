const {Router} = require('express');
const router = Router();

const {
    serveSPA
} = require ('../controller/root_controller');

router.get('/', serveSPA);
router.get('/delivery', serveSPA);
router.get('/guarantee', serveSPA);
router.get('/contacts', serveSPA);

module.exports = router;
