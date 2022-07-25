const { GeneralError, NotFound } = require("../utils/error");
const { GeneralResponse } = require("../utils/response");
const Pool  = require("../helpers/db.helper");
const messages = require("../utils/constants/messages");
const { STATUS } = require("../utils/constants/enum"); 

exports.getCategory = async (req, res, next) => {
    try {
        let sql = `SELECT child.id,
            child.cat_name,
            parent.id as parentId,
            parent.cat_name as parentName
            FROM categories child
            LEFT JOIN categories parent ON child.parent_id = parent.id WHERE child.status = '${STATUS.enable}';`;
        Pool.query(sql, (error, response) => {
            if (error) {
                console.log(error);
                next(new NotFound(messages.DATABASE_QUERY_ERROR));
            }
            else {
                (response.rowCount > 0) ? next(new GeneralResponse(messages.GET_RECORD, response.rows))
                    : next(new GeneralResponse(messages.DATA_NOT_FOUND, response.rows));
            }
        })
    }
    catch (err) {
        console.log(err);
        next(new GeneralError(messages.SOMETHING_WENT_WRONG))
    }
}