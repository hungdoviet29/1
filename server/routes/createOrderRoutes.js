const express = require('express');
const axios = require('axios');
const CryptoJS = require('crypto-js');
const moment = require('moment');
const cron = require('node-cron')

const { dbFirestore } = require('./firebase');
const { checkAndDeleteExpireOrders, checkBillContractAndUpdateContracts, checkAndUpdateContractsStatus, checkAndUpdateExpiredContracts, checkAndUpdateExpiresSoonContracts } = require('./checkExpireOrder')

const router = express.Router();
const config = require('../config/config');

router.post('/create-order', async (req, res) => {
    try {
        const { amount, contractId, billId, items, typeBill } = req.body;

        const transID = Math.floor(Math.random() * 1000000);

        const order = {
            app_id: config.app_id,
            app_user: 'StayNow',
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
            app_time: Date.now(),
            expire_duration_seconds: 900,
            amount: amount,
            item: items,
            description: `Payment for order #${transID}`,
            embed_data: JSON.stringify({}),
            bank_code: "zalopayapp",
            callback_url: config.callback_url,
        };

        const paymentTransaction = {
            ...order,
            contractId: contractId,
            billId: billId,
            typeBill: typeBill,
            status: 'PENDING',
            expire_duration_seconds: order.expire_duration_seconds,
            created_at: Date.now(),
        };

        const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        const response = await axios.post(config.endpoint, null, { params: order });
        paymentTransaction.zp_trans_token = response.data.zp_trans_token
        paymentTransaction.order_url = response.data.order_url

        // Lưu thông tin chi tiết thanh toán vào Firestore
        await dbFirestore.collection('PaymentTransaction').doc(order.app_trans_id).set(paymentTransaction);

        res.json({
            success: true,
            zalopay_response: response.data
        });
        console.log(response.data);


    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

router.post('/create-order-service', async (req, res) => {
    try {
        const { amount, billId, items, typeBill } = req.body;

        const transID = Math.floor(Math.random() * 1000000);

        const order = {
            app_id: config.app_id,
            app_user: 'StayNow',
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
            app_time: Date.now(),
            expire_duration_seconds: 900,
            amount: amount,
            item: items,
            description: `Payment for order #${transID}`,
            embed_data: JSON.stringify({}),
            bank_code: "zalopayapp",
            callback_url: config.callback_url_service,
        };

        const paymentTransaction = {
            ...order,
            billId: billId,
            typeBill: typeBill,
            status: 'PENDING',
            expire_duration_seconds: order.expire_duration_seconds,
            created_at: Date.now(),
        };

        const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        const response = await axios.post(config.endpoint, null, { params: order });
        paymentTransaction.zp_trans_token = response.data.zp_trans_token
        paymentTransaction.order_url = response.data.order_url

        // Lưu thông tin chi tiết thanh toán vào Firestore
        await dbFirestore.collection('PaymentTransactionService').doc(order.app_trans_id).set(paymentTransaction);

        res.json({
            success: true,
            zalopay_response: response.data
        });
        console.log(response.data);


    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

cron.schedule('*/10 * * * *', checkAndDeleteExpireOrders);
cron.schedule('0 */1 * * *', checkBillContractAndUpdateContracts);
cron.schedule('0 */1 * * *', checkAndUpdateContractsStatus);
cron.schedule('0 */1 * * *', checkAndUpdateExpiredContracts);
cron.schedule('0 */1 * * *', checkAndUpdateExpiresSoonContracts);

module.exports = router;
