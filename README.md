# Projeto Final Full Cycle — Nível B (API de Pedidos)

Sistema de domínio único para criação e listagem de pedidos, desenvolvido como entrega do **Projeto Final (Nível B)** seguindo princípios de arquitetura limpa, qualidade automatizada, conteinerização e documentação viva.

## 1. Visão Geral e Arquitetura
A aplicação consiste em uma API REST monolítica modular em **Node.js 20 + Express**, com estado armazenado em memória e test runner nativo (`node:test`).
* **Diagramas C4 (Contexto e Containers):** [`docs/arquitetura-c4.md`](docs/arquitetura-c4.md)
* **Registro de Decisão Arquitetural (ADR):** [`docs/adr/0001-decisao.md`](docs/adr/0001-decisao.md)
* **Contrato OpenAPI:** [`docs/openapi.yaml`](docs/openapi.yaml)
* **Runbook Operacional:** [`docs/runbook.md`](docs/runbook.md)

## 2. Como Executar
### Via Docker Compose
```bash
docker compose up --build -d