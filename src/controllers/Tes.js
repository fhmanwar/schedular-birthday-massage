const { find } = require('geo-tz');
const https = require('https');
const { hbOpt, hbHostOpt, hbPortOpt, hbPathOpt } = require('../config');

const getTimezone = async (req, res, next) => {
    try {
        var getZone = find(req.query.lat, req.query.long);
        return res.status(200).json({
            code: 1,
            msg: "Succesfully",
            data: getZone,
        });
    } catch (err) {
        next(err)
    }
};

const sendHook = async (req, res, next) => {
    try {

        const data = JSON.stringify({
            name: `Hey, ${req.query.name} it's your birthday`
        });

        console.log(`${hbOpt}`);

        const sendReq = https.request(hbOpt, (result) => {
            console.log(`status: ${result.statusCode}, msg: ${result.statusMessage}`);
        });
        
        sendReq.write(data);
        sendReq.end();


        return res.status(200).json({
            code: 1,
            msg: "Succesfully",
            data: [],
        });
    } catch (err) {
        next(err)
    }
};

module.exports = {
    getTimezone,
    sendHook,
}