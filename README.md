# 🧾 pedido-service

Microsserviço responsável por **registrar pedidos**, gerenciar seu **status** ao longo do tempo (ex: Em preparo, Pronto para retirada), bem como **consultar produtos disponíveis**. Este serviço também contém toda a lógica relacionada ao cardápio da lanchonete.

![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=eamaral_pedido-service&metric=coverage)

## 🔧 Tecnologias

- Node.js + Express
- MySQL (via Sequelize)
- Clean Architecture
- Jest para testes automatizados
- Swagger para documentação de API
- Deploy via ECS Fargate (AWS)
- Integração contínua com SonarCloud

## 📁 Estrutura

- `domain/`: Entidades e regras de negócio
- `application/`: Casos de uso
- `infrastructure/`: Sequelize, rotas, controladores
- `interfaces/`: Repositórios e contratos externos
- `config/`: Configurações globais e banco de dados

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

---

## 🚀 Deploy

- O serviço é empacotado via Docker
- Subido automaticamente para o Amazon ECR
- Deploy automatizado via GitHub Actions
- Executado no ECS Fargate com Load Balancer compartilhado

---

## 🧪 Testes

- Executados com **Jest**
- Cobertura mínima garantida de **80%**
- Um dos casos implementa **BDD**
- Resultados disponíveis no SonarCloud (badge acima)

---

## 📄 Swagger

- Acesse `/api-docs` no serviço para visualizar a documentação interativa

---

## 📄 Licença

Projeto acadêmico para fins de demonstração

