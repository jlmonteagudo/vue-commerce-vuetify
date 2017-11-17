const functions = require('firebase-functions')
const admin = require('firebase-admin')

exports.countCreateProduct = functions.firestore
  .document('products/{productId}')
  .onCreate(event => {
    return updateCountProducts(1)
  })

exports.countDeleteProduct = functions.firestore
  .document('products/{productId}')
  .onDelete(event => {
    return updateCountProducts(-1)
  })

function updateCountProducts (factor) {
  var productRef = admin.firestore().collection('stats').doc('products')
  var productStats = {count: 1}

  return productRef.get().then((doc) => {
    if (doc.exists) {
      productStats.count = doc.data().count + factor
    }
    productRef.set(productStats)
  })
}
