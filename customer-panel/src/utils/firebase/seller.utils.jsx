import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore"
import {
    createUserWithEmailAndPassword,
  } from "firebase/auth";
import { auth, db } from "./firebase"

//creating Seller authentication from email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    try {
        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log('error in creating seller with email and password', error)
    }
  };


  // creating Seller account document in db
export const createSellerDocumentFromAuth = async (sellerAuth, sellerInfo) => {
    const sellerDocRef = doc(db, "sellers", sellerAuth.uid )     //find the reference of the document in the db 
    const sellerSnapshot = await getDoc(sellerDocRef)

    if (!sellerSnapshot.exists()) {
        // const {email, name, location, sellerid} = sellerInfo
        const createdAt = new Date()
        try {
            await setDoc(sellerDocRef, {
                ...sellerInfo,
                createdAt
            })
            console.log('seller successfully added')
        } catch (error) {
            console.log('error creating product doc', error)
        }

    }
}

//get seller account from db

export const getAllSellersAccountAndDocuments = async () => {
    const collectionRef = collection(db, 'sellers')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    const sellersAccountArray = querySnapshot.docs.reduce((acc, docSnapshot) => {
        acc.push(docSnapshot.data())
        return acc
    }, [])
    return sellersAccountArray;
}

//delete seller account from db

export const deleteSellerAccountDocument = async (sellerid) => {
    await deleteDoc(doc(db, 'sellers', sellerid))
}


// export const getCategoriesAndDocuments = async () => {
//     const collectionRef = collection(db, 'categories')
//     const q = query(collectionRef)
  
//     const querySnapshot = await getDocs(q)
//     const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
//       const {title, items} = docSnapshot.data()
//       acc[title.toLowerCase()] = items
//       return acc
//     }, {})
//     return categoryMap
//   }