export const postLoginUserDocV1 = {
  post: {
    tags: ['User POST operations'], 
    description: 'Login User', 
    operationId: 'postLoginUser', 
    parameters: [], 
    requestBody: {
      content: {
        'application/json': {
          schema: {
            email: {
              type: 'string',
            },
            password: {
              type: 'string',
            }
          },
          example: {
            email: 'ejemplo@correo.com',
            password: '**********'
          }
        }
      }
    },
    responses: {
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