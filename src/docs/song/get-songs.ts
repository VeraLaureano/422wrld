export const getAllSongsDocV1 = {
  get: {
    tags: ['Song READ operaction'], 
    description: 'Get all songs from the database',
    operationId: 'getAllSongs',
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
      name: 'artist',
      in: 'query',
      description: 'Filter by artist',
      required: false,
      schema: {
        type: 'string',
      },
    },
    {
      name: 'producer',
      in: 'query',
      description: 'Filter by producer',
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
        description: 'Array of Songs were obtained', 
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Song',
            },
          },
        },
      },
    },
  },
}