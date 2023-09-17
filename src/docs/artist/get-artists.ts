export const getAllArtistsDocV1 = {
  get: {
    tags: ['Artist READ operations'], 
    description: 'Get all artists from the database',
    operationId: 'getAllArtists',
    parameters: [{
      name: 'page',
      in: 'query',
      description: 'Page number',
      required: false,
      schema: {
        type: 'number',
      },
    },
    {
      name: 'perPage',
      in: 'query',
      description: 'Cant of songs per page',
      required: false,
      schema: {
        type: 'number',
      },
    },
    {
      name: 'genre',
      in: 'query',
      description: 'Filter by genre',
      required: false,
      schema: {
        type: 'string',
      },
    }],
    responses: {
      200: {
        description: 'Array of Artist were obtained', 
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Artist',
            },
          },
        },
      },
      401: {
        description: 'Authorization required', 
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Unauthorized',
            },
          },
        },
      },
    },
  },
}