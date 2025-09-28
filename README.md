# Node.js TDD Clean Architecture - Facebook Login

Este projeto demonstra um setup completo de Node.js com TypeScript seguindo as melhores práticas de TDD (Test Driven Development) e Clean Architecture para implementar autenticação com Facebook.

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Jest** - Framework de testes
- **ESLint** - Linter para código JavaScript/TypeScript
- **Husky** - Git hooks
- **Lint-staged** - Executa linters em arquivos staged
- **jest-mock-extended** - Mocking avançado para testes

## 📁 Estrutura do Projeto (Clean Architecture)

```
├── src/
│   ├── domain/                    # Camada de Domínio
│   │   ├── entities/             # Entidades de negócio
│   │   │   ├── access-token.ts   # Token de acesso com expiração
│   │   │   └── facebook-account.ts # Conta do Facebook
│   │   └── use-cases/            # Casos de uso (interfaces)
│   │       └── facebook-authentication.ts
│   ├── data/                     # Camada de Dados
│   │   ├── services/             # Implementação dos casos de uso
│   │   │   └── facebook-authentication.ts
│   │   └── contracts/            # Contratos (interfaces)
│   │       ├── apis/             # APIs externas
│   │       ├── repos/            # Repositórios
│   │       └── crypto/           # Criptografia
├── tests/                        # Testes organizados por camada
├── coverage/                     # Relatórios de cobertura
└── dist/                         # Código compilado
```

## 🏗️ Implementações Realizadas

### ✅ 1. Domain Layer - Caso de Uso e Interface
- Interface `FacebookAuthentication` no domain layer
- Definição clara de Params e Result usando namespaces
- Desacoplamento total de implementações externas

### ✅ 2. Desacoplando Integração com API de Terceiros
- Interface `LoadFacebookUser` para abstrair API do Facebook
- Contratos bem definidos para entrada e saída
- Flexibilidade para trocar implementação da API

### ✅ 3. Diferentes Formas de Mockar Dependências
- **Jest.Mocked**: Para mocks simples e tipados
- **jest-mock-extended**: Para mocks avançados (MockProxy)
- **Manual Mocks**: Implementação de factories para setup

### ✅ 4. Isolação da Criação do SUT
- Factory pattern para criação de SUT (System Under Test)
- Separação clara entre setup de testes e lógica de negócio
- Reutilização de configurações de mock

### ✅ 5. Repositories com Intersection Types
- `LoadUserAccount & SaveFacebookAccount` usando intersection
- Interfaces bem segregadas seguindo ISP
- Flexibilidade para implementações específicas

### ✅ 6. Remoção de Detalhes de Implementação do Service
- Service focado apenas na orquestração
- Delegação de responsabilidades para contratos
- Clean Code com responsabilidade única

### ✅ 7. Regras de Negócio na Entidade de Domínio
- `FacebookAccount` com lógica de negócio interna
- `AccessToken` com validação de expiração
- Entidades ricas (não anêmicas)

### ✅ 8. Mockando Dependência Criada pela Própria Classe
- Testes isolados para criação de entidades
- Mock de métodos estáticos quando necessário
- Estratégias para testar factories internas

### ✅ 9. Token de Acesso com Expiração
- `AccessToken` com expiração configurável
- Método `isExpired()` para validação
- Padrão Factory Method (`AccessToken.create()`)

### ✅ 10. Service Implementando Feature do Domínio
- `FacebookAuthenticationService` implementa interface do domínio
- Orquestração de dependências externas
- Retorno adequado (AccessToken | undefined)

### ✅ 11. Testes de Casos de Exceção
- Cobertura de cenários de erro
- Testes para quando APIs falham
- Validação de propagação de exceções

## ⚙️ Configurações TypeScript

- **Target**: ES2020
- **Module**: CommonJS
- **Strict Mode**: Totalmente habilitado
- **exactOptionalPropertyTypes**: true
- **noUncheckedIndexedAccess**: true

## 🧪 Cobertura de Testes

- **Domain Entities**: 93.75% de cobertura
- **Data Services**: 100% de cobertura
- **Casos de Uso**: Interface-based (não requer cobertura)
- **Total**: 82.92% de cobertura

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Executa em modo desenvolvimento (ts-node)
npm run build        # Compila o TypeScript
npm start            # Executa o código compilado

# Testes
npm test             # Executa todos os testes
npm run test:watch   # Executa testes em modo watch
npm run test:coverage # Executa testes com cobertura

# Linting
npm run lint         # Verifica código com ESLint
npm run lint:fix     # Corrige problemas automaticamente
```

## 🔧 Padrões Aplicados

### Clean Architecture
- **Domain Layer**: Regras de negócio puras
- **Data Layer**: Implementações e contratos
- **Dependency Rule**: Dependências apontam para dentro

### SOLID Principles
- **SRP**: Cada classe tem uma responsabilidade
- **OCP**: Aberto para extensão, fechado para modificação
- **LSP**: Substituição de implementações
- **ISP**: Interfaces segregadas
- **DIP**: Dependência de abstrações, não concretizações

### TDD (Test Driven Development)
- **Red-Green-Refactor** cycle
- Testes escritos antes da implementação
- Design emergindo dos testes

### Design Patterns
- **Factory Method**: AccessToken.create()
- **Strategy Pattern**: Interfaces para diferentes implementações
- **Dependency Injection**: Constructor injection

## 🚀 Como usar

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute os testes: `npm test`
4. Veja a cobertura: `npm run test:coverage`
5. Inicie o desenvolvimento: `npm run dev`

## 🎯 Próximos Passos

- [ ] Implementar adapters para APIs reais (Facebook Graph API)
- [ ] Adicionar camada de apresentação (controllers)
- [ ] Implementar repositórios com banco de dados
- [ ] Adicionar middleware de autenticação
- [ ] Configurar CI/CD pipeline
- [ ] Documentação da API com Swagger