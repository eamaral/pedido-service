# 📦 Pedido Service

Este microsserviço é responsável por gerenciar **pedidos** no sistema da lanchonete: criação, consulta, alteração de status e integração com pagamento e cliente.

> Projeto estruturado com **Clean Architecture**, separando regras de domínio, casos de uso, rotas e integração.

---

## 📊 SonarCloud

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=eamaral_pedido-service&metric=alert_status)](https://sonarcloud.io/dashboard?id=eamaral_pedido-service)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=eamaral_pedido-service&metric=coverage)](https://sonarcloud.io/dashboard?id=eamaral_pedido-service)
[![Maintainability](https://sonarcloud.io/api/project_badges/measure?project=eamaral_pedido-service&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=eamaral_pedido-service)

---

## ⚙️ Tecnologias Utilizadas

- Node.js + Express
- MySQL (RDS)
- Docker
- Swagger para documentação
- JWT (Bearer Token)
- Axios (chamadas para cliente-service)
- Sequelize (ORM)

---

## 🔗 Rotas Principais

| Método | Rota                           | Descrição                                       |
|--------|--------------------------------|-------------------------------------------------|
| POST   | `/api/pedidos`                | Cria novo pedido                                |
| GET    | `/api/pedidos/:id`            | Consulta pedido por ID                          |
| POST   | `/api/pedidos/pronto`         | Marca pedido como "Pronto para Retirada"        |
| POST   | `/api/pedidos/preparacao`     | Marca pedido como "Em Preparação"               |
| GET    | `/health`                     | Health check                                    |

> Swagger disponível em `/pedido-docs`.

---

## 🚀 Executando localmente

```bash
git clone https://github.com/seu-usuario/pedido-service.git
cd pedido-service
cp .env.example .env
# Preencha variáveis do banco e integração com cliente
docker-compose up --build
```

---

## 🧩 Clean Architecture

Estrutura do projeto organizada em camadas:

- `domain/`: entidades e contratos
- `usecases/`: regras de negócio
- `interfaces/http/`: controllers e rotas
- `infrastructure/`: repositórios e integrações (ex: ClienteApiRepository)
- `config/`: env, banco, swagger, etc.

---

## 🧪 Testes

- Testes unitários para os casos de uso com Jest
- Cobertura mínima de 80% integrada ao SonarCloud
- Testes focados em lógica de negócios (`usecases/`)

---

## 📦 CI/CD

- GitHub Actions: build, push da imagem Docker e deploy via Terraform
- Infraestrutura como código (IaC) com ECS Fargate, VPC, ALB e RDS

---

## 🛠️ Observações

- Cada pedido pertence a um cliente (validação via cliente-service)
- Status dos pedidos é atualizado via integração com pagamento
- Banco isolado por microsserviço (MySQL), conforme boas práticas

---

## 📄 Licença

Projeto acadêmico para fins de demonstração.
