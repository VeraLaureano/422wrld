export const getOneAlbumDocV1 = {
  get: {
    tags: ['Album READ operations'], 
    description: 'Get one album from the database',
    operationId: 'getOneAlbum',
    parameters: [ {
      name: 'id',
      in: 'path',
      schema: {
        $ref: '#/components/schemas/albumID',
      },
      required: true,
      description: 'A single Album id',
    }],
    responses: {
      200: {
        description: 'Album were obtained', 
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