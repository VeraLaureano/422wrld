export const deleteAlbumDocV1 = {
  delete: {
    tags: ['Admin CUD operations'], 
    description: 'Deleting a Album', 
    operationId: 'deleteAlbum', 
    parameters: [
      {
        name: 'id', 
        in: 'path', 
        schema: {
          $ref: '#/components/schemas/albumID', 
        },
        required: true,
        description: 'Deleting a done Song', 
      },
    ],
    responses: {
      204: {
        description: 'Album deleted successfully',
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