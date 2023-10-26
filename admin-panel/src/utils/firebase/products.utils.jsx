import { collection, deleteDoc, doc, getDocs, query, setDoc } from "firebase/firestore"
import { db } from "./firebase"


//create product document in db

export const createProductDocument = async (productInfo) => {
    const {productid} = productInfo

    const productDocRef = doc(db, "products", productid )     //find the reference of the document in the db 
    
    const createdAt = new Date()
    try {
        await setDoc(productDocRef, {
            ...productInfo,
            createdAt
        })
        console.log('product successfully added')
    } catch (error) {
        console.log('error creating product doc', error)
    }
}

//get all products from db

export const getAllProductsAndDocuments = async () => {
    const collectionRef = collection(db, 'products')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    const productsMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        acc.push(docSnapshot.data())
        return acc
    }, [])
    return productsMap
}

// delete products

export const deleteProductDocument = async (productId) => {
    await deleteDoc(doc(db, 'products', productId))
}

