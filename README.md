# Node.js TDD Clean Architecture - Sistema Completo de Autenticação Facebook

Este projeto demonstra um **sistema completo de autenticação com Facebook** implementado com Clean Architecture, TDD, Anti Corruption Layer, Application Layer, e todos os Design Patterns modernos para um sistema robusto e escalável.

## 🏗️ Arquitetura Implementada

```
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                        │
├─────────────────────────────────────────────────────────────┤
│  Controllers (Template Method) | Validation (Composite)     │
│  Error Handling | HTTP Helpers | Fluent Builder            │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                     DOMAIN LAYER                            │
├─────────────────────────────────────────────────────────────┤
│     Use Cases (Interfaces) | Entities (Business Rules)     │
│  AccessToken | FacebookAccount | FacebookAuthentication     │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                             │
├─────────────────────────────────────────────────────────────┤
│     Services | Contracts (Repositories, APIs, Crypto)      │
│           FacebookAuthenticationService                     │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                 INFRASTRUCTURE LAYER                        │
├─────────────────────────────────────────────────────────────┤
│  APIs | HTTP Clients | Database (TypeORM) | JWT | Crypto   │
│      Anti Corruption Layer | External Integrations         │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Stack Tecnológica

### Core
- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem com tipagem estática
- **Jest** - Framework de testes (42 testes)
- **ESLint** - Code quality e formatting

### Database & ORM
- **TypeORM** - ORM para TypeScript/JavaScript
- **MySQL** - Banco de dados principal
- **SQLite** - Banco em memória para testes

### HTTP & External APIs
- **Axios** - HTTP client
- **Facebook Graph API** - Integração com Facebook
- **JWT** - JSON Web Tokens para autenticação

### Design Patterns & Architecture
- **Clean Architecture** - Separação de responsabilidades
- **Template Method Pattern** - Controllers base
- **Composite Pattern** - Sistema de validação
- **Fluent Builder Pattern** - Construção de validadores
- **Anti Corruption Layer** - Isolamento de APIs externas
- **Repository Pattern** - Abstração de dados
- **Dependency Injection** - Inversão de dependências

## 📁 Estrutura Completa do Projeto

```
src/
├── application/                 # APPLICATION LAYER
│   ├── controllers/            # Controllers com Template Method
│   │   ├── controller.ts       # Base controller abstrato
│   │   ├── facebook-login.ts   # Controller do login Facebook
│   │   └── index.ts
│   ├── errors/                 # Erros customizados
│   │   └── http.ts            # AuthenticationError, ValidationError
│   ├── helpers/                # Helpers genéricos
│   │   └── http.ts            # HttpRequest, HttpResponse, helpers
│   └── validation/             # Sistema de validação
│       ├── validator.ts        # Validator interface, Composite
│       ├── builder.ts         # Fluent Builder para validação
│       └── index.ts
├── domain/                     # DOMAIN LAYER
│   ├── entities/              # Entidades de negócio
│   │   ├── access-token.ts    # Token com expiração
│   │   ├── facebook-account.ts # Conta Facebook
│   │   └── index.ts
│   └── use-cases/             # Casos de uso (interfaces)
│       ├── facebook-authentication.ts
│       └── index.ts
├── data/                      # DATA LAYER
│   ├── contracts/             # Contratos/Interfaces
│   │   ├── apis/             # Contratos de APIs externas
│   │   │   └── facebook.ts   # LoadFacebookUser
│   │   ├── crypto/           # Contratos de criptografia
│   │   │   └── token.ts      # TokenGenerator
│   │   ├── http/             # Contratos HTTP
│   │   │   └── http-get-client.ts
│   │   └── repos/            # Contratos de repositórios
│   │       └── user-account.ts # LoadUserAccount, SaveFacebookAccount
│   └── services/             # Implementações dos casos de uso
│       ├── facebook-authentication.ts # Service principal
│       └── index.ts
└── infra/                     # INFRASTRUCTURE LAYER
    ├── apis/                  # Implementações de APIs externas
    │   ├── facebook.ts        # Facebook Graph API integration
    │   └── index.ts
    ├── crypto/                # Implementações de criptografia
    │   ├── jwt-token-generator.ts # JWT token generation
    │   └── index.ts
    ├── db/                    # Database & ORM
    │   └── typeorm/           # TypeORM implementations
    │       ├── entities/      # Entidades do banco
    │       │   ├── user.ts    # User entity
    │       │   └── index.ts
    │       ├── helpers/       # Helpers do banco
    │       │   └── database.ts # Setup banco em memória
    │       └── repositories/  # Anti Corruption Layer
    │           ├── user-account.ts # Repository implementation
    │           └── index.ts
    └── http/                  # Implementações HTTP
        ├── axios-http-client.ts # Axios implementation
        └── index.ts

tests/                         # TESTES (42 TESTES)
├── application/               # Testes da Application Layer
│   └── controllers/
│       └── facebook-login.spec.ts # 11 testes
├── data/                      # Testes da Data Layer
│   └── services/
│       └── facebook-authentication.spec.ts # 11 testes
├── domain/                    # Testes do Domain
│   └── entities/
│       ├── access-token.spec.ts # 4 testes
│       └── facebook-account.spec.ts # 3 testes
├── infra/                     # Testes da Infrastructure
│   ├── apis/
│   │   └── facebook.spec.ts   # 4 testes
│   ├── crypto/
│   │   └── jwt-token-generator.spec.ts # 1 teste
│   ├── db/typeorm/
│   │   └── user-account-repository.spec.ts # 4 testes
│   └── http/
│       └── axios-http-client.spec.ts # 2 testes
└── index.spec.ts              # 2 testes
```

## ⚙️ Configurações

### TypeScript (tsconfig.json)
- **Target**: ES2020
- **Module**: CommonJS  
- **Strict Mode**: 100% ativado
- **exactOptionalPropertyTypes**: true
- **noUncheckedIndexedAccess**: true

### Jest (jest.config.js)
- **Preset**: ts-jest
- **Test Environment**: Node
- **Coverage**: 94.82% total
- **42 testes** executando

## 🎯 Funcionalidades Implementadas

### ✅ 1. **Anti Corruption Layer - TypeORM Repository**
```typescript
// Repository com TypeORM isolando detalhes do banco
export class UserAccountRepository implements LoadUserAccount, SaveFacebookAccount {
  // Implementação com create/update automático
  // Testes com banco SQLite em memória
}
```

### ✅ 2. **Application Layer - Controllers com Template Method**
```typescript
// Controller base usando Template Method Pattern
export abstract class Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    // Template method com validação automática
    // Error handling centralizado
  }
}
```

### ✅ 3. **Erros Customizados e Helpers Genéricos**
```typescript
// Erros específicos do domínio
export class AuthenticationError extends Error
export class ValidationError extends Error

// Helpers HTTP tipados
export const ok = <T>(data: T): HttpResponse<T>
export const badRequest = (error: Error): HttpResponse<Error>
```

### ✅ 4. **Sistema de Validação com Composite Pattern**
```typescript
// Validadores compostos
export class ValidationComposite implements Validator {
  // Executa múltiplos validadores
}

export class RequiredStringValidator implements Validator {
  // Validação específica para strings obrigatórias
}
```

### ✅ 5. **Fluent Builder Pattern para Validação**
```typescript
// Construção fluente de validadores
ValidationBuilder
  .of('token', httpRequest.body?.token ?? '')
  .required()
  .build()
```

### ✅ 6. **FacebookLogin Controller Completo**
```typescript
// Controller específico com validação integrada
export class FacebookLoginController extends Controller {
  // Implementa perform() e buildValidators()
  // Retorna JWT token ou erro de autenticação
}
```

## 📊 Cobertura de Testes (94.82%)

### Por Camada:
- **Application Layer**: 100% (Controllers, Validation, Errors)
- **Domain Layer**: 100% (Entities, Use Cases)
- **Data Layer**: 100% (Services, Contracts)
- **Infrastructure**: 95%+ (APIs, Database, HTTP, Crypto)

### Tipos de Teste:
- **Unit Tests**: 42 testes isolados
- **Integration Tests**: Repository com banco em memória
- **Error Handling**: Cenários de exceção cobertos
- **Validation Tests**: Casos válidos e inválidos

## 🔧 Design Patterns Aplicados

### 1. **Clean Architecture**
- Separação clara de responsabilidades
- Dependency Rule: dependências apontam para dentro
- Camadas bem definidas e isoladas

### 2. **Template Method Pattern**
```typescript
// Controller base define o algoritmo
abstract class Controller {
  async handle() {
    validate() // Passo 1
    perform()  // Passo 2 (implementado pelas subclasses)
    handleErrors() // Passo 3
  }
}
```

### 3. **Composite Pattern**
```typescript
// Composição de validadores
class ValidationComposite {
  constructor(validators: Validator[]) // Compõe múltiplos validadores
}
```

### 4. **Fluent Builder Pattern**
```typescript
// Construção fluente e legível
ValidationBuilder.of('field', value).required().email().build()
```

### 5. **Anti Corruption Layer**
```typescript
// Repositório isola implementação do TypeORM
class UserAccountRepository {
  // Traduz entre domínio e infraestrutura
  // Protege o domínio de mudanças externas
}
```

### 6. **Repository Pattern**
```typescript
// Abstração para acesso a dados
interface LoadUserAccount {
  load(params: Params): Promise<Result>
}
```

### 7. **Dependency Injection**
```typescript
// Inversão de dependências via construtor
constructor(
  private readonly facebookAuth: FacebookAuthentication,
  private readonly userRepo: UserAccountRepository
) {}
```

## 🚀 Como Executar

### 1. **Setup Inicial**
```bash
git clone <repository>
cd nodejs-tdd-cleanarch
npm install
```

### 2. **Comandos Disponíveis**
```bash
# Desenvolvimento
npm run dev              # Execução com ts-node
npm run build           # Build do TypeScript
npm start               # Execução do build

# Testes
npm test                # Execução dos 42 testes
npm run test:watch      # Testes em modo watch
npm run test:coverage   # Cobertura de testes (94.82%)

# Qualidade de Código
npm run lint            # Verificação de lint
npm run lint:fix        # Correção automática
```

### 3. **Configuração do Banco de Dados**
```bash
# Para desenvolvimento (MySQL)
DATABASE_URL=mysql://user:pass@localhost:3306/facebook_auth

# Para testes (SQLite em memória automático)
# Nenhuma configuração necessária
```

## 🎯 Benefícios da Arquitetura

### ✅ **Testabilidade**
- 42 testes com 94.82% de cobertura
- Testes isolados e rápidos
- Mocks facilitados pela arquitetura

### ✅ **Maintibilidade** 
- Código limpo e bem organizado
- Responsabilidades bem definidas
- Fácil adição de novas funcionalidades

### ✅ **Flexibilidade**
- Troca fácil de implementações
- Banco de dados intercambiável
- APIs externas isoladas

### ✅ **Escalabilidade**
- Arquitetura preparada para crescimento
- Patterns que facilitam extensões
- Separação clara de concerns

### ✅ **Robustez**
- Error handling centralizado
- Validações consistentes
- Logs e monitoramento preparados

## 🔄 Próximos Passos

- [ ] **GraphQL API** - Implementar resolvers
- [ ] **Docker** - Containerização
- [ ] **CI/CD Pipeline** - Automação
- [ ] **Monitoring** - Logs e métricas
- [ ] **Rate Limiting** - Proteção de APIs
- [ ] **Caching** - Redis integration
- [ ] **Documentation** - Swagger/OpenAPI
- [ ] **Multi-tenant** - Suporte a múltiplos tenants

---

## 🏆 Conclusão

Este projeto representa um **exemplo completo e profissional** de como implementar um sistema robusto usando:

- **Clean Architecture** com todas as camadas
- **TDD** com cobertura de 94.82%
- **Design Patterns** modernos e eficazes
- **TypeScript** com strict mode
- **Anti Corruption Layer** com TypeORM
- **Application Layer** com controllers robustos
- **Sistema de validação** avançado
- **Error handling** centralizado

É um template perfeito para projetos empresariais que precisam de **qualidade**, **manutenibilidade** e **escalabilidade**.

---
**Desenvolvido com ❤️ usando Clean Architecture, TDD e as melhores práticas de software**