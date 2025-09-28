# Facebook Login API - Clean Architecture + TDD + Express

Uma API REST completa para autenticação com Facebook, desenvolvida usando **Clean Architecture**, **TDD**, **TypeScript**, **Node.js**, **Express** e **Swagger**.

## 🏗️ Arquitetura Completa Implementada

```
┌─────────────────────────────────────────────────────────────┐
│                      MAIN LAYER                             │
│  Express API | Swagger | Factories | Composition Root      │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                  APPLICATION LAYER                          │
│  Controllers (Template Method) | Validation (Composite)     │
│  Error Handling | HTTP Helpers | Fluent Builder            │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                     DOMAIN LAYER                            │
│   Use Cases (Interfaces) | Entities (Business Rules)       │
│  AccessToken | FacebookAccount | FacebookAuthentication     │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                             │
│     Services | Contracts (Repositories, APIs, Crypto)      │
│            FacebookAuthenticationService                    │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                 INFRASTRUCTURE LAYER                        │
│  APIs | HTTP | Database (TypeORM) | JWT | Anti Corruption  │
│      Facebook Graph API | MySQL/SQLite | Axios             │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Funcionalidades Completas

### ✅ **API REST com Express**
- Servidor Express configurado
- Middleware de CORS, JSON parser
- Rotas organizadas com Factory Pattern
- Adapter Pattern para integração Express

### ✅ **Documentação Swagger/OpenAPI 3.0**
- Interface interativa em `/api-docs`
- Especificação completa da API
- Schemas de request/response
- Especificação JSON em `/swagger.json`

### ✅ **Sistema de Autenticação Facebook**
- Login com Facebook token
- Geração de JWT tokens
- Validação e tratamento de erros
- Integração com Facebook Graph API

### ✅ **Testes Completos (47 testes)**
- Testes unitários para todas as camadas
- Testes de integração da API
- Cobertura de 95%+ de código
- Testes com supertest para endpoints

## 🚀 Quick Start

### 1. **Instalação**
```bash
git clone <repository-url>
cd nodejs-tdd-cleanarch
npm install
```

### 2. **Configuração**
Crie um arquivo `.env`:
```env
PORT=3000
JWT_SECRET=your-jwt-secret
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=your-password
DB_NAME=facebook_login
```

### 3. **Executar**
```bash
# Desenvolvimento
npm run dev

# Testes
npm test

# Produção
npm run build && npm start
```

### 4. **Acessar**
- **API**: http://localhost:3000/api
- **Swagger UI**: http://localhost:3000/api-docs
- **Swagger JSON**: http://localhost:3000/swagger.json

## 📖 API Documentation

### 🔐 POST /api/auth/facebook
Autentica usuário com token do Facebook

**Request:**
```json
{
  "token": "facebook_access_token"
}
```

**Response 200 - Sucesso:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response 400 - Token obrigatório:**
```json
{
  "error": "token is required"
}
```

**Response 500 - Erro interno:**
```json
{
  "error": "Server failed. Try again soon"
}
```

## 🧪 Testes (47 testes passando)

### **Cobertura por Camada:**
- ✅ **Main Layer**: 100% - Testes de integração da API
- ✅ **Application Layer**: 100% - Controllers e validação
- ✅ **Domain Layer**: 100% - Entidades e casos de uso
- ✅ **Data Layer**: 100% - Services e contratos
- ✅ **Infrastructure Layer**: 95% - APIs, banco, HTTP, crypto

### **Comandos de Teste:**
```bash
npm test                              # Todos os testes
npm run test:watch                    # Modo watch
npm run test:coverage                 # Com cobertura
npm test -- --testPathPatterns=tests/main  # Só integração
```

## 🎯 Design Patterns Implementados

### **1. Clean Architecture**
- 5 camadas bem definidas
- Dependency Rule respeitada
- Separação clara de responsabilidades

### **2. Factory Pattern**
```typescript
// Criação de controladores com dependências
export const makeFacebookLoginController = (): FacebookLoginController => {
  return new FacebookLoginController(makeFacebookAuthentication())
}
```

### **3. Adapter Pattern**
```typescript
// Adaptação do Express para Clean Architecture
export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = { body: req.body }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
```

### **4. Template Method Pattern**
```typescript
// Controller base com template definido
export abstract class Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    // Template method implementation
  }
}
```

### **5. Composite Pattern**
```typescript
// Sistema de validação composto
export class ValidationComposite implements Validator {
  constructor(private readonly validators: Validator[]) {}
}
```

## 🛠️ Estrutura Completa do Projeto

```
src/
├── main/                       # 🎯 COMPOSITION ROOT
│   ├── adapters/              # Adapters para Express
│   │   └── express-route-adapter.ts
│   ├── config/                # Configurações da aplicação
│   │   ├── app.ts            # Express app setup
│   │   ├── env.ts            # Variáveis de ambiente
│   │   ├── middlewares.ts    # CORS, JSON parser
│   │   ├── routes.ts         # Setup de rotas
│   │   └── swagger.ts        # Swagger configuration
│   ├── docs/                  # 📚 SWAGGER DOCUMENTATION
│   │   ├── components.ts     # Schemas OpenAPI
│   │   ├── index.ts          # Swagger spec principal
│   │   └── paths.ts          # Endpoints documentation
│   ├── factories/             # 🏭 DEPENDENCY INJECTION
│   │   ├── apis/             # Facebook API factory
│   │   ├── controllers/      # Controller factories
│   │   ├── crypto/           # JWT factory
│   │   ├── db/               # DataSource factory
│   │   ├── http/             # HTTP client factory
│   │   ├── repositories/     # Repository factories
│   │   ├── use-cases/        # Use case factories
│   │   ├── validation/       # Validation factories
│   │   └── index.ts
│   ├── routes/               # 🛣️ EXPRESS ROUTES
│   │   └── login.ts         # Facebook login route
│   └── server.ts            # 🚀 HTTP Server
├── application/               # 📱 APPLICATION LAYER
├── domain/                    # 🏛️ DOMAIN LAYER  
├── data/                      # 📊 DATA LAYER
└── infra/                     # 🔧 INFRASTRUCTURE LAYER

tests/
└── main/                      # 🧪 API INTEGRATION TESTS
    └── routes/
        └── login.spec.ts     # 5 testes de integração
```

## 📦 Scripts NPM

```bash
# 🚀 Servidor
npm run build                 # Compilar TypeScript
npm start                     # Produção
npm run start:dev             # Desenvolvimento (ts-node)
npm run dev                   # Desenvolvimento com nodemon

# 🧪 Testes
npm test                      # Todos os testes (47)
npm run test:watch            # Modo watch
npm run test:coverage         # Cobertura de código
npm run test:integration      # Só testes de integração

# 🔍 Qualidade
npm run lint                  # Verificar código
npm run lint:fix              # Corrigir automaticamente
```

## 🛠️ Stack Tecnológica

### **Backend Core**
- **Node.js 18+** - Runtime JavaScript
- **TypeScript 5.9** - Linguagem tipada
- **Express 5.1** - Framework web
- **CORS** - Cross-origin requests

### **Documentação API**
- **Swagger UI Express** - Interface interativa
- **OpenAPI 3.0** - Especificação da API

### **Database & ORM**
- **TypeORM** - ORM TypeScript/JavaScript
- **MySQL** - Banco de dados produção
- **SQLite** - Banco de dados testes

### **Authentication & Security**
- **JWT (jsonwebtoken)** - Tokens de acesso
- **Facebook Graph API** - Integração social

### **HTTP & External APIs**
- **Axios** - Cliente HTTP
- **Supertest** - Testes de API

### **Testing & Quality**
- **Jest** - Framework de testes
- **ESLint** - Linting e formatação
- **Husky** - Git hooks
- **Lint-staged** - Lint em staged files

### **Development Tools**
- **ts-node** - Execução TypeScript
- **tsconfig-paths** - Path mapping
- **nodemon** - Hot reload
- **module-alias** - Runtime aliases

## 🔒 Segurança Implementada

- **Validação rigorosa** de entrada
- **Sanitização** de dados
- **CORS** configurado
- **Error handling** seguro
- **JWT tokens** com expiração
- **Variáveis de ambiente** para secrets

## 🎯 Princípios SOLID

- ✅ **SRP** - Cada classe tem uma responsabilidade
- ✅ **OCP** - Aberto para extensão, fechado para modificação
- ✅ **LSP** - Substituição de Liskov respeitada
- ✅ **ISP** - Interfaces segregadas
- ✅ **DIP** - Dependência de abstrações, não implementações

## 🚀 Benefícios da Arquitetura

### **📈 Escalabilidade**
- Adição fácil de novos endpoints
- Extensão simples de funcionalidades
- Microserviços-ready

### **🔧 Manutenibilidade**
- Código limpo e organizado
- Responsabilidades bem definidas
- Testes abrangentes

### **🧪 Testabilidade**
- 47 testes com 95%+ cobertura
- Mocks facilitados pela arquitetura
- Testes de integração e unitários

### **🔄 Flexibilidade**
- Troca fácil de implementações
- Banco de dados intercambiável
- APIs externas isoladas

## 🔮 Roadmap

- [ ] **GraphQL** - API GraphQL alternativa
- [ ] **Rate Limiting** - Proteção contra abuso
- [ ] **Caching** - Redis para performance
- [ ] **Monitoring** - Logs estruturados
- [ ] **Docker** - Containerização
- [ ] **CI/CD** - Pipeline automatizado
- [ ] **Health Checks** - Monitoramento de saúde

---

## 💡 Como Contribuir

1. **Fork** o repositório
2. **Clone** seu fork
3. **Branch** para feature (`git checkout -b feature/nova-feature`)
4. **Commit** suas mudanças (`git commit -m 'Add: nova feature'`)
5. **Push** para branch (`git push origin feature/nova-feature`)
6. **Pull Request** com descrição detalhada

### **Diretrizes:**
- Mantenha cobertura de testes > 90%
- Siga os princípios da Clean Architecture
- Use TDD (escreva testes primeiro)
- Commits semânticos (feat/fix/docs/refactor)

---

## 📞 Suporte

- 📧 **Email**: support@facebook-login-api.com  
- 🐛 **Issues**: GitHub Issues
- 📖 **Docs**: http://localhost:3000/api-docs
- 💬 **Discussions**: GitHub Discussions

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja [LICENSE](LICENSE) para detalhes.

---

⭐ **Se este projeto foi útil, considere dar uma estrela no GitHub!**

**🎯 Desenvolvido com Clean Architecture, TDD e as melhores práticas de engenharia de software.**