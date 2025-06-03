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

## 📦 Banco de dados

- MySQL (Amazon RDS)
- Tabelas:
  - `Pedidos`
  - `Produtos`

## 🔄 Integrações

- `cliente-service` (consulta e atualiza pontos do cliente)
- `pagamento-service` (recebe notificação de status "pago")
- APIs se comunicam via chamadas HTTP com variáveis de ambiente configuradas

---

## 📌 Endpoints

### 📦 Produtos

| Método | Rota              | Descrição                        |
|--------|-------------------|----------------------------------|
| GET    | `/produtos`       | Lista todos os produtos          |
| GET    | `/produtos/:id`   | Retorna um produto específico    |
| POST   | `/produtos`       | Cadastra novo produto            |
| PUT    | `/produtos/:id`   | Atualiza um produto              |
| DELETE | `/produtos/:id`   | Remove um produto                |

### 🧾 Pedidos

| Método | Rota                  | Descrição                                 |
|--------|-----------------------|-------------------------------------------|
| POST   | `/pedidos`            | Cria um novo pedido                       |
| GET    | `/pedidos`            | Lista todos os pedidos                    |
| GET    | `/pedidos/:id`        | Consulta pedido por ID                    |
| PATCH  | `/pedidos/:id/status` | Atualiza status do pedido                 |
| GET    | `/pedidos/status/em-preparo` | Lista pedidos em preparo         |
| PATCH  | `/pedidos/:id/para-em-preparo` | Muda para status "Em preparo"    |
| PATCH  | `/pedidos/:id/pronto` | Muda para status "Pronto para retirada"   |


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
