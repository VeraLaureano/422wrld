export const postSongDocV1 = {
  post: {
    tags: ['Admin CRUD operations'], 
    description: 'Create Song', 
    operationId: 'postSong', 
    parameters: [], 
    responses: {
      201: {
        description: 'Song created successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Song',
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