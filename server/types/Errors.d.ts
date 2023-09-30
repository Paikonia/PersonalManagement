interface ServerExceptions extends Error {
    status: number
}

interface SQLExceptions extends ServerExceptions {
  sqlState: string
}