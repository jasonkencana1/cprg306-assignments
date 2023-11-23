import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

async function getItemsByUser(userId) {
try {
    const usersCollection = collection(db, 'users');
    const userQuery = query(usersCollection, where('userId', '==', userId));
    const userDocs = await getDocs(userQuery);

    if (userDocs.empty) {
    console.error(`User with userId ${userId} not found`);
    return [];
    }

    const userDoc = userDocs.docs[0];
    const itemsCollection = collection(userDoc.ref, 'items');
    const itemsQuerySnapshot = await getDocs(itemsCollection);
    const items = [];

    itemsQuerySnapshot.forEach((itemDoc) => {
        items.push({
            id: itemDoc.id,
            data: itemDoc.data(), 
        });
    });

    return items;
} catch (error) {
    console.error('Error retrieving items:', error);
    return [];
}
}


async function addItemToUser(userId, newItem) {
try {
    const usersCollection = collection(db, 'users');
    const userQuery = query(usersCollection, where('userId', '==', userId));
    const userDocs = await getDocs(userQuery);

    if (userDocs.empty) {
    console.error(`User with userId ${userId} not found`);
    return null;
    }

    const userDoc = userDocs.docs[0];
    const itemsCollection = collection(userDoc.ref, 'items');
    const newItemRef = await addDoc(itemsCollection, newItem);

    return newItemRef.id;
    } catch (error) {
        console.error('Error adding item:', error);
        return null;
    }
}


const userId = 'exampleUserId';


getItemsByUser(userId)
.then((items) => {
    console.log('Retrieved items:', items);
})
.catch((error) => {
    console.error('Error:', error);
});


const newItem = { name: 'New Item', quantity: 1};
addItemToUser(userId, newItem)
.then((newItemId) => {
    console.log('Added new item with ID:', newItemId);
})
.catch((error) => {
    console.error('Error:', error);
});