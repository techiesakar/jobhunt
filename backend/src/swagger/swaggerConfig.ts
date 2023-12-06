import { port } from "../config";
import {
  companyRouteAnnotations,
  companyDtoSchema,
} from "./schema/company.schema";
export const apiDocumentation = {
  openapi: "3.0.0",
  info: {
    title: "practise",
    version: "15",
    description: "This is practise Swagger UI",
    summary: "",
    termsOfService: "",
    contact: {
      name: "Sakar Aryal",
      url: "",
      email: "",
    },
    servers: [{ url: `http://localhost:${port}` }],
  },
  paths: {
    "/company/": {
      get: companyRouteAnnotations.get,
    },

    "/company/{id}": {
      get: companyRouteAnnotations.getByID,
      delete: companyRouteAnnotations.deleteByID,
    },
  },

  components: {
    schemas: {
      ...companyDtoSchema,
    },
  },
};
