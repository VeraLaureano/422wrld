export const postArtistDocV1 = {
  post: {
    tags: ['Admin CUD operations'], 
    description: 'Create Artist', 
    operationId: 'postArtist', 
    parameters: [], 
    responses: {
      201: {
        description: 'Artist created successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Artist',
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