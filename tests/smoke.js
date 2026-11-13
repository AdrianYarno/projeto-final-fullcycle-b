import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '10s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<200'],
  },
};

export default function () {
  const resHealth = http.get('http://localhost:3000/health');
  check(resHealth, { 'health status 200': (r) => r.status === 200 });

  const payload = JSON.stringify({
    customer: 'Cliente Smoke',
    item: 'Produto Teste',
    amount: 99.9,
  });

  const params = { headers: { 'Content-Type': 'application/json' } };
  const resPost = http.post('http://localhost:3000/orders', payload, params);
  check(resPost, { 'pedido criado 201': (r) => r.status === 201 });

  sleep(0.5);
}