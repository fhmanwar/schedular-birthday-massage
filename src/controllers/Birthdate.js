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
                (async () => {
                    await birthModel.updBirthDate(1, item.id, next);
                })();
                cron.schedule("0 9 * * *", () => {
                // cron.schedule("20 18 * * *", () => {
                    console.log(item.birthdate);
                    console.log(`Hey, ${item.firstname} ${item.lastname} it's your birthday`);
                    const data = JSON.stringify({
                        name: `Hey, ${item.firstname} ${item.lastname} it's your birthday`
                    });
            
                    console.log(`${hbOpt}`);

                    axios
                    .post(`https://${hbOpt.hostname}${hbOpt.path}`, {
                        todo: data,
                    })
                    .then(resHook => {
                        (async () => {
                            await birthModel.updDone(1, item.id, next);
                        })();
                        console.log(`status: ${resHook.status}`);
                    })
                    .catch(err => {
                        arrData.push(item.id)
                        console.log(err);
                    });
                }, {
                    scheduled: true,
                    timezone: item.location
                }); //end cron
            });

            if (arrData.length >= 1) {
                var [statusErr, dataErr] = await birthModel.getByIdErr(arrData, next);
                dataErr.forEach(item => {
                    if (getDate == item.birthdate) {
                        cron.schedule("* * * * *", () => {
                            console.log(arrData);
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
                                (async () => {
                                    await birthModel.updDone(1, item.id, next);
                                })();
                                console.log(`status: ${resHook.status}`);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                        }, {
                            scheduled: true,
                            timezone: item.location
                        }); //end cron
                    }
                });
    
            }

        }
        return res.status(200).json({
            code: status,
            msg: "api path not found, add /api/ to use API",
            data: data,
        });
        
    } catch (e) {
        console.log(e);
        next(e);
    }
};

module.exports = {
    getbirthDate,
}