# Arquitetura do Sistema (Modelo C4 - Níveis 1 e 2)

## Nível 1: Diagrama de Contexto
O sistema **API de Pedidos (Projeto B)** permite que clientes e sistemas externos criem e consultem pedidos de forma simples via HTTP/REST.

```mermaid
C4Context
    title Diagrama de Contexto - API de Pedidos
    Person(cliente, "Cliente / Consumidor API", "Envia requisições para criar e listar pedidos.")
    System(api, "API de Pedidos (Projeto B)", "Sistema monolítico modular em Node.js responsável pelo ciclo básico de pedidos.")
    Rel(cliente, api, "Cria e consulta pedidos", "JSON / HTTP")