# Photobox Challenge

This is a repo that contain api in **NestJS**

## 🪒 Note 

**If you want to run project in local, remember:**

- NodeJS 15.x
- Npm


## 🚀 Start

**Start with docker** 👌

``` bash
docker-compose up
```

*Start dev server*

``` bash
npm run start:dev
```

## 📜 Installation

Install packages with:

``` bash
npm install
```

## 🧪 Tests

To run unit and integration test:

``` bash
npm test
```

To run e2e test:

``` bash
npm test:e2e
```

## ✅ API

#### **POST - CREATE PRODUCT - http://0.0.0.0:5000/prod/products**

Request example:

```json
{
    "name": "Product test",
    "description": "description",
    "price": 200
}
```

#### **GET - GET ADVERTISMENT FROM PRODUCT - http://0.0.0.0:5000/prod/products/:productid/advertisements**

#### **POST - CREATE ADVERTISMENT - http://0.0.0.0:5000/prod/products/:productid/advertisements**

Request example:

```json
{
  "title": "Advertisement",
  "validUntil": "2023-01-02T10:36:48.189Z",
  "discountPercentage": 5.0
}
```

#### **PUT - UPDATE ADVERTISMENT - http://0.0.0.0:5000/prod/products/:productid/advertisements/:id**

#### **GET - GET ADVERTISMENT - http://0.0.0.0:5000/prod/products/:productid/advertisements/:id**

#### **DELETE - DELETE ADVERTISMENT - http://0.0.0.0:5000/prod/products/:productid/advertisements/:id**


## 📚 Consierations

- Sorry for include all in a single commit, I have been working in other repo
- I have used **docker compose** for container api withdatabase
- I have user **Serverless** with **Express**
- I have used **Dynamodb** as DB
- **Jest** and **ts-mockito** to unit and integration testing

### Server

- Pending implemente swagger or postman collection
- Pending add husky to pass test and linter when you push to remote branch
- Penging split serverless.yml in resources file
- I did the one test of each type. Pending do the restants