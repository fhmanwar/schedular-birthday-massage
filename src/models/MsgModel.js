const { dbConn } = require('../config');

const getAll = async (next) => {
    try {
        const [rows, fields] = await dbConn.promise().query('select * from phrase');
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
        const [row, fields] = await dbConn.promise().query(querySql, ['phrase', 'id', id]);
        if (row.length > 0) {
            return [1, row];
        } else {
            return [0, null];
        }
    } catch (err) {
        next(err);
    }
};


const add = async (data, next) => {
    try {
        var querySql = 'INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)';
        const [rows, fields] = await dbConn.promise()
                        .query(querySql, ['phrase', 
                            'firstname', 'lastname', 'birthdate', 'location',
                            data.firstname, data.lastname, data.birthdate, data.location
                        ]);
        if (rows.insertId > 0) {
            var res = {
                id: rows.insertId,
                firstname: data.firstname, 
                lastname: data.lastname,
                birthdate: data.birthdate,
                location: data.location,
            };
            return [1, res];
        } else {
            return [0, null];
        }
    } catch (e) {
        next(e);
    }
};

const upd = async (data, id, next) => {
    try {
        var querySql = 'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?';
        const [rows, fields] = await dbConn.promise()
                        .query(querySql, ['phrase', 
                            'firstname', data.firstname,
                            'lastname', data.lastname, 
                            'birthdate', data.birthdate,
                            'location', data.location,
                            'id', id
                        ]);
        if (rows.affectedRows > 0) {
            var res = {
                id: id,
                firstname: data.firstname, 
                lastname: data.lastname,
                birthdate: data.birthdate,
                location: data.location,
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
        const [rows, fields] = await dbConn.promise().query(querySql, ['phrase', 'id', id]);
        
        if (rows.affectedRows > 0) {
            return [1, null];
        } else {
            return [0, null];
        }
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getAll,
    getId,
    add,
    upd,
    del,
};