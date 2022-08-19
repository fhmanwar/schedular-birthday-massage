const { dbConn } = require('../config');

const getByDate = async (date, next) => {
    try {
        var querySql = 'select * from ?? where isDone != 1 and  ?? = ?';
        const [row, fields] = await dbConn.promise().query(querySql, ['user', 'birthdate', date]);
        if (row.length > 0) {
            return [1, row];
        } else {
            return [0, null];
        }
    } catch (err) {
        next(err);
    }
};

const getByIdErr = async (Id, next) => {
    try {
        var querySql = 'select * from ?? where isDone != 1 and ?? in ?';
        const [row, fields] = await dbConn.promise().query(querySql, ['user', 'Id', date]);
        if (row.length > 0) {
            return [1, row];
        } else {
            return [0, null];
        }
    } catch (err) {
        next(err);
    }
};

const updBirthDate = async (isBirthday, id, next) => {
    try {
        var querySql = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
        const [rows, fields] = await dbConn.promise()
                        .query(querySql, ['user', 
                            'isBirthday', isBirthday,
                            'id', id
                        ]);
        if (rows.affectedRows > 0) {
            var res = {
                id: id,
                isBirthday: isBirthday,
            };
            return [1, res];
        } else {
            return [0, null];
        }
    } catch (e) {
        next(e);
    }
};
const updDone = async (isDone, id, next) => {
    try {
        var querySql = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
        const [rows, fields] = await dbConn.promise()
                        .query(querySql, ['user', 
                            'isDone', isDone,
                            'id', id
                        ]);
        if (rows.affectedRows > 0) {
            var res = {
                id: id,
                isDone: isDone,
            };
            return [1, res];
        } else {
            return [0, null];
        }
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getByDate,
    getByIdErr,
    updBirthDate,
    updDone,
}