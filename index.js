import express from "express";
import {
  agregarContacto,
  obtenerContactos,
} from "./public/src/mysql_connector.js";

let agenda;
const port = process.env.PORT || 8000;

const app = express();
app.listen(port, () => {
  console.log("Servidor escuchando en el puerto", port);
});

// Configurations
app.set("views", "./public/views");
app.set("view engine", "pug");

// Static files
app.use(express.static("./public"));
app.use(express.static("./public/src"));
app.use(express.static("./public/css"));

app.get("/", (req, res) => {
  agenda = obtenerContactos();
  res.render("index", { contactos: agenda });
});

app.get("/agregar/:nombre/:numero", (req, res) => {
  const nombre = req.params.nombre;
  const numero = req.params.numero;
  agregarContacto(nombre, numero);
  res.redirect("/");
});