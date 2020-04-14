const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {url,title,techs} = request.body;
  
  const respository = {
    id: uuid(),
    title,
    url,
    techs,
    likes:0,
  }
  repositories.push(respository);

  return response.json(repositories);

});

app.put("/repositories/:id", (request, response) => {
  const { id } =  request.params;
  const {url, title, techs} = request.body;
  
  const findRepositoryIndex = repositories.findIndex(repository =>
    repository.id === id  
  );
  
  if(findRepositoryIndex === -1){
    response.status(400).json({error: "algo de errado nao está certo" })
  }

 const respository = {
    id,
    title,
    url,
    techs,
    likes: 0,
  }

  repositories[findRepositoryIndex] = respository;

  return response.json(respository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } =  request.params;

  const findRepositoryIndex = repositories.findIndex(repository =>
    repository.id === id  
  );

  if ( findRepositoryIndex > 0){
    repositories.splice(findRepositoryIndex, 1);
  } else {
    return response.status(400).json({erro: "repository does not exists"})
  }
  
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository =>
    repository.id === id  
  );
  
  if ( findRepositoryIndex >= 0){
    repositories.splice(findRepositoryIndex, 1);
  }

  if(findRepositoryIndex === -1){
    return response.status(400).json({error: "repository not does exists."})
  }

  repositories[findRepositoryIndex].likes ++;

  return response.json(repositories[findRepositoryIndex])

});


module.exports = app;
