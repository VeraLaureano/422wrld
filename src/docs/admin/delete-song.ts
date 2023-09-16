export const deleteSongDocV1 = {
  delete: {
    tags: ['Admin CRUD operations'], 
    description: 'Deleting a Song', 
    operationId: 'deleteSong', 
    parameters: [
      {
        name: 'id', 
        in: 'path', 
        schema: {
          $ref: '#/components/schemas/songId', 
        },
        required: true,
        description: 'Deleting a done Song', 
      },
    ],
    responses: {
      204: {
        description: 'Song deleted successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Delete',
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