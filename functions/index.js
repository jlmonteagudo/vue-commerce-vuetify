const functions = require('firebase-functions')
const admin = require('firebase-admin')
const stats = require('./lib/stats')
const algolia = require('./lib/algolia')
admin.initializeApp(functions.config().firebase)

exports.countCreateProduct = stats.countCreateProduct
exports.countDeleteProduct = stats.countDeleteProduct

exports.algoliaProductCreated = algolia.algoliaProductCreated
exports.getSearchKey = algolia.getSearchKey
