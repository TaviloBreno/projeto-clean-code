# Node.js TDD Clean Architecture

Este projeto demonstra um setup completo de Node.js com TypeScript seguindo as melhores práticas de TDD (Test Driven Development) e Clean Architecture.

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Jest** - Framework de testes
- **ESLint** - Linter para código JavaScript/TypeScript
- **Husky** - Git hooks
- **Lint-staged** - Executa linters em arquivos staged

## 📁 Estrutura do Projeto

```
├── src/                 # Código fonte
├── tests/               # Testes unitários
├── dist/                # Código compilado (gerado)
├── coverage/            # Relatórios de cobertura (gerado)
├── .husky/              # Git hooks
├── tsconfig.json        # Configuração TypeScript
├── jest.config.js       # Configuração Jest
├── .eslintrc.json       # Configuração ESLint
└── package.json         # Dependências e scripts
```

## ⚙️ Configurações TypeScript

- **Target**: ES2020
- **Module**: CommonJS
- **Strict Mode**: Habilitado
- **Source Maps**: Habilitados
- **Declaration Files**: Gerados

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

## 🔧 Git Hooks

O projeto utiliza **Husky** e **Lint-staged** para:

- **Pre-commit**: Executa lint automático nos arquivos staged
- Garante que apenas código formatado seja commitado

## 🚀 Como usar

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute os testes: `npm test`
4. Inicie o desenvolvimento: `npm run dev`

## 📋 Padrões de Código

- **ESLint** configurado com Standard TypeScript
- **Strict mode** habilitado no TypeScript
- **100% de cobertura de testes** como objetivo
- **TDD** como metodologia de desenvolvimento