const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// Define el modelo de datos (Post)
const Post = sequelize.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

// Sincroniza el modelo con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
  });


  const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const path = require('path');
const bodyParser = require('body-parser');

// Configura middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Configura EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.get('/', (req, res) => {
  // Obtén y muestra la lista de publicaciones
  Post.findAll()
    .then((posts) => {
      res.render('list', { posts });
    })
    .catch((err) => {
      console.error('Error al obtener las publicaciones:', err);
      res.status(500).send('Error interno del servidor');
    });
});

app.get('/create', (req, res) => {
  res.render('create');
});

app.post('/create', (req, res) => {
  // Crea una nueva publicación
  const { title, content, imageUrl } = req.body;
  Post.create({
    title,
    content,
    imageUrl,
  })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.error('Error al crear la publicación:', err);
      res.status(500).send('Error interno del servidor');
    });
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
