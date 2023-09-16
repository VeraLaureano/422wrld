export const songID = {
  type: 'string',
  description: 'An id of a Song', 
  example: '64fe56546f36830eef72921b',
}

export const albumID = {
  type: 'string',
  description: 'An id of a Album', 
  example: '650210f6c53fcd1e07cbc467',
}

export const artistID = {
  type: 'string',
  description: 'An id of a Artists', 
  example: '650233cffb6479fe2c3a1f91',
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

export const Album = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      description: 'Album identificator',
      example: '650210f6c53fcd1e07cbc467'
    },
    title: {
      type: 'string',
      description: 'Album title',
      example: 'Punkdemia'
    },
    artist: {
      type: 'string',
      description: 'Album artist name',
      example: 'Neo Pistea'
    },
    producer: {
      type: '[string]',
      description: 'Album producer/s',
      example: '["Lean Coca", "0-600", "Club Hats", "Oniria"]'
    },
    genre: {
      type: '[string]',
      description: 'Album genre/s',
      example: '["Trap", "Hip Hop"]'
    },
    realeaseDate: {
      type: 'Date',
      description: 'Album release date',
      example: '2021-04-14T00:00:00.000Z'
    },
    coverUrl: {
      type: 'string',
      description: 'Album cover url',
      example: 'https://i.scdn.co/image/ab67616d00001e02a6372d2fb63213712b7f6875'
    },
    tracks: {
      type: '[Song]',
      description: 'Artist tracks list',
      example: {
        $ref: '#/components/schemas/Song',
      }
    },
  }
}

export const Artist = {
  type: 'Object',
  properties: {
    _id: {
      type: 'string',
      description: 'Artist identificator',
      example: '650233cffb6479fe2c3a1f91'
    },
    imageURL: {
      type: 'string',
      description: 'Artist profile image url',
      example: 'https://instagram.flpg1-1.fna.fbcdn.net/v/t51.2885-19/374720732_135203229662888_2293027917940746544_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.flpg1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=37L33Z8AHlQAX8iVU1S&edm=ACWDqb8BAAAA&ccb=7-5&oh=00_AfBySa9LMFDBrO0GTG_LEkR-AN1WmN2oAGiVRep097Bo4A&oe=6506B505&_nc_sid=ee9879'
    },
    pseudonym: {
      type: 'string',
      description: 'Artist pseudonym',
      example: 'Duki'
    },
    fullName: {
      type: 'string',
      description: 'Artist full name',
      example: 'Mauro Ezequiel Lombardo Quiroga'
    },
    born: {
      type: 'string',
      description: 'Artist born date',
      example: '1996-06-24"'
    },
    biography: {
      type: 'string',
      description: 'Artist biography',
      example: 'Mauro Ezequiel Lombardo nació el 24 de junio de 1996 en Almagro, Buenos Aires'
    },
    activity: {
      type: 'Object',
      description: 'Artist activity period',
      example: '{"from": 2015,"to": "Actualiadad"}'
    },
    nationality: {
      type: 'string',
      description: 'Artist nationality',
      example: 'Argentina'
    },
    children: {
      type: 'string',
      description: 'Artist children',
      example: 'No'
    },
    genre: {
      type: '[string]',
      description: 'Artist genres',
      example: '["Trap", "Hip Hop"]'
    },
    listen: {
      type: 'Object',
      description: 'Artist platform for listen links',
      example: '{spotify: "", ytbMusic: "", amazonMusic: "", appleMusic: ""}'
    },
    profiles: {
      type: 'Object',
      description: 'Artist social media links',
      example: '{youtube: "", instagram: "", twitter: ""}'
    },
    albums: {
      type: '[Album]',
      description: 'Artist albums list',
      example: {
        $ref: '#/components/schemas/Album',
      }
    },
    tracks: {
      type: '[Song]',
      description: 'Artist tracks list',
      example: {
        $ref: '#/components/schemas/Song',
      }
    },
    awards: {
      type: '[Object]',
      description: 'Artist awards list',
      example: '{year: "", category: "", nomination: "", result: ""}'
    }
  }
}

export const Delete = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      description: 'Delete message', 
      example: 'DELETE_SUCCESS',
    },
    data: {
      type: 'null',
      description: 'Empty data', 
      example: 'null',
    },
    statusCode: {
      type: 'number',
      description: 'HTTP status code', 
      example: 204,
    },
  }
}

export const ISError = {
  type: 'object', //data type
  properties: {
    message: {
      type: 'string', // data type
      description: 'Error message', // desc
      example: 'NO_SONG_WITH_ID_id-here', // example of an error message
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
