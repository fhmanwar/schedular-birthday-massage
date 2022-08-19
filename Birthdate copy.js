const birthModel = require('../models/BirthdayModel');
const cron = require("node-cron");
const https = require("https");
const axios = require("axios");
const { hbOpt } = require('../config');

const getbirthDate = async (req, res, next) => {
    try {
        
        var dateTime = new Date();
        var date = dateTime.getDate();
        var month = dateTime.getMonth() + 1;
        var year = dateTime.getFullYear();
        var getDate = year + "-" + month + "-" + date;
        // console.log(getDate);
        
        var [status, data] = await birthModel.getByDate(getDate, next);
        // console.log(data);
        
        if (status = 1) {
            // console.log(data);
            var arrData = [];
            data.forEach(item => {
                // cron.schedule("0 9 * * *", () => {
                cron.schedule("17 17 * * *", () => {
                    console.log(item.birthdate);
                    const data = JSON.stringify({
                        name: `Hey, ${item.firstname} ${item.lastname} it's your birthday`
                    });
            
                    console.log(`${hbOpt}`);

                    axios
                    .post(`https://${hbOpt.hostname}${hbOpt.path}`, {
                        todo: data,
                    })
                    .then(resHook => {
                        console.log(`status: ${resHook.status}`);
                    })
                    .catch(err => {
                        arrData.push(item.id)
                        console.log(err);
                    });
            
                    // const sendReq = https.request(hbOpt, (result) => {
                    //     console.log(`status: ${result.statusCode}, msg: ${result.statusMessage}`);

                    //     result.on('data', d => {
                    //         process.stdout.write(d);
                    //     });
                    // });
                    // sendReq.on('error', err => {
                    //     console.log(err);;
                    // });
                    // // sendReq.write(data);
                    // // sendReq.end();
                }, {
                    scheduled: true,
                    timezone: item.location
                }); //end cron
            });

            return res.status(200).json({
                code: status,
                msg: "Succesfully",
                data: data,
            });
        }
        
        return res.status(201).json({
            code: status,
            msg: "Succesfully",
            data: [],
        });

    } catch (e) {
        console.log(e);
        next(e);
    }
};

module.exports = {
    getbirthDate,
}