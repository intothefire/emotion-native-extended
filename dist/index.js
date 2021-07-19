
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-native-extended.cjs.production.min.js')
} else {
  module.exports = require('./emotion-native-extended.cjs.development.js')
}
