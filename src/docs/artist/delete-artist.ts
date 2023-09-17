export const deleteArtistDocV1 = {
  delete: {
    tags: ['Admin CUD operations'], 
    description: 'Deleting a Artist', 
    operationId: 'deleteArtist', 
    parameters: [
      {
        name: 'id', 
        in: 'path', 
        schema: {
          $ref: '#/components/schemas/artistID', 
        },
        required: true,
        description: 'Deleting a done Artist', 
      },
    ],
    responses: {
      204: {
        description: 'Artist deleted successfully',
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