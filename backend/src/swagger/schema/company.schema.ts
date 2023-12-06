export const companyDtoSchema = {
  CompanyDto: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "This is for entering name",
      },
    },
  },
};

export const routeTags = {
  CompanyRoutes: {
    name: "Company Routes",
    description: "This is for API company",
  },
};

export const companyRouteAnnotations = {
  get: {
    summary: "This is get request for all data",
    tags: [routeTags.CompanyRoutes.name],
    responses: {
      "200": {
        description: "This is successful response",
      },
    },
  },

  getByID: {
    tags: [routeTags.CompanyRoutes.name],
    summary: "This is get request for single data",
    parameters: [
      {
        in: "path",
        name: "id",
        schema: {
          type: "string",
        },
        required: true,
        description: "This is for ID",
      },
    ],
    responses: {
      "200": {
        description: "This is successful response",
      },
    },
  },

  deleteByID: {
    summary: "This is to delete data",
    tags: [routeTags.CompanyRoutes.name],
    parameters: [
      {
        in: "path",
        name: "id",
        schema: {
          type: "string",
        },
        required: true,
        description: "This is for ID",
      },
    ],
    responses: {
      "200": {
        description: "Data deleted successfully",
      },
    },
  },

  restoreByID: {
    summary: "This is to restore data",
    tags: [routeTags.CompanyRoutes.name],
    parameters: [
      {
        in: "path",
        name: "id",
        schema: {
          type: "string",
        },
        required: true,
        description: "This is for ID",
      },
    ],

    responses: {
      "200": {
        description: "Data restore successfully",
      },
    },
  },
};
