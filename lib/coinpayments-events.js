const Coinpayments = require('coinpayments');

class CPEventHandler {

    constructor() {
        Coinpayments.events.on("ipn_pending", this.pending);
        Coinpayments.events.on("ipn_success", this.success);
        Coinpayments.events.on("ipn_fail", this.fail);
    }

    fail(data) {
        console.log("Fail unimplemented");
        //TODO: Implement fail condition (aka remove dead transactions from DB)
    }

    pending(data) {
        if(data.amount2 === data.received_amount) {
            console.log("Pre-emptively sending payment notification to streamer " + data.item_name);
            global.database.pool.query("UPDATE `transactions` SET order_status=? WHERE order_id=?", [1, data.txn_id], function (err, res) {
                if(err) {
                    console.error("Warning: failed to set transaction status to IN_PROGRESS");
                    console.error(err);
                }
                //TODO: Post streamer notification
            });
        }
    }

    success(data) {
        console.log("Confirming order for streamer " + data.item_name);
        //TODO: Consolidate to one transaction (aka getConnection)
        global.database.pool.query("UPDATE `transactions` SET order_status=? WHERE ?", [2, data.txn_id], function (err, res) {
            var updateTo = {};
            data[data.currency2.toLowerCase()] =
            global.database.pool.query("UPDATE `ledger` SET ", {}, function (err, res) {

            });
        });
    }
}