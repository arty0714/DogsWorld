# DogsWorld
Application to add dogs to a MS database and show the list of them.
## Dependencies
docker, docker-compose
## Build
```docker-compose build```
## Start
```docker-compose up -d```
## Using
Application runs on the port 8080. Server has the following roots:
  - GET /ping: respone with a message
  - GET /dogs: response with a dog list. It has the following options:
      1) attribute - field that will be used to sort dogs(name, color, tail_length, weight);
      2) order - DESC or ASC;
      3) limit - number that defines how many dogs you will see;
      4) pageNumber - offset from the start of the list
  - POST /dogs: create a dog and response with a dog object

To use with curl:
  - curl -X GET http://localhost:8080/ping
  - curl -X GET http://localhost:8080/dogs
  - curl -X POST http://localhost:8080/dogs -H 'Content-Type: application/json' -d '{"name": "Foggy","tail_length": 1733,"weight": 33}'
