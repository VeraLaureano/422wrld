export const patchAlbumDocV1 = {
  patch: {
    tags: ['Admin CUD operations'],
    description: 'Update Album', 
    operationId: 'patchAlbum', 
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/albumID',
        },
        required: true,
        description: 'Id of Album to be updated',
      }
    ],
    responses: {
      200: {
        description: 'Album updated successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Album',
            },
          },
        },
      },
      500: {
        description: 'Server error', 
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ISError',
            },
          },
        },
      },
    },
  }
}