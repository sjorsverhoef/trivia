# Trivia

assignment: [https://www.quad.team/assignment](https://www.quad.team/assignment)

## Get started

### When using Intellij IDEA

#### Local setup
- Download correct Java SDK (21) via project setup
- Open Maven tab and Sync/Reload all Maven projects
- Run locally (available on [localhost:8080](localhost:8080)):
```bash
./mvnw spring-boot:run
```


#### Run tests
- Right click src/main/java folder 'run tests' and Intellij creates a runconfig for you


## Todo:

- Implement CORS
- Fix saving data in memory (leak)
- Sanitise user input properly