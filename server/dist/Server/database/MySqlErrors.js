"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SQLErrors_1 = require("../Constants/SQLErrors");
const constructSQLError = (err) => {
    const common = SQLErrors_1.COMMONERRORS[err.errno.toString()];
    if (common) {
        common.message = err.sqlMessage;
        return common;
    }
    const noneCommon = SQLErrors_1.SQLERRORS[err.sqlState];
    if (noneCommon) {
        if (err.sqlState === "23000" ||
            err.sqlState === "22001" ||
            err.sqlState === "HY000") {
            noneCommon.message = err.sqlMessage;
            return noneCommon;
        }
        return noneCommon;
    }
    return {
        name: "Unknown error",
        message: "An unknown error occurred",
        status: 500,
    };
};
exports.default = constructSQLError;
