export const getOneSongDocV1 = {
  get: {
    tags: ['Song READ operations'], 
    description: 'Get one song from the database',
    operationId: 'getOneSongs',
    parameters: [ {
      name: 'id',
      in: 'path',
      schema: {
        $ref: '#/components/schemas/songID',
      },
      required: true,
      description: 'A single todo id',
    }],
    responses: {
      200: {
        description: 'Song were obtained', 
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Song',
            },
          },
        },
      },
      500: {
        description: 'If Song not found send a 500 status code (Internal Server Error)', // response desc.
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