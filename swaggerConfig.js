import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API",
      version: "1.0.0",
      description: "API documentation for the Ecommerce system",
    },
    servers: [
      {
        url: process.env.PORT, 
      },
    ],
    components: {
      securitySchemes: {
        UserBearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT for user role",
        },
        AdminBearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT for admin role",
        },
      },
    },
  },
  apis: ["./Routes/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;