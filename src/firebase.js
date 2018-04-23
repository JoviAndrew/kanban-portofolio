import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: 'AIzaSyBdF3c-32LJd-cD7ZehAh7nmymjg0oD490',
  authDomain: 'kanban-ae8e0.firebaseapp.com',
  databaseURL: 'https://kanban-ae8e0.firebaseio.com',
  projectId: 'kanban-ae8e0',
  storageBucket: 'kanban-ae8e0.appspot.com',
  messagingSenderId: '1001628850466'
})

export const db = app.database()
