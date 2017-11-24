import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyCZ0gFo1BUNmjgK4WcEWT1lANWFVAJCy-w',
  authDomain: 'vue-commerce.firebaseapp.com',
  databaseURL: 'https://vue-commerce.firebaseio.com',
  projectId: 'vue-commerce',
  storageBucket: 'vue-commerce.appspot.com',
  messagingSenderId: '535877719979'
}

export const app = firebase.initializeApp(config)
export const products = firebase.firestore().collection('products')
export const stats = firebase.firestore().collection('stats')
