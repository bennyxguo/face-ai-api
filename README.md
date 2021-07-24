<div align="center">
  <a href="https://tridiamond.tech" target="_blank" rel="noopener noreferrer">
    <img width="80" alt="image" src="https://res.cloudinary.com/tridiamond/image/upload/v1627134299/github%20images/logo512_rcfide.png">
  </a>
  <br/>
  <h1><b>Face AI API</b></h1>
  <strong>Backend for Face AI application.</strong>
</div>

<br/>

<p align="center">
  <img src="https://img.shields.io/github/stars/TriDiamond/face-ai-api">
  <img src="https://img.shields.io/github/forks/TriDiamond/face-ai-api">
  <img src="https://img.shields.io/github/issues/TriDiamond/face-ai-api">
  <img src="https://img.shields.io/github/last-commit/TriDiamond/face-ai-api/main">
  <img src="https://img.shields.io/github/license/TriDiamond/face-ai-api">
  <!-- <img src="https://img.shields.io/circleci/build/github/TriDiamond/face-ai-api/main"> -->
</p>

## Intro

This is a Node.js Express backend made for the [Face AI](https://github.com/TriDiamond/face-ai) application. It's built base on the final project of [smart-brain-api](https://github.com/aneagoie/smart-brain-api) by @Andrei Neagoie in his course "[The Complete Junior to Senior Web Developer Roadmap](https://www.udemy.com/share/1013iu2@PkdKbFhaSVYNe0JAOGJOfg==/)".

Same as the Face AI application, this backend has added extra features like:

- Use `MySQL` database instead with `Sequelize`
- Added `helmet` for extra security
- Completely written in `TypeScript`

## Packages Used

- typescript
- bcrypt
- cors
- dotenv
- express
- helmet
- morgan
- mysql2
- sequelize

## Frontend

The frontend of this application is in another repo [face-ai](https://github.com/TriDiamond/face-ai).

## Development

Clone the repo onto your local machine, then install all the dependencies:

```shell
npm install

# or

yarn install
```

To run the application run:

```shell
npm run serve

# or

yarn serve
```

Last but not least, add a `.env` file in the root folder with the following content:

```shell
ALLOWED_CORS=http://localhost:3000 # Domain to allow CORS

DB_HOST=xxx.xxx.xxx.xx # Database host url
DB_PORT=3306
DB_USERNAME=face_ai
DB_PASSWORD=xxxxx # Database password
DB_NAME=face_ai

CLARIFAI_KEY=YOUR_CLARIFAI_KEY # Get your key on Clarifai
```
