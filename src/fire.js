import { initializeApp } from 'firebase/app'
import { getFirestore,collection,addDoc,query,orderBy,onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCCAwNylJsai0auSLA11ZhZu_Tbf_mNXRY",
  authDomain: "fir-kyky.firebaseapp.com",
  projectId: "fir-kyky",
  storageBucket: "fir-kyky.firebasestorage.app",
  messagingSenderId: "353005776128",
  appId: "1:353005776128:web:10580e5ee4498a5f2897e5",
  measurementId: "G-T573VQTCGG"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const getArticles = callback => {
  const q = query(collection(db, 'articles'), orderBy('title', 'asc'))
  onSnapshot(q, snapshot => {
    let articles = []
    snapshot.forEach(doc => {
      articles.push({ id: doc.id, ...doc.data() })
    })
    callback(articles)
  })
}

export const addArticle = article => {
  addDoc(collection(db, 'articles'), article)
}

export const updateArticle = article => {
  updateDoc(doc(db, 'articles', article.id), article)
}

export const deleteArticle = article => {
  deleteDoc(doc(db, 'articles', article.id))
}


