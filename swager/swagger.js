// swagger/swaggerConfig.js
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "UNISTAY",
      version: "1.0.0",
      description: "API documentation for UNISTAY",
      contact: {
        name: "Ade",
      },
    },
    servers: [
      {
        url: "http://localhost:9000",
      },
      {
        url: "https://fuo-cbt-backend.onrender.com",
      },
    ],
    schemes: {
      http: "http",
      https: "https",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      responses: {
        UnauthorizedError: {
          description: "Authentication required",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Unauthorized",
                  },
                  message: {
                    type: "string",
                    example: "Authentication required to access this resource",
                  },
                  code: {
                    type: "integer",
                    example: 401,
                  },
                },
              },
            },
          },
        },
        ForbiddenError: {
          description: "Insufficient permissions",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Forbidden",
                  },
                  message: {
                    type: "string",
                    example: "You don't have permission to perform this action",
                  },
                  code: {
                    type: "integer",
                    example: 403,
                  },
                },
              },
            },
          },
        },
        NotFoundError: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Not Found",
                  },
                  message: {
                    type: "string",
                    example: "The requested resource was not found",
                  },
                  code: {
                    type: "integer",
                    example: 404,
                  },
                },
              },
            },
          },
        },
        ConflictError: {
          description: "Resource conflict",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Conflict",
                  },
                  message: {
                    type: "string",
                    example:
                      "Resource already exists or conflicts with existing data",
                  },
                  code: {
                    type: "integer",
                    example: 409,
                  },
                },
              },
            },
          },
        },
        ServerError: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Internal Server Error",
                  },
                  message: {
                    type: "string",
                    example: "An unexpected error occurred on the server",
                  },
                  code: {
                    type: "integer",
                    example: 500,
                  },
                },
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [ "./routes/user.route.js", "./routes/download.route.js" ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;