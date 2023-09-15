export const getAllSongsDocV1 = {
  get: {
    tags: ['Song READ operations'], 
    description: 'Get all songs from the database',
    operationId: 'getAllSongs',
    parameters: [],
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