export const getAllAlbumDocV1 = {
  get: {
    tags: ['Album READ operations'], 
    description: 'Get all album from the database',
    operationId: 'getAllAlbum',
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
      description: 'Cant of album per page',
      required: false,
      schema: {
        type: 'number',
      },
    },
    {
      name: 'artist',
      in: 'query',
      description: 'Filter by artist',
      required: false,
      schema: {
        type: 'string',
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
        description: 'Array of Album were obtained', 
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Album',
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