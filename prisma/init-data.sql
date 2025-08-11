INSERT INTO "TransactionStatus" (id, name) VALUES
  (1, 'pending'),
  (2, 'approved'),
  (3, 'rejected')
ON CONFLICT (id) DO NOTHING;
