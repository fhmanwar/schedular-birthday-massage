const birthModel = require('../models/UserModel');

const userAdd = async(req, res, next) => {
    try {
        // console.log(req.body);
        const [status, data] = await birthModel.add(req.body, next);
        // console.log(data);
        if (status == 0) {
            return res.status(201).json({
                code: status,
                msg: "Succesfully",
                data: [],
            });
        } 
        
        return res.status(200).json({
            code: status,
            msg: "Succesfully",
            data: data,
        });
    } catch (err) {
        next(err);
    }
};
const userDel = async (req, res, next) => {
    try {
        const [status, data] = await birthModel.del(req.params.id, next);
        
        if (status == 0) {
            return res.status(201).json({
                code: status,
                msg: "Succesfully",
                data: [],
            });
        } 
        
        return res.status(200).json({
            code: status,
            msg: "Succesfully",
            data: data,
        });

    } catch (err) {
        next(err);
    }
};

const userUpd = async (req, res, next) => {
    try {
        const [status, data] = await birthModel.upd(req.body, req.params.id, next);
        
        if (status == 0) {
            return res.status(201).json({
                code: status,
                msg: "Succesfully",
                data: [],
            });
        } 
        
        return res.status(200).json({
            code: status,
            msg: "Succesfully",
            data: data,
        });

    } catch (err) {
        next(err);
    }
};

const userAll = async(req, res, next) => {
    try {
        const [status, data] = await birthModel.getAll();
        // console.log(data);
        if (status < 1) {
            return res.status(201).json({
                code: status,
                msg: "Succesfully",
                data: [],
            });
        }

        return res.status(200).json({
            code: status,
            msg: "Succesfully",
            data: data,
        });

    } catch (err) {
        console.log(err);
        next(err);
    }
};

const userId = async (req, res, next) => {
    try {
        // console.log(req.params.id);
        const [status, data] = await birthModel.getId(req.params.id, next);
        // console.log(data);
        if (status < 1) {
            return res.status(201).json({
                code: status,
                msg: "Succesfully",
                data: [],
            });
        }

        return res.status(200).json({
            code: status,
            msg: "Succesfully",
            data: {
                id: data[0].id,
                firstname: data[0].firstname, 
                lastname: data[0].lastname,
                birthdate: data[0].birthdate,
                location: data[0].location,
            },
        });

    } catch (e) {
        console.log(e);
        next(e);
    }
};

module.exports = {
    userAll,
    userId,
    userAdd,
    userUpd,
    userDel,
}