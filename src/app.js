const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  response.send(repositories);

});


app.post("/repositories", (request, response) => {
  
  const {title, url, techs} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes : 0,
  }

  repositories.push(repository);

  return response.send(repository);

});


app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs} = request.body;


  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  
  if(repositoryIndex <0){
    return response.status(400).json({error : "não existe este repositório"});
  }
  
  const repositoryNew = {
    id,
    title,
    url,
    techs,
    likes : repositories[repositoryIndex].likes,
  };
  repositories[repositoryIndex] = repositoryNew;

  return response.json(repositoryNew);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if(repositoryIndex<0){
    return response.status(400).json({error : "Não foi encontrado este repositório"})
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex =  repositories.findIndex(repository => repository.id == id);

  if(repositoryIndex<0){
    return response.status(400).json({error : "Não existe este repositório"});
  }

  repositories[repositoryIndex].likes += 1;

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
