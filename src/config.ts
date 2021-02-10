const PORT = process.env.PORT || 8080
const NODE_ENV = process.env.NODE_ENV || 'development'
const MYSQL_HOST = process.env.MYSQL_HOST || '127.0.0.1'
const MYSQL_PORT = process.env.MYSQL_PORT || 3306
const MYSQL_USER = process.env.MYSQL_USER || ''
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || ''
const MYSQL_DB = process.env.MYSQL_DB || 'atomic_id_collector'

export {
  PORT,
  NODE_ENV,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DB,
}
