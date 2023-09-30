import { COMMONERRORS, SQLERRORS } from "../Constants/SQLErrors";

const constructSQLError = (err: any): ServerExceptions => {
  const common = COMMONERRORS[err.errno.toString()];
  if (common) {
    common.message = err.sqlMessage;
    return common;
  }

  const noneCommon = SQLERRORS[err.sqlState];
  if (noneCommon) {
    if (
      err.sqlState === "23000" ||
      err.sqlState === "22001" ||
      err.sqlState === "HY000"
    ) {
      noneCommon.message = err.sqlMessage;
      return noneCommon;
    }

    return noneCommon;
  }

   return {
     name: "Unknown error",
     message: "An unknown error occurred",
     status: 500,
   } as ServerExceptions;
};


export default constructSQLError;