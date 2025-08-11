import axios from 'axios';
import pLimit from 'p-limit';
import { v4 as uuidv4 } from 'uuid';

const URL = 'http://localhost:3000/transactions';

const CONCURRENCY = 4000;   // concurrencia máxima simultánea
const BATCH_SIZE = 4000;    // tamaño del batch (menos o igual a concurrencia)
const MAX_REQUESTS = 100000; // límite total de solicitudes POST + GET (cada solicitud cuenta)

const limit = pLimit(CONCURRENCY);

interface TransactionResponse {
  transactionExternalId?: string;
  transactionId?: string;
  [key: string]: any;
}

interface Metrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  latencies: number[];
}

interface GlobalMetrics extends Metrics {
  startTime?: number;
  endTime?: number;
}

const metrics: Metrics = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  latencies: [],
};

const globalMetrics: GlobalMetrics = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  latencies: [],
};

async function timedRequest<T>(fn: () => Promise<T>): Promise<T | null> {
  const start = Date.now();
  try {
    const result = await fn();
    const duration = Date.now() - start;
    metrics.latencies.push(duration);
    metrics.successfulRequests++;
    metrics.totalRequests++;
    return result;
  } catch (err: any) {
    metrics.failedRequests++;
    metrics.totalRequests++;
    console.error('Request error:', err.message || err);
    return null;
  }
}

async function sendPostBatch(batchSize: number): Promise<string[]> {
  const ids: string[] = [];
  console.log(`Starting POST batch of size ${batchSize}...`);

  const postRequests = Array.from({ length: batchSize }, (_, i) =>
    limit(async () => {
      const res: any = await timedRequest(() =>
        axios.post<TransactionResponse>(URL, {
          accountExternalIdDebit: uuidv4(),
          accountExternalIdCredit: uuidv4(),
          tranferTypeId: Math.floor(Math.random() * 10) + 1,
          value: Math.floor(Math.random() * 2000) + 1,
        })
      );
      if (res && (res.data?.data?.transactionId || res.data?.data?.transactionExternalId)) {
        const txId = res.data?.data?.transactionId || res.data?.data?.transactionExternalId!;
        ids.push(txId);
      }
    })
  );

  await Promise.all(postRequests);
  console.log(`POST batch finished, created ${ids.length} transactions`);
  return ids;
}

async function sendGetBatch(ids: string[]): Promise<void> {
  console.log(`Starting GET batch for ${ids.length} transactions...`);

  const getRequests = ids.map(id =>
    limit(() =>
      timedRequest(() => axios.get(`${URL}/${id}`))
    )
  );

  await Promise.all(getRequests);
  console.log(`GET batch finished for ${ids.length} transactions`);
}

function printMetrics() {
  if (metrics.latencies.length === 0) return;
  metrics.latencies.sort((a, b) => a - b);
  const p50 = metrics.latencies[Math.floor(metrics.latencies.length * 0.5)] || 0;
  const p90 = metrics.latencies[Math.floor(metrics.latencies.length * 0.9)] || 0;
  const p99 = metrics.latencies[Math.floor(metrics.latencies.length * 0.99)] || 0;
  console.log(`
    --- Metrics ---
    Total requests: ${metrics.totalRequests}
    Success: ${metrics.successfulRequests}
    Failed: ${metrics.failedRequests}
    Latency ms (p50/p90/p99): ${p50} / ${p90} / ${p99}
  `);

  // Reset metrics batch
  metrics.totalRequests = 0;
  metrics.successfulRequests = 0;
  metrics.failedRequests = 0;
  metrics.latencies = [];
}

async function runLoadTest() {
  let totalSent = 0;
  globalMetrics.startTime = Date.now();

  while (totalSent < MAX_REQUESTS) {
    const remaining = MAX_REQUESTS - totalSent;
    const currentBatchSize = Math.min(BATCH_SIZE, remaining);

    const ids = await sendPostBatch(currentBatchSize);
    totalSent += currentBatchSize;

    await new Promise(r => setTimeout(r, 1000));

    if (ids.length > 0) {
      await sendGetBatch(ids);
    }

    // Acumular métricas batch en global
    globalMetrics.totalRequests += metrics.totalRequests;
    globalMetrics.successfulRequests += metrics.successfulRequests;
    globalMetrics.failedRequests += metrics.failedRequests;
    globalMetrics.latencies.push(...metrics.latencies);

    printMetrics();
  }

  globalMetrics.endTime = Date.now();

  const totalTimeSec = (globalMetrics.endTime - globalMetrics.startTime) / 1000;

  globalMetrics.latencies.sort((a, b) => a - b);
  const p50 = globalMetrics.latencies[Math.floor(globalMetrics.latencies.length * 0.5)] || 0;
  const p90 = globalMetrics.latencies[Math.floor(globalMetrics.latencies.length * 0.9)] || 0;
  const p99 = globalMetrics.latencies[Math.floor(globalMetrics.latencies.length * 0.99)] || 0;

  console.log(`
    === Global test results ===
    Total requests: ${globalMetrics.totalRequests}
    Success: ${globalMetrics.successfulRequests}
    Failed: ${globalMetrics.failedRequests}
    Latency ms (p50/p90/p99): ${p50} / ${p90} / ${p99}
    Total execution time: ${totalTimeSec.toFixed(2)} seconds
  `);
}

async function main() {
  console.log('Starting load test with limit', MAX_REQUESTS);
  await runLoadTest();
}

main();
