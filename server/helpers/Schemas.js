module.exports = {
  schema: {
    title: 'Location Schema v1',
    type: 'object',
    required: ['lat', 'long', 'city'],
    properties: {
      lat: {
        type: 'string'
      },
      long: {
        type: 'string'
      },
      city: {
        type: 'string'
      },
      state: {
        type: 'string'
      },
      zone: {
        type: 'string'
      }
    }
  }
};
