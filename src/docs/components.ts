export const songID = {
  type: 'string',
  description: 'An id of a Song', 
  example: '64fe56546f36830eef72921b',
}
export const Song = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      description: 'Song identificator',
      example: '64fe55246f36830eef729214'
    },
    title: {
      type: 'string',
      description: 'Song title',
      example: 'Bienvenida'
    },
    artist: {
      type: '[string]',
      description: 'Song artist/s',
      example: '["YSY A"]'
    },
    genre: {
      type: '[string]',
      description: 'Song genre/s',
      example: '["Trap", "Hip Hop"]'
    },
    duration: {
      type: 'Object',
      description: 'Song duration',
      example: '{"minutes": 0, "seconds": 29}'
    },
    release: {
      type: 'Date',
      description: 'Song release date',
      example: '2018-11-11'
    },
    spotify: {
      type: 'string',
      description: 'Song spotify link',
      example: 'https://open.spotify.com/intl-es/track/5sv0imGwJM2zyLkLTCVhXh?si=a3a8ea10c92142df'
    },
    cover: {
      type: 'string',
      description: 'Song cover link',
      example: 'https://i.scdn.co/image/ab67616d00001e0269445bc08d1eb43cc33965c6'
    },
  }
}
export const ISError = {
  type: 'object', //data type
  properties: {
    message: {
      type: 'string', // data type
      description: 'Error message', // desc
      example: 'NO_SONG_WITH_ID_64fe55246f36830eef729214', // example of an error message
    },
    error: {
      type: 'string', // data type
      description: 'Error type', // desc
      example: 'INTERNAL_SERVER_ERROR', // example of an error internal code
    },
    statusCode: {
      type: 'number', // data type
      description: 'HTTP status codew', // desc
      example: 500, // example of an error internal code
    }
  },
}
