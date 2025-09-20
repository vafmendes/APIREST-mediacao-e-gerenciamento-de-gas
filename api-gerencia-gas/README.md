# API Gerencia Gás

API para gerenciamento de consumo de gás em condomínios, utilizando Node.js, Express, TypeScript, Prisma e PostgreSQL.

## Pré-requisitos

- Node.js (v18+ recomendado)
- Docker e Docker Compose
- PostgreSQL (pode ser local ou via Docker)

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd api-gerencia-gas
   ```

2. **Configure as variáveis de ambiente:**
   - Edite o arquivo `.env` conforme necessário. Exemplo:
     ```env
     POSTGRES_PASSWORD=password
     POSTGRES_USER=root
     POSTGRES_DB=dbgerenciagas
     DATABASE_URL=postgresql://root:password@localhost:5432/dbgerenciagas
     PGADMIN_DEFAULT_EMAIL=devtest@gmail.com
     PGADMIN_DEFAULT_PASSWORD=admin
     PORT=3000
     ```

3. **Suba o banco de dados e o pgAdmin com Docker Compose:**
   ```bash
   docker-compose up -d
   ```
   - O PostgreSQL estará disponível em `localhost:5432`.
   - O pgAdmin estará disponível em `localhost:8081`.

4. **Instale as dependências do projeto:**
   ```bash
   npm install
   ```

5. **Execute as migrações do banco de dados:**
   ```bash
   npx prisma migrate dev
   ```

6. **Inicie a API em modo desenvolvimento:**
   ```bash
   npm run dev
   ```
   - A API estará disponível em `http://localhost:3000/api`.

## Principais comandos

- `npm run dev` — Inicia a API em modo desenvolvimento (hot reload)
- `npm run build` — Compila o projeto para a pasta `dist`
- `npm start` — Executa a versão compilada
- `npx prisma studio` — Abre o Prisma Studio para visualizar e editar dados

## Estrutura de Pastas

- `src/` — Código-fonte da API
- `prisma/` — Schema e migrações do Prisma
- `.env` — Variáveis de ambiente
- `docker-compose.yml` — Orquestração do banco de dados e pgAdmin

## Testando a API

- Verifique a saúde da API:
  ```bash
  curl http://localhost:3000/api/health
  ```
- Utilize ferramentas como Postman ou Insomnia para testar os endpoints.


## Exemplos de Requisições

> Todos os endpoints abaixo devem ser precedidos de `/api` na URL base, por exemplo: `http://localhost:3000/api`

### Condomínios

**Criar condomínio**
```http
POST /api/condominios
Content-Type: application/json
{
   "nome": "Condomínio Exemplo",
   "cep": "12345678",
   "logradouro": "Rua Exemplo",
   "numero": "100",
   "bairro": "Centro",
   "estado": "SP",
   "uf": "SP"
}
```

**Buscar condomínio por ID**
```http
GET /api/condominios/1
```

### Torres

**Criar torre em um condomínio**
```http
POST /api/condominios/1/torres
Content-Type: application/json
{
   "identificacao": "Torre A"
}
```

**Buscar torre por ID**
```http
GET /api/torres/1
```

### Apartamentos

**Criar apartamento em uma torre**
```http
POST /api/torres/1/apartamentos
Content-Type: application/json
{
   "numero": "101"
}
```

**Buscar apartamento por ID**
```http
GET /api/apartamentos/1
```

### Pessoas

**Adicionar pessoa a um apartamento**
```http
POST /api/apartamentos/1/pessoas
Content-Type: application/json
{
   "nome": "João da Silva",
   "email": "joao@email.com",
   "telefone": "11999999999",
   "tipo": "DONO"
}
```

### Hidrômetros

**Adicionar hidrômetro a um apartamento**
```http
POST /api/apartamentos/1/hidrometros
Content-Type: application/json
{
   "codigo": "HIDRO-001"
}
```

### Leituras

**Registrar leitura em um hidrômetro**
```http
POST /api/hidrometros/1/leituras
Content-Type: application/json
{
   "dataLeitura": "2025-09-19T00:00:00.000Z",
   "valorM3": 10.5,
   "periodicidade": "MENSAL"
}
```

**Listar leituras (com filtros opcionais)**
```http
GET /api/leituras?apartamentoId=1&from=2025-09-01&to=2025-09-30
```

### Consumo

**Consumo por apartamento**
```http
GET /api/consumo/apartamento/1?from=2025-09-01&to=2025-09-30
```

**Consumo por torre**
```http
GET /api/consumo/torre/1?from=2025-09-01&to=2025-09-30
```

**Consumo por condomínio**
```http
GET /api/consumo/condominio/1?from=2025-09-01&to=2025-09-30
```

---

Em caso de dúvidas, consulte o código-fonte ou abra uma issue.
