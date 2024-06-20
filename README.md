# VUTTR (Very Useful Tools to Remember) API 🛠

Esta é a API para a aplicação VUTTR, um simples repositório para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags. A API foi construída utilizando NestJS, PrismaORM, JWT para verificação e autenticação, Swagger para documentação, Docker para containerização da API e do banco de dados PostgreSQL.

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de aplicações Node.js escaláveis.
- **PrismaORM**: ORM para interação com o banco de dados.
- **JWT (JSON Web Tokens)**: Para autenticação e autorização.
- **Swagger**: Para documentação da API.
- **Docker**: Para containerização da API e do PostgreSQL.

## Funcionalidades

A API oferece as seguintes funcionalidades:

1. **Listar todas as ferramentas**: `GET /tools`
2. **Filtrar ferramentas por tag**: `GET /tools?tag=node`
3. **Cadastrar uma nova ferramenta**: `POST /tools`
4. **Remover uma ferramenta por ID**: `DELETE /tools/:id`
5. **Cadastrar novo usuário**: `POST: /users`
6. **Listar usuários cadastrados**: `GET: /users`
7. **Atualizar usuário**: `PUT: /users`
8. **Obter único usuário**: `GET: /users/:id`

## Gestão de ferramentas 🛠

### 1: Listar todas as ferramentas cadastradas

**Endpoint:** `GET /tools`

**Resposta:**

```json
[
    {
        "id": 1,
        "title": "Notion",
        "link": "https://notion.so",
        "description": "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.",
        "tags": ["organization", "planning", "collaboration", "writing", "calendar"]
    },
    {
        "id": 2,
        "title": "json-server",
        "link": "https://github.com/typicode/json-server",
        "description": "Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.",
        "tags": ["api", "json", "schema", "node", "github", "rest"]
    },
    {
        "id": 3,
        "title": "fastify",
        "link": "https://www.fastify.io/",
        "description": "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.",
        "tags": ["web", "framework", "node", "http2", "https", "localhost"]
    }
]
```






### 2: Filtrar ferramentas utilizando uma busca por tag
**Endpoint:** `GET /tools?tag=node`

Resposta:

```json 
[
    {
        "id": 2,
        "title": "json-server",
        "link": "https://github.com/typicode/json-server",
        "description": "Fake REST API based on a json schema. Useful for mocking e criando APIs para front-end devs to consume in coding challenges.",
        "tags": ["api", "json", "schema", "node", "github", "rest"]
    },
    {
        "id": 3,
        "title": "fastify",
        "link": "https://www.fastify.io/",
        "description": "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.",
        "tags": ["web", "framework", "node", "http2", "https", "localhost"]
    }
]
```

### 3: Cadastrar uma nova ferramenta
**Endpoint:** `POST /tools`

`Cabeçalho: Content-Type: application/json`

Corpo da Requisição:

```json
{
    "title": "hotel",
    "link": "https://github.com/typicode/hotel",
    "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
    "tags": ["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
}
```
### Resposta:

```json
{
    "id": 5,
    "title": "hotel",
    "link": "https://github.com/typicode/hotel",
    "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
    "tags": ["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
}
```

### 4: Remover uma ferramenta por ID
**Endpoint:** `DELETE /tools/:id`

#### Resposta:

```json
{}
```


## Gestão de usuários 👪
#### Endpoints:

### 5: Criar Usuário
**Endpoint**: `POST /users`

**Cabeçalho:**  `Content-Type: application/json`

**Corpo da Requisição:**

```json
{
    "name": "ViniHGV",
    "email": "vinihgv@gmail.com",
    "password": "password12"
}
```

#### Resposta:

```json
{
    "id": "generated_user_id",
    "name": "ViniHGV",
    "email": "vinihgv@gmail.com",
    "password": "password12"
}
```


### 6: Autenticar Usuário
**Endpoint:** `POST /users/auth`

**Cabeçalho:** `Content-Type: application/json`

**Corpo da Requisição:**

```json
{
    "email": "vinihgv@gmail.com",
    "password": "password12"
}
```

#### Resposta:

```json
{
    "access_token": "jwt_token"
}
```

### 7: Listar Usuários
**Endpoint:**  `GET /users`

#### Resposta:

```json
[
    {
        "id": "generated_user_id",
        "name": "ViniHGV",
        "email": "vinihgv@gmail.com"
    }
]
```

### 8: Buscar Usuário por ID
**Endpoint:** `GET /users/:id`

**Parâmetro:** `ID do usuário a ser buscado (string) no formato UUID`

#### Resposta:

```json
{
    "id": "generated_user_id",
    "name": "ViniHGV",
    "email": "vinihgv@gmail.com"
}
```

### 9: Atualizar Usuário por ID
**Endpoint:**  `PUT /users/:id`

**Parâmetro:** `ID do usuário a ser buscado (string) no formato UUID`

**Cabeçalho:** `Content-Type: application/json`

#### Corpo da Requisição:

```json
{
    "name": "ViniHGV",
    "email": "vinihgv@gmail.com",
    "password": "password12"
}
```

#### Resposta:

```json
{
    "id": "generated_user_id",
    "name": "ViniHGV",
    "email": "vinihgv@gmail.com",
    "password": "password12"
}
```

### 10: Remover Usuário por ID
**Endpoint:** `DELETE /users/:id`

**Parâmetro:** `ID do usuário a ser buscado (string) no formato UUID`

#### Resposta:
```json
{}
```


### Documentação da API 📄
- **A documentação da API foi gerada utilizando o Swagger e pode ser acessada através da rota**  `/api`

Executando o Projeto
- Pré-requisitos
- Docker instalado.
- Node instalado
- Clone o repositório:

```bash
git clone https://github.com/ViniHGV/BossaChallenge.git
cd BossaChallenge
```

Instalação de dependências: 
```bash
npm install @nestjs/cli
npm install
```

Suba os containers Docker:
```bash
docker-compose up -d --build
```

Desenvolvido por [ViniHGV](https://github.com/ViniHGV)
