const express = require('express');
const router = express.Router();
const SocketManager = require('/lib/socket-manager');

router.post('/api/alertbox/execute-test', function(req, res, next) {
    global.database.pool.query("SELECT id FROM `users` WHERE alertboxApiKey=?", [req.body.alertboxKey], function (err, data) {
        if(data[0].id === req.body.user_id) {
            SocketManager.instance.socketManager.to(req.body.alertboxKey).emit({
                from: "Test Buyer",
                amount: 0.00245,
                currency: "TST",
                message: "This is a test submission of 0.00245 TST",
                image: "/img/ltc.png"
            });
            res.json({success: true});
        } else {
            res.json({success: false});
        }
    });
});


/* GET home page. */
router.get('/api/alertbox/:key', function(req, res, next) {
    res.render('index', { alertboxKey: req.params.key });
});
module.exports = router;
