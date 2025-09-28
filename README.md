# 🚀 Node.js TDD Clean Architecture - Sistema Completo com Autenticação Facebook e Gerenciamento de Fotos

[![Tests](https://img.shields.io/badge/tests-81%20passed-brightgreen)](https://github.com/TaviloBreno/projeto-clean-code)
[![Test Suites](https://img.shields.io/badge/test%20suites-19%20passed-brightgreen)](https://github.com/TaviloBreno/projeto-clean-code)
[![Architecture](https://img.shields.io/badge/architecture-Clean%20Architecture-blue)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
[![TDD](https://img.shields.io/badge/methodology-TDD-red)](https://en.wikipedia.org/wiki/Test-driven_development)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)](https://www.typescriptlang.org/)
[![Database](https://img.shields.io/badge/database-Advanced%20Transaction%20Management-orange)](https://typeorm.io/)

Este projeto demonstra um **sistema completo de autenticação com Facebook, gerenciamento de fotos de perfil e sistema avançado de transações de banco de dados** implementado com Clean Architecture, TDD (Test-Driven Development), e todos os Design Patterns modernos para um sistema robusto, escalável e mantível.

## 🏗️ Arquitetura Clean Architecture (5 Camadas) + Advanced Database Layer

```
┌─────────────────────────────────────────────────────────────┐
│                     MAIN LAYER                              │
├─────────────────────────────────────────────────────────────┤
│  Routes | Factories | Adapters | Server Configuration      │
│      Express Integration | Dependency Injection             │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                  APPLICATION LAYER                          │
├─────────────────────────────────────────────────────────────┤
│  Controllers (Template Method) | Middlewares | Validation   │
│    Error Handling | HTTP Helpers | Fluent Builder          │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                     DOMAIN LAYER                            │
├─────────────────────────────────────────────────────────────┤
│     Use Cases (Interfaces) | Entities (Business Rules)     │
│  AccessToken | FacebookAccount | UserProfile | FileStorage  │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                             │
├─────────────────────────────────────────────────────────────┤
│  Services | Contracts (Repositories, APIs, Crypto)         │
│ FacebookAuthService | ChangeProfilePictureService          │
│       UserService (Transaction Management)                  │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│              INFRASTRUCTURE LAYER                           │
├─────────────────────────────────────────────────────────────┤
│     APIs | HTTP Clients | Advanced Database Layer          │
│ TypeORM + Singleton Managers + Decorator Transactions      │
│  ConnectionManager | TransactionManager | BaseRepository    │
│   UUID Generator | File Storage | AWS S3 Integration       │
└─────────────────────────────────────────────────────────────┘
```

## 🗄️ Sistema Avançado de Gerenciamento de Banco de Dados

### 🔧 Configuração Dinâmica de DataSource
- **Configuração baseada em ambiente**: Suporte automático para SQLite (testes) e PostgreSQL (produção)
- **Ormconfig dinâmico**: Configuração automática baseada em `NODE_ENV`
- **Type safety completo**: Integração perfeita com TypeScript

### 🏗️ Padrão Singleton para Gerenciamento de Conexão
- **ConnectionManager**: Singleton para gerenciar o ciclo de vida das conexões
- **TransactionManager**: Singleton para gerenciar transações com suporte a aninhamento
- **Thread-safe**: Operações seguras em ambientes concurrent

### 🎯 Padrão Decorator para Transações
```typescript
@DbTransaction
async createUser(userData: UserData): Promise<User> {
  // Método automaticamente executado em transação
  // Suporte a rollback automático em caso de erro
  // Suporte a transações aninhadas
}
```

### 📦 BaseRepository Pattern
- **Abstração unificada**: Todos os repositórios estendem BaseRepository
- **Type safety**: Generics para garantir tipos corretos
- **Transaction awareness**: Integração automática com o sistema de transações

## 🛠️ Stack Tecnológica Completa

### **Core Technologies**
- **Node.js** - Runtime JavaScript/TypeScript
- **TypeScript** - Linguagem com tipagem estática
- **Express.js** - Framework web minimalista
- **Jest** - Framework de testes (81 testes em 19 suítes)
- **ESLint** - Linting e formatação de código

### **Database & ORM**
- **TypeORM** - ORM para TypeScript/JavaScript
- **PostgreSQL** - Banco de dados principal (produção)
- **SQLite** - Banco em memória para testes

### **External APIs & Cloud Services**
- **Facebook Graph API** - Integração completa com Facebook
- **AWS S3** - Armazenamento de arquivos na nuvem
- **JWT** - Autenticação baseada em tokens
- **Multer** - Upload de arquivos multipart/form-data

### **Architecture & Design Patterns**
- **Clean Architecture** - Separação em 5 camadas bem definidas
- **TDD (Test-Driven Development)** - 81 testes cobrindo todo o sistema
- **Template Method Pattern** - Controllers base abstratos
- **Composite Pattern** - Sistema avançado de validação
- **Fluent Builder Pattern** - Construção intuitiva de validadores
- **Factory Pattern** - Criação de dependências
- **Adapter Pattern** - Integração Express.js
- **Repository Pattern** - Abstração de persistência
- **Anti Corruption Layer** - Isolamento de APIs externas

## 📁 Estrutura Completa do Projeto (89+ arquivos)

```
src/
├── main/                           # MAIN LAYER
│   ├── adapters/                  # Adapters para Express
│   │   ├── express-middleware.ts  # Adapter para middlewares
│   │   ├── express-router.ts      # Adapter para rotas
│   │   └── express-route-adapter.ts # Adapter principal
│   ├── config/                    # Configurações
│   │   ├── app.ts                # App Express configurado
│   │   ├── env.ts                # Variáveis de ambiente
│   │   ├── middleware.ts         # Middlewares globais
│   │   └── routes.ts             # Setup automático de rotas
│   ├── factories/                 # Factory Pattern
│   │   ├── controllers/          # Factories de controllers
│   │   │   ├── delete-picture.ts
│   │   │   ├── facebook-login-controller-factory.ts
│   │   │   └── save-picture.ts
│   │   ├── crypto/               # Factories de criptografia
│   │   │   └── uuid-generator.ts
│   │   ├── infra/                # Factories de infraestrutura
│   │   │   └── aws-s3-file-storage.ts
│   │   ├── middlewares/          # Factories de middlewares
│   │   │   └── auth.ts
│   │   ├── repos/                # Factories de repositórios
│   │   │   ├── pg-user-profile.ts
│   │   │   └── user-profile.ts
│   │   └── use-cases/            # Factories de casos de uso
│   │       ├── change-profile-picture.ts
│   │       └── facebook-authentication-factory.ts
│   ├── routes/                    # Definição de rotas
│   │   ├── login.ts              # POST /api/auth/facebook
│   │   └── user.ts               # PUT/DELETE /api/users/picture
│   └── server.ts                  # Servidor HTTP
│
├── application/                   # APPLICATION LAYER
│   ├── controllers/              # Controllers com Template Method
│   │   ├── controller.ts         # Controller base abstrato
│   │   ├── delete-picture.ts     # Controller para deletar fotos
│   │   ├── facebook-login.ts     # Controller login Facebook
│   │   └── save-picture.ts       # Controller para salvar fotos
│   ├── errors/                   # Erros customizados da aplicação
│   │   └── http.ts              # AuthenticationError, etc.
│   ├── helpers/                  # Helpers HTTP
│   │   └── http.ts              # HttpRequest, HttpResponse, etc.
│   ├── middlewares/              # Middlewares da aplicação
│   │   └── auth.ts              # Middleware de autenticação JWT
│   └── validation/               # Sistema avançado de validação
│       ├── allowed-mime-types.ts # Validador de tipos de arquivo
│       ├── builder.ts           # Fluent Builder para validação
│       ├── max-file-size.ts     # Validador de tamanho de arquivo
│       ├── required-buffer.ts   # Validador de buffer obrigatório
│       ├── validator.ts         # Interface base de validação
│       └── validation-builder.ts # Builder com método fluente
│
├── domain/                       # DOMAIN LAYER
│   ├── entities/                # Entidades de negócio
│   │   ├── access-token.ts      # Token com expiração automática
│   │   ├── facebook-account.ts  # Conta Facebook com regras
│   │   └── user-profile.ts      # Perfil do usuário
│   └── use-cases/               # Contratos dos casos de uso
│       ├── change-profile-picture.ts # Interface para fotos
│       └── facebook-authentication.ts # Interface auth Facebook
│
├── data/                        # DATA LAYER
│   ├── contracts/               # Contratos/Interfaces
│   │   ├── apis/               # Contratos de APIs externas
│   │   │   └── facebook.ts     # LoadFacebookUser
│   │   ├── crypto/             # Contratos de criptografia
│   │   │   ├── token.ts        # TokenGenerator
│   │   │   └── uuid-generator.ts # UuidGenerator
│   │   ├── file-storage/       # Contratos de armazenamento
│   │   │   └── upload-file.ts  # FileStorage interface
│   │   ├── http/               # Contratos HTTP
│   │   │   └── http-get-client.ts
│   │   └── repos/              # Contratos de repositórios
│   │       ├── user-account.ts # LoadUserAccount, SaveFacebookAccount
│   │       └── user-profile.ts # LoadUserProfile, SaveUserPicture
│   └── services/               # Implementações dos casos de uso
│       ├── change-profile-picture.ts # Service de fotos
│       └── facebook-authentication.ts # Service auth Facebook
│
└── infra/                       # INFRASTRUCTURE LAYER
    ├── apis/                    # Implementações de APIs externas
    │   ├── aws-s3-file-storage.ts # AWS S3 integration completa
    │   └── facebook.ts          # Facebook Graph API
    ├── crypto/                  # Implementações de criptografia
    │   ├── jwt-token-generator.ts # Geração JWT
    │   └── uuid-generator.ts    # UUID v4 sem libs externas
    ├── db/                      # Database & ORM
    │   └── typeorm/            # TypeORM implementations
    │       ├── entities/       # Entidades do banco
    │       │   └── user.ts     # User entity com decorators
    │       ├── helpers/        # Helpers do banco
    │       │   └── database.ts # Setup banco em memória
    │       └── repositories/   # Anti Corruption Layer
    │           └── user-account.ts # Repository implementation
    ├── http/                   # Implementações HTTP
    │   └── axios-http-client.ts # Axios implementation
    └── repos/                  # Repositórios específicos
        └── postgres/           # Implementações PostgreSQL
            ├── entities/       # Entidades específicas do Postgres
            │   └── user.ts     # PgUser entity
            └── user-profile-repository.ts # Repository para perfis

tests/                          # TESTES (81 TESTES EM 19 SUÍTES)
├── application/               # Testes da Application Layer
│   ├── controllers/
│   │   ├── delete-picture.spec.ts    # 7 testes
│   │   ├── facebook-login.spec.ts    # 11 testes  
│   │   └── save-picture.spec.ts      # 4 testes
│   ├── middlewares/
│   │   └── auth.spec.ts             # 8 testes
│   └── validation/
│       └── required-buffer.spec.ts  # 2 testes
├── data/                      # Testes da Data Layer
│   └── services/
│       ├── change-profile-picture.spec.ts # 7 testes
│       └── facebook-authentication.spec.ts # 11 testes
├── domain/                    # Testes do Domain Layer
│   └── entities/
│       ├── access-token.spec.ts      # 4 testes
│       ├── facebook-account.spec.ts  # 3 testes
│       └── user-profile.spec.ts      # 2 testes
├── infra/                     # Testes da Infrastructure Layer
│   ├── apis/
│   │   ├── aws-s3-file-storage.spec.ts # 4 testes
│   │   └── facebook.spec.ts          # 4 testes
│   ├── crypto/
│   │   ├── jwt-token-generator.spec.ts # 1 teste
│   │   └── uuid-generator.spec.ts    # 2 testes
│   ├── db/typeorm/
│   │   └── user-account-repository.spec.ts # 4 testes
│   └── http/
│       └── axios-http-client.spec.ts # 2 testes
├── main/                      # Testes de Integração
│   └── routes/
│       ├── login.spec.ts            # 1 teste
│       └── user.spec.ts             # 2 testes
└── index.spec.ts              # 2 testes
```

## 🎯 Funcionalidades Implementadas Completas

### ✅ **1. Autenticação Facebook Completa**
```typescript
POST /api/auth/facebook
{
  "token": "facebook_access_token"
}

// Resposta
{
  "accessToken": "jwt_token_gerado",
  "name": "Nome do Usuário"
}
```

### ✅ **2. Sistema Completo de Gerenciamento de Fotos**
```typescript
// Upload de foto de perfil
PUT /api/users/picture
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
picture: [arquivo.jpg/png/jpeg] // Máx 5MB

// Resposta
{
  "pictureUrl": "https://s3.amazonaws.com/bucket/uuid.jpg",
  "initials": "AB"
}

// Deletar foto de perfil
DELETE /api/users/picture
Authorization: Bearer <jwt_token>

// Resposta
{
  "pictureUrl": undefined,
  "initials": "AB"
}
```

### ✅ **3. Sistema Avançado de Validação com Composite Pattern**
```typescript
// Validação fluente e compositiva
ValidationBuilder
  .of({ value: httpRequest.file, fieldName: 'file' })
  .required()
  .image({ 
    allowed: ['image/png', 'image/jpg', 'image/jpeg'], 
    maxSizeInMb: 5 
  })
  .build()
```

### ✅ **4. Infraestrutura Robusta**

#### **AWS S3 Integration**
```typescript
export class AwsS3FileStorage implements UploadFile, DeleteFile {
  async upload(params: UploadFile.Params): Promise<UploadFile.Result> {
    const uuid = this.uuidGenerator.generate()
    const fileName = `${uuid}.${params.file.mimeType.split('/')[1]}`
    // Upload para S3 com nome único UUID
  }
}
```

#### **UUID Generator (sem bibliotecas externas)**
```typescript
export class UuidGenerator implements UuidGeneratorContract {
  generate(): string {
    // Implementação UUID v4 pura em JavaScript
    // Usando Math.random() e regex para formato correto
  }
}
```

#### **JWT Authentication**
```typescript
export class JwtTokenGenerator implements TokenGenerator {
  async generateToken(params: TokenGenerator.Params): Promise<string> {
    // Geração de JWT com expiração de 30 minutos
    // Payload com userId para identificação
  }
}
```

### ✅ **5. Controllers com Template Method Pattern**
```typescript
export abstract class Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validate(httpRequest)      // 1. Validação
    if (error !== undefined) return badRequest(error)
    
    try {
      return await this.perform(httpRequest)      // 2. Execução
    } catch (error) {
      return serverError(error as Error)          // 3. Error Handling
    }
  }
  
  abstract perform(httpRequest: HttpRequest): Promise<HttpResponse>
  abstract buildValidators(httpRequest: HttpRequest): Validator | undefined
}
```

### ✅ **6. Anti Corruption Layer para TypeORM**
```typescript
export class UserAccountRepository implements LoadUserAccount, SaveFacebookAccount {
  async load(params: LoadUserAccount.Params): Promise<LoadUserAccount.Result> {
    // Conversão automática de entidade externa para domínio
    const pgUser = await this.userRepo.findOne({ where: { email: params.email }})
    return pgUser ? PgUserMapper.toDomain(pgUser) : undefined
  }
}
```

## ⚙️ Configuração e Execução

### **Pré-requisitos**
- Node.js 18+
- PostgreSQL (para produção)
- Conta AWS com S3 configurado
- App Facebook para desenvolvimento

### **Variáveis de Ambiente**
```bash
# .env
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cleanarch
DB_USER=postgres
DB_PASS=senha

# JWT
JWT_SECRET=seu_jwt_secret_super_seguro

# Facebook
FACEBOOK_CLIENT_ID=seu_facebook_app_id
FACEBOOK_CLIENT_SECRET=seu_facebook_app_secret

# AWS S3
AWS_ACCESS_KEY_ID=sua_access_key
AWS_SECRET_ACCESS_KEY=sua_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=seu-bucket-name
```

### **Instalação e Execução**
```bash
# Instalação
npm install

# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Executar produção
npm start

# Testes (81 testes)
npm test

# Testes com watch mode
npm run test:watch

# Testes de integração
npm run test:integration

# Coverage completo
npm run test:coverage

# Linting e formatação
npm run lint
npm run lint:fix
```

## 📊 Estatísticas do Projeto

### **Métricas de Código**
- **89+ arquivos TypeScript** no `src/`
- **20 arquivos de teste** no `tests/`
- **81 testes passando** em 19 suítes
- **100% cobertura** nos controllers principais
- **0 falhas** em todos os testes

### **Arquitetura**
- **5 camadas** bem definidas (Main, Application, Domain, Data, Infrastructure)
- **8+ Design Patterns** implementados
- **12+ contratos/interfaces** para inversão de dependência
- **4 controllers** com Template Method
- **6 validadores** personalizados

### **Funcionalidades**
- **3 endpoints REST** funcionais
- **2 integrações externas** (Facebook + AWS S3)
- **1 middleware** de autenticação JWT
- **Sistema completo** de upload de arquivos
- **Validação robusta** de arquivos (tipo, tamanho, buffer)

## 🚀 Endpoints da API

### **Autenticação**
- `POST /api/auth/facebook` - Login com Facebook

### **Gerenciamento de Perfil**
- `PUT /api/users/picture` - Upload foto de perfil (autenticado)
- `DELETE /api/users/picture` - Remover foto de perfil (autenticado)

## 🧪 Estratégia de Testes

### **Test-Driven Development (TDD)**
- **Unit Tests**: Cada classe testada isoladamente
- **Integration Tests**: Rotas completas com banco em memória
- **Mocks**: APIs externas mockadas (Facebook, AWS S3)
- **Test Doubles**: Repositórios, services e APIs

### **Cobertura de Testes**
- **Controllers**: Template Method e validações
- **Services**: Casos de uso completos
- **Repositories**: Operações de banco
- **Entities**: Regras de negócio
- **APIs**: Integrações externas
- **Routes**: Testes end-to-end

## 🏆 Qualidade e Boas Práticas

### **Clean Code**
- **SOLID Principles** aplicados rigorosamente
- **Dependency Inversion** em todas as camadas
- **Single Responsibility** para cada classe
- **Interface Segregation** com contratos específicos

### **Arquitetura**
- **Dependency Rule** respeitada (dependências apontam para dentro)
- **Separation of Concerns** entre camadas
- **Testabilidade** máxima com dependency injection
- **Extensibilidade** facilitada com interfaces

### **TypeScript**
- **Strict mode** habilitado
- **Path mapping** para imports limpos
- **Type safety** em 100% do código
- **Interface contracts** para todas as dependências

## 📚 Aprendizados e Conceitos Aplicados

Este projeto serve como **referência completa** para:

1. **Clean Architecture** na prática com Node.js
2. **TDD** do início ao fim de um projeto real
3. **Design Patterns** aplicados corretamente
4. **TypeScript avançado** com arquitetura enterprise
5. **Integração de APIs externas** com isolation
6. **Sistema de upload de arquivos** robusto
7. **Autenticação JWT** completa
8. **Validação avançada** com patterns
9. **Testes automatizados** em todos os níveis
10. **Estrutura escalável** para projetos grandes

---

## 👥 Contribuição

Este projeto está aberto para contribuições! Veja as [issues](https://github.com/TaviloBreno/projeto-clean-code/issues) para oportunidades de melhoria.

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

> **"Architecture is about the important stuff. Whatever that is."** - Ralph Johnson

Desenvolvido com ❤️ seguindo os princípios de **Clean Architecture**, **SOLID** e **TDD**.  
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