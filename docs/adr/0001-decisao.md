# ADR 0001: Arquitetura Monolítica Modular em Memória com Node.js Nativo

* **Status:** Aceito
* **Data:** 2026-11-13
* **Contexto:** O Projeto B exige um sistema de domínio único (Gestão de Pedidos) com foco em clareza estrutural, testabilidade automatizada, conteinerização simples e documentação viva, sem complexidade acidental de múltiplos microsserviços.

## Decisão
Optamos por construir uma API REST monolítica modular utilizando Node.js 20 com Express, mantendo a camada HTTP (`src/app.js`) desacoplada da inicialização do servidor (`src/server.js`) e utilizando o test runner nativo (`node:test`) com armazenamento em memória para execução determinística.

## Consequências
* **Positivas:** Zero dependências pesadas de banco de dados externo para rodar testes e CI; build Docker enxuto baseado em `node:20-alpine`; execução rápida de testes unitários e de integração.
* **Negativas / Trade-offs:** Os dados são voláteis e reiniciados a cada restart do container, exigindo a evolução para persistência em banco relacional (ex: PostgreSQL) em um cenário de produção real.