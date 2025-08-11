#!/bin/bash
set -e

echo "Esperando a Kafka..."
while ! kafka-topics --list --bootstrap-server kafka:29092 > /dev/null 2>&1; do
  echo "Kafka no está listo, esperando 5s..."
  sleep 5
done

echo "Creando tópicos..."

create_topic() {
  kafka-topics --create --topic "$1" --partitions 3 --replication-factor 1 --bootstrap-server kafka:29092 2>&1 | grep -q 'Topic.*already exists' && echo "Tópico $1 ya existe." || echo "Tópico $1 creado."
}

create_topic transactions.created.request
create_topic transactions.created.response
create_topic transactions.validated.request
create_topic transactions.validated.request.update
create_topic transactions.validated.request.update.response
create_topic transactions.get.request
create_topic transactions.get.response

# DLQ
create_topic transactions.created.request.dlq
create_topic transactions.created.response.dlq
create_topic transactions.validated.request.dlq
create_topic transactions.validated.request.update.dlq
create_topic transactions.validated.request.update.response.dlq
create_topic transactions.get.request.dlq
create_topic transactions.get.response.dlq



echo "Proceso terminado."
