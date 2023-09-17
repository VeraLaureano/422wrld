export const postSignupUserDocV1 = {
  post: {
    tags: ['User POST operations'], 
    description: 'Signup User', 
    operationId: 'postSignupUser', 
    parameters: [], 
    requestBody: {
      content: {
        'application/json': {
          schema: {
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
            confirmPassword: {
              type: 'string',
            }
          },
          example: {
            name: 'nombre',
            email: 'ejemplo@correo.com',
            password: '**********',
            confirmPassword: '**********',
          }
        }
      }
    },
    responses: {
      201: {
        description: 'User signup successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
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