const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const database = require("./configs/database");
const session = require("express-session");
const sessionStore = require("connect-mongodb-session")(session);

// Carrega as rotas
const cotacaoRoutes = require("./routes/cotacao");
const planosRoutes = require("./routes/planos");
const cadastroRoutes = require("./routes/cadastro");
const loginRoutes = require("./routes/login");
const pagamentoRoutes = require("./routes/pagamento");
const sairRoutes = require("./routes/sair");
const obrigadoRoutes = require("./routes/obrigado");

/// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Conecta ao banco de dados
database.mongoose
  .connect(database.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  })
  .catch((error) => {
    console.log(
      "Não foi possivel realizar a conexão com o banco de dados!",
      error
    );
    process.exit();
  });

/// Cria a aplicação Express
const app = express();

// Remove extensão .html
app.use((req, res, next) => {
  if (req.path.endsWith(".html")) {
    let newPath = req.path.slice(0, -5);
    res.redirect(301, newPath);
  } else {
    next();
  }
});

// Armazena sessões no MongoDB
const store = new sessionStore({
  uri: process.env.DB_URL,
  collection: "Sessoes",
});
store.on("error", function (error) {
  console.log(error);
});

app.use(
  session({
    secret: process.env.DB_SECRET_TOKEN,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }, // Um ano
    store: store,
    saveUninitialized: true,
    resave: true,
  })
);

// Configura o body-parser nativo do Express
app.use(express.json());

// Configura a pasta public para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Registra as rotas
app.use("/", cotacaoRoutes);
app.use("/planos", planosRoutes);
app.use("/login", loginRoutes);
app.use("/cadastro", cadastroRoutes);
app.use("/pagamento", pagamentoRoutes);
app.use("/sair", sairRoutes);
app.use("/obrigado", obrigadoRoutes);

// Inicia o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
