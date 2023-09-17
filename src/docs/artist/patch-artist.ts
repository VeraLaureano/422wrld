export const patchArtistDocV1 = {
  patch: {
    tags: ['Admin CUD operations'],
    description: 'Update Artist', 
    operationId: 'patchArtist', 
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/artistID',
        },
        required: true,
        description: 'Id of Artist to be updated',
      }
    ],
    responses: {
      200: {
        description: 'Artist updated successfully',
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