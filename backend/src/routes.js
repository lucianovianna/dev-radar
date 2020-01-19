const { Router } = require("express");
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");
const routes = Router();

routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);
routes.get("/search", SearchController.index);
routes.delete("/devs/:id", DevController.destroy);

module.exports = routes;

/*
Métodos HTTP: GET, POST, PUT, DELETE

Tipos de parametros:

Query params: request.query (Filtros, ordenação, paginação...)
Route params: request.params (Identificar um recurso na alteração ou remoção)
Body: request.body (dados para criação ou alteração de um registro)

*/