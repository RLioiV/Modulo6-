const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentación de la API',
      version: '1.0.0',
      description: 'API para autenticación y gestión de productos',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor de desarrollo'
      },
      {
        url: 'https://entrega-proyecto-mondodb.onrender.com',
        description: 'Servidor de producción'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    paths: {
      '/api/user/register': {
        post: {
          tags: ['Users'],
          summary: 'Registrar usuario',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Usuario registrado exitosamente' },
            400: { description: 'Error en los datos' }
          }
        }
      },
      '/api/user/login': {
        post: {
          tags: ['Users'],
          summary: 'Iniciar sesión',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string' },
                    password: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Login exitoso' },
            401: { description: 'Credenciales inválidas' }
          }
        }
      },
      '/api/product/create': {
        post: {
          tags: ['Products'],
          summary: 'Crear producto',
          security: [{ bearerAuth: [] }],
          responses: {
            201: { description: 'Producto creado' },
            401: { description: 'No autorizado' }
          }
        }
      },
      '/api/product/readall': {
        get: {
          tags: ['Products'],
          summary: 'Obtener todos los productos',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Lista de productos' },
            401: { description: 'No autorizado' }
          }
        }
      },
      '/api/product/readone/{id}': {
        get: {
          tags: ['Products'],
          summary: 'Obtener producto por ID',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: { description: 'Producto encontrado' },
            404: { description: 'Producto no encontrado' }
          }
        }
      },
      '/api/product/update/{id}': {
        put: {
          tags: ['Products'],
          summary: 'Actualizar producto',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: { description: 'Producto actualizado' },
            404: { description: 'Producto no encontrado' }
          }
        }
      },
      '/api/product/delete/{id}': {
        delete: {
          tags: ['Products'],
          summary: 'Eliminar producto',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: { description: 'Producto eliminado' },
            404: { description: 'Producto no encontrado' }
          }
        }
      }
    }
  },
  apis: [], // Remove the problematic file scanning
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};