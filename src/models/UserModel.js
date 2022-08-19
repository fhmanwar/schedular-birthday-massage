const { dbConn } = require('../config');
const { find } = require('geo-tz');

const add = async (data, next) => {
    try {
        var location = find(data.lat, data.long);
        var querySql = 'INSERT INTO ?? (??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?)';
        const [rows, fields] = await dbConn.promise()
                        .query(querySql, ['user', 
                            'firstname', 'lastname', 'birthdate', 'location', 'latitude', 'longtitude', 'isBirthday', 'isDone',
                            data.firstname, data.lastname, data.birthdate, location, data.lat, data.long, 0, 0
                        ]);
        if (rows.insertId > 0) {
            var res = {
                id: rows.insertId,
                firstname: data.firstname, 
                lastname: data.lastname,
                birthdate: data.birthdate,
                location: location,
                latitude: data.latitude,
                longtitude: data.longtitude,
            };
            return [1, res];
        } else {
            return [0, null];
        }
    } catch (e) {
        next(e);
    }
};

const del = async (id, next) => {
    try {
        var querySql = 'DELETE FROM ?? WHERE ?? = ? ';
        const [rows, fields] = await dbConn.promise().query(querySql, ['user', 'id', id]);
        
        if (rows.affectedRows > 0) {
            return [1, null];
        } else {
            return [0, null];
        }
    } catch (e) {
        next(e);
    }
};

const upd = async (data, id, next) => {
    try {
        var location = find(data.lat, data.long);
        var querySql = 'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?';
        const [rows, fields] = await dbConn.promise()
                        .query(querySql, ['user', 
                            'firstname', data.firstname,
                            'lastname', data.lastname, 
                            'birthdate', data.birthdate,
                            'location', location,
                            'latitude', data.lat,
                            'longtitude', data.long,
                            'id', id
                        ]);
        if (rows.affectedRows > 0) {
            var res = {
                id: id,
                firstname: data.firstname, 
                lastname: data.lastname,
                birthdate: data.birthdate,
                location: location,
                latitude: data.latitude,
                longtitude: data.longtitude,
            };
            return [1, res];
        } else {
            return [0, null];
        }
    } catch (e) {
        next(e);
    }
};

const getAll = async (next) => {
    try {
        const [rows, fields] = await dbConn.promise().query('select * from user');
        if (rows.length > 0) {
            return [1, rows];
        } else {
            return [0, null];
        }
    } catch (err) {
        next(err);
    }
};

const getId = async (id, next) => {
    try {
        var querySql = 'select * from ?? where ?? = ?';
        const [row, fields] = await dbConn.promise().query(querySql, ['user', 'id', id]);
        if (row.length > 0) {
            return [1, row];
        } else {
            return [0, null];
        }
    } catch (err) {
        next(err);
    }
};





module.exports = {
    getAll,
    getId,
    add,
    upd,
    del,
};