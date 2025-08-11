export const TRANSACTION_MESSAGES = {
  CREATED_SUCCESS: 'Transacción creada correctamente',
  CREATED_FAIL: 'No se pudo crear la transacción',
};

export const CONFIG = {
  databaseUrl: process.env.DATABASE_URL || "postgresql://postgres:postgres@postgres:5432/postgres?schema=public",
  kafkaBrokers: (process.env.KAFKA_BROKERS || "localhost:9092").split(","),
};

export const TRANSACTION_STATUS = {
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
}

export const TRANSACTION_TOPICS = {
  CREATED_REQUEST: 'transactions.created.request',
  CREATED_RESPONSE: 'transactions.created.response',
  VALIDATED_REQUEST: 'transactions.validated.request',
  VALIDATE_UPDATE_REQUEST: 'transactions.validated.request.update',
  VALIDATE_UPDATE_RESPONSE: 'transactions.validated.request.update.response',
  GET_TRANSACTION_REQUEST: 'transactions.get.request',
  GET_TRANSACTION_RESPONSE: 'transactions.get.response',
}