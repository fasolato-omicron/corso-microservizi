# CorsoMicroservizi

## Orders

- `http localhost:8080/orders/healthcheck`
- `echo '{"id": "6f7a80b9-6e65-4483-80d4-00011b94a584", "items": [{"id": "42f0aa33-ccf0-4ee8-a578-d6e720e39bf8", "quantity": 2, "unitPrice": 12.45}, {"id": "bc101645-779a-4f10-90f6-11bf95057d27", "quantity": 10, "unitPrice": 3.3}], "userId": "0e979720-52cf-4349-8930-98315da8373d"}' | http post localhost:8080/orders/confirm`