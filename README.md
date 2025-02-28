# Trivia

assignment: [https://www.quad.team/assignment](https://www.quad.team/assignment)

## Todo:
- Implement CORS
- Fix saving data in memory (leak)
- Sanitise user input properly
- Classnames met hoofdletter
- bad practice om op Exception te catchen
- gelaagdheid inbouwen

## [API](./api)

### Run locally (with Intellij IDEA)

- Download correct Java SDK (21) via project setup
- Open Maven tab and Sync/Reload all Maven projects
- Run locally (available on [localhost:8080](localhost:8080)):
```bash
cd api
./mvnw spring-boot:run
```

### Run tests

- Right click src/main/java folder 'run tests' and Intellij creates a runconfig for you


## Frontend

### Run locally

- Install nodejs v22.5.1. or higher
- Install dependencies
```bash
cd frontend
npm install
```
- Run app
```bash
npm run dev 
```