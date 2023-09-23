const createCheckoutSession = require('./checkout-session');
const createPortalSession = require('./portal-session');

const Express = require('express');
const router = Express.Router();

router.post("/checkout-session", createCheckoutSession);
router.post("/portal-session", createPortalSession);

module.exports = router;