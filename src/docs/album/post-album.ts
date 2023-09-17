export const postAlbumsDocV1 = {
  post: {
    tags: ['Admin CUD operations'], 
    description: 'Create Album', 
    operationId: 'postAlbum', 
    parameters: [], 
    responses: {
      201: {
        description: 'Album created successfully',
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