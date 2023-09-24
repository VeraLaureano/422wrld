# **422WRLD - API**

## **Basic Guide**
- - -
## *Commands*
- Install dependencies
```bash 
npm install
```
- Lint
```bash
npm run lint
```

- Build
```bash
npm run build
```

- Start Commands:
```bash
npm run start
```
```bash
npm run start:prod
```
```bash
npm run start:dev
```

## *Routing API*
- **Home** *(Web Service)*: *https://four22-wrld.onrender.com/* 
- **Home** *(Local Host)*: *http://localhost:800/*
    > METHOD: *POST*
    - **User *signup***: */api/v1/user/signup*
    - **User *login***: */api/v1/user/login*
    > METHOD: *GET*
    - **Artists**: */api/v1/artists*
    - **Find one Artist**: */api/v1/artists/:id*
    - **Albums**: */api/v1/albums*
    - **Find one Album**: */api/v1/albums/:id*
    - **Songs**: */api/v1/songs*
    - **Find one Song**: */api/v1/song/:id*
    - **Api Docs**: */api-docs*

## *Project Structure*
- ./src <br />
    |--> /config <br />
    |--> /controllers <br />
    |--> /docs <br />
    |--> /interfaces <br />
    |--> /middleware <br />
    |--> /models <br />
    |--> /routes <br />
    |--> /services <br />
    |--> /utils <br />
    |--> /app.ts <br />
    |--> /index.ts *(main file)* <br />