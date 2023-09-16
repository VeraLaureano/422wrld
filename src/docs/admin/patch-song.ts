export const patchSongDocV1 = {
  patch: {
    tags: ['Admin CRUD operations'],
    description: 'Update song', 
    operationId: 'patchSong', 
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/songID',
        },
        required: true,
        description: 'Id of Song to be updated',
      }
    ],
    responses: {
      200: {
        description: 'Song updated successfully',
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