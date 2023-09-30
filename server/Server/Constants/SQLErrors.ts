export const COMMONERRORS: { [key: string]: ServerExceptions } = {
  "1062": {
    name: "DUP_ENTRY",
    message: "",
    status: 400,
  },
  "1216": {
    name: "NO_REFERENCED_ROW",
    message: "",
    status: 400,
  },
  "1217": {
    name: "ROW_IS_REFERENCED",
    message: "",
    status: 400,
  },
  "1364": {
    name: "NO_DEFAULT_VALUE",
    message: "",
    status: 400,
  },
  "1365": {
    name: "NO_DEFAULT_VALUE_FOR_FUNCTION",
    message: "",
    status: 400,
  },
  "1265": {
    name: "TRUNCATED",
    message: "",
    status: 400,
  },
  "1264": {
    name: "OUT_OF_RANGE",
    message: "",
    status: 400,
  },
  "1411": {
    name: "INVALID_DATETIME_FORMAT",
    message: "",
    status: 400,
  },
  "1406": {
    name: "DATA_TOO_LONG",
    message: "",
    status: 400,
  },
  "1172": {
    name: "TOO_MANY_ROWS",
    message: "",
    status: 400,
  },
};

export const SQLERRORS: { [key: string]: ServerExceptions } = {
  "3024E": {
    name: "Query Execution Interrupted",
    message:
      "Write operations that take too long to execute may lead to query timeouts.",
    status: 500,
  },
  "40000": {
    name: "Transaction Rollback",
    message:
      "Transactions may be rolled back due to various issues, including constraint violations, deadlock resolution, or other errors during write operations.",
    status: 500,
  },
  "22001": {
    name: "Data truncated",
    message: "",
    status: 400,
  },
  "23000": {
    name: "Integrity constraint violation",
    message: "",
    status: 400,
  },
  "08S01": {
    name: "Connection lost failure",
    message: "Failed to connect to mysqlServer",
    status: 500,
  },
  "40001": {
    name: "Operation Failure",
    message: "Failed to carryout operation, please try again.",
    status: 500,
  },
  HY001: {
    name: "Insufficient Memory",
    message: "Insufficient memory to carryout operation",
    status: 500,
  },
  "22007": {
    name: "Invalid datetime format",
    message:
      "The date format entered is incorrect. Please check the mysql documentation.",
    status: 400,
  },
  "42000": {
    name: "Syntax error or access violation",
    message: "Incorrect operations. Please contact the developer.",
    status: 500,
  },
  "42S02": {
    name: "Table Not Found",
    message: "The Sql table you are carrying out operations on was not found",
    status: 404,
  },
  "3D000": {
    name: "Database Not Found",
    message: "The database you are looking for is not found",
    status: 404,
  },
  HY000: {
    name: "Generic Error",
    message: "",
    status: 500,
  },
  "08001": {
    name: "Unable To Connect To Data Source",
    message: "The server failed to connect to the database",
    status: 500,
  },
  "08004": {
    name: "Rejected Connection",
    message: "The database is currently not available",
    status: 500,
  },
};
