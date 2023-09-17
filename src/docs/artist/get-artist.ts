export const getOneArtistDocV1 = {
  get: {
    tags: ['Artist READ operations'], 
    description: 'Get one Artist from the database',
    operationId: 'getOneArtist',
    parameters: [ {
      name: 'id',
      in: 'path',
      schema: {
        $ref: '#/components/schemas/artistID',
      },
      required: true,
      description: 'A single Artist id',
    }],
    responses: {
      200: {
        description: 'Artist were obtained', 
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
      500: {
        description: 'If Artist not found send a 500 status code (Internal Server Error)', // response desc.
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ISError',
            },
          },
        },
      }
    },
  },
}