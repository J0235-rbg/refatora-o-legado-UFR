# Projeto E-commerce - Refatorado com SOLID

Este projeto simula um backend de e-commerce que foi refatorado a partir de uma arquitetura "legada". Ele aplica os princípios **SOLID**, **Design Patterns** (Factory, Strategy e Repository) e uma separação em camadas bem definida para garantir alta manutenibilidade, testabilidade e extensibilidade.

---

## Estrutura de Diretórios

- `src/controllers/OrderController.ts`: **(HTTP)** Recebe as requisições, delega a execução para o `OrderService` e retorna as respostas HTTP.
- `src/domain/`: **(Regras de Negócio Puras)** Contém os modelos de domínio e abstrações dos produtos (`Product`, `PhysicalProduct`, `DigitalProduct`) e a `ProductFactory`.
- `src/services/`: **(Camada de Aplicação)** Orquestra o fluxo de criação e processamento do pedido (`OrderService` e `NotificationService`).
- `src/repositories/`: **(Acesso a Dados)** Abstrai a comunicação com o banco de dados via interface `IOrderRepository` e sua implementação concreta `PrismaOrderRepository`.
- `src/payments/`: **(Estratégias de Pagamento - Strategy Pattern)** Contém a interface `IPaymentMethod` e as implementações de formas de pagamento (`CreditCardPayment`, `PixPayment`).
- `src/providers/`: **(Serviços Externos)** Implementação do envio de e-mails (`IMailProvider` e `EtherealMailProvider`).
- `src/lib/`: Utilitários gerais do sistema (ex: `logger.ts` configurado com Winston).
- `prisma/`: Configuração do banco de dados SQLite (`schema.prisma`) e script de seed (`seed.ts`).

---

## Instalação e Configuração

Siga os passos abaixo no seu terminal para preparar e executar o ambiente de desenvolvimento:

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Crie a base de dados SQLite e aplique as tabelas:**
   ```bash
   npx prisma db push
   ```

3. **Gere os tipos do Prisma Client:**
   ```bash
   npx prisma generate
   ```

4. **Popule o banco com dados iniciais (Produtos Físicos e Digitais):**
   ```bash
   npx prisma db seed
   ```

---

## Execução

Para rodar a API em modo de desenvolvimento (com auto-reload ao alterar arquivos):

```bash
npm run dev
```

O servidor iniciará na porta configurada (padrão: `http://localhost:3000`).

---

## Como Testar

Você pode enviar requisições HTTP usando **cURL.exe** (PowerShell), **Git Bash** ou ferramentas como **Postman/Insomnia**.

### 1. Compra com Pix
Exemplo de requisição para pagamento via Pix:

```powershell
curl.exe -X POST http://localhost:3000/orders -H "Content-Type: application/json" -d "{\"customer\": \"joao@ethereal.email\", \"total\": 150.00, \"freight\": 15.00, \"status\": \"PENDING\", \"paymentMethod\": \"pix\", \"items\": [{\"productId\": 1, \"quantity\": 2, \"price\": 50.00}, {\"productId\": 2, \"quantity\": 1, \"price\": 50.00}]}"
```

### 2. Compra com Cartão de Crédito
Exemplo de requisição enviando detalhes do cartão de crédito:

```powershell
curl.exe -X POST http://localhost:3000/orders -H "Content-Type: application/json" -d "{\"customer\": \"maria@ethereal.email\", \"total\": 100.00, \"freight\": 10.00, \"status\": \"PENDING\", \"paymentMethod\": \"credit_card\", \"paymentDetails\": {\"cardNumber\": \"1234567812345678\", \"cvv\": \"123\"}, \"items\": [{\"productId\": 1, \"quantity\": 2, \"price\": 50.00}]}"
```

---

## Princípios SOLID e Padrões Aplicados

Abaixo estão as melhorias arquiteturais implementadas em relação à versão legada:

1. **Single Responsibility Principle (SRP):**
   - O `OrderController` é responsável estritamente pelo transporte HTTP.
   - A regra de negócio e orquestração residem no `OrderService`.
   - A persistência no banco foi desacoplada para o `PrismaOrderRepository`.
   - O disparo de notificações é gerenciado pelo `NotificationService` e `EtherealMailProvider`.

2. **Open/Closed Principle (OCP) & Strategy Pattern:**
   - Métodos de pagamento implementam a interface `IPaymentMethod`. Novas formas de pagamento podem ser adicionadas sem alterar o código existente.

3. **Liskov Substitution Principle (LSP) & Factory Pattern:**
   - A `ProductFactory` instancia a classe correta (`PhysicalProduct` ou `DigitalProduct`) herdando de `Product`.
   - O cálculo do frete varia polimorficamente conforme o tipo do produto.

4. **Dependency Inversion Principle (DIP):**
   - Os serviços dependem de interfaces (`IOrderRepository`, `IMailProvider`, `IPaymentMethod`) em vez de implementações concretas diretas.

---

## Árvore do Projeto

```text
src/
├── controllers/
│   └── OrderController.ts         # Controller HTTP
├── domain/                         # Modelos e Factory de Produtos
│   ├── Product.ts
│   ├── PhysicalProduct.ts
│   ├── DigitalProduct.ts
│   └── ProductFactory.ts
├── services/                       # Serviços de Aplicação
│   ├── OrderService.ts
│   └── NotificationService.ts
├── repositories/                  # Camada de Acesso a Dados
│   ├── IOrderRepository.ts
│   └── PrismaOrderRepository.ts
├── payments/                      # Estratégias de Pagamento
│   ├── IPaymentMethod.ts
│   ├── CreditCardPayment.ts
│   └── PixPayment.ts
├── providers/                     # Provedores Externos
│   ├── IMailProvider.ts
│   └── EtherealMailProvider.ts
├── lib/
│   └── logger.ts                  # Instância do Winston Logger
├── app.ts                         # Configuração de Middlewares e Rotas Express
└── server.ts                      # Bootstrapping e Inicialização do Servidor
```