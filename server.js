import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

let productos = [
  { id: 1, nombre: 'Laptop', precio: 3500.0, stock: 10 },
  { id: 2, nombre: 'Mouse', precio: 80.5, stock: 50 },
  { id: 3, nombre: 'Teclado', precio: 120.0, stock: 30 },
  { id: 4, nombre: 'Microfono', precio: 120.0, stock: 30 },
  { id: 5, nombre: 'Monitor', precio: 1200.0, stock: 20 },
  { id: 6, nombre: 'Portatil', precio: 5200.0, stock: 2 },
];

const typeDefs = `
  type Producto {
    id: Int
    nombre: String
    precio: Float
    stock: Int
  }

  type Query {
    productos: [Producto]
    producto(id: Int!): Producto
  }

  type Mutation {
    crearProducto(nombre: String!, precio: Float!, stock: Int!): Producto
  }
`;

const resolvers = {
  Query: {
    productos: () => productos,
    producto: (_, { id }) => productos.find((p) => p.id === id),
  },
  Mutation: {
    crearProducto: (_, { nombre, precio, stock }) => {
      const nuevo = {
        id: productos.length + 1,
        nombre,
        precio,
        stock,
      };
      productos.push(nuevo);
      return nuevo;
    },
  },
};

async function startServer() {
  const app = express();
  const PORT = 5678;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ embed: true }) 
    ],
  });

  await server.start();

  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(server)
  );

  app.get('/', (req, res) => {
    res.send('🚀 Hola! Esta es mi app Node con Apollo Server 4');
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`El servidor escucha en http://0.0.0.0:${PORT}`);
    console.log(`GraphQL listo en http://0.0.0.0:${PORT}/graphql`);
  });
}

startServer();
