const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('../src/app');

function request(server, method, path, body = null) {
  return new Promise((resolve, reject) => {
    const port = server.address().port;
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: '127.0.0.1',
      port,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    };

    const req = http.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => (responseBody += chunk));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          body: responseBody ? JSON.parse(responseBody) : null
        });
      });
    });

    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

describe('Fluxo Principal de Pedidos (Projeto B)', () => {
  beforeEach(() => {
    app.resetOrders();
  });

  it('deve retornar status 200 no endpoint /health', async () => {
    const server = app.listen(0);
    try {
      const res = await request(server, 'GET', '/health');
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.status, 'ok');
    } finally {
      server.close();
    }
  });

  it('deve criar um pedido válido e listá-lo em seguida', async () => {
    const server = app.listen(0);
    try {
      const createRes = await request(server, 'POST', '/orders', {
        customer: 'Maria Silva',
        item: 'Monitor 24"',
        amount: 899.9
      });

      assert.strictEqual(createRes.status, 201);
      assert.strictEqual(createRes.body.id, 1);
      assert.strictEqual(createRes.body.customer, 'Maria Silva');

      const listRes = await request(server, 'GET', '/orders');
      assert.strictEqual(listRes.status, 200);
      assert.strictEqual(listRes.body.length, 1);
      assert.strictEqual(listRes.body[0].item, 'Monitor 24"');
    } finally {
      server.close();
    }
  });

  it('deve retornar erro 400 ao enviar pedido inválido', async () => {
    const server = app.listen(0);
    try {
      const res = await request(server, 'POST', '/orders', {
        customer: '',
        amount: -10
      });
      assert.strictEqual(res.status, 400);
    } finally {
      server.close();
    }
  });
});