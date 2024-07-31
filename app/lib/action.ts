import { getFirestore, collection, addDoc, Timestamp, getDocs, deleteDoc, doc, setDoc, updateDoc, increment  } from 'firebase/firestore';
import { auth } from '../firebase/config'; 
import { nanoid } from 'nanoid';
import { LinkDetails, EditLinkDetails  } from './definations';
import { Link } from 'lucide-react';
import { use } from 'react';

const db = getFirestore(); 

export const handleCreateShortenLink = async (name: string, link: string, customSlug?: string) => {
    const user = auth.currentUser;
    if (!auth.currentUser) {
        console.error("User is not authenticated.");
        return;
    }


    const data = {
        name,
        link,
        shortLink: nanoid(6),
        customSlug,
        createdAt: Timestamp.now(), 
        clicks: 0,
    };

    

    const userId = user?.uid;
    try {
        const userLinksCollection = collection(db, "users", userId ?? "", "links");
        const resp = await addDoc(userLinksCollection, data);

        const publicLinkData = {
          link,
          userId: user?.uid,
          linkId: resp.id ,
        };

        const publicLinksCollection = collection(db, "links");
        await setDoc(doc(publicLinksCollection, data.shortLink), publicLinkData);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

};

export async function handleGetLinks() {
    return new Promise<LinkDetails[]>((resolve, reject) => {
      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          console.error("User is not authenticated.");
          reject("User is not authenticated.");
          return;
        }
  
        try {
          const userLinksCollection = collection(db, "users", user.uid, "links");
          const querySnapshot = await getDocs(userLinksCollection);
          
          if (querySnapshot.empty) {
            console.log("No links found.");
            resolve([]);
          } else {
            const userData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              name: doc.data().name,
              link: doc.data().link,
              shortLink: doc.data().shortLink,
              clicks: doc.data().clicks,
              createdAt: doc.data().createdAt,
            }));
            resolve(userData);
          }
        } catch (e) {
          console.error("Error getting documents: ", e);
          reject(e);
        }
      });
    });
}

export const EditLinkById = async (id: string) => {
    return new Promise<EditLinkDetails | null>((resolve, reject) => {
      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          console.error("User is not authenticated.");
          reject("User is not authenticated.");
          return;
        }
  
        try {
          const userLinksCollection = collection(db, "users", user.uid, "links");
          const doc = await getDocs(userLinksCollection);
          const data = doc.docs.find((doc) => doc.id === id);
  
          if (!data) {
            console.log("No link found.");
            resolve(null);
          } else {
            const linkData = {
              name: data.data().name,
              link: data.data().link,
              customSlug: data.data().customSlug,
            };

            resolve(linkData);
          }
        } catch (e) {
          console.error("Error getting document: ", e);
          reject(e);
        }
      });
  });
}

export const updateLink = async (id: string, name: string, link: string, shortLink: string, customSlug?: string, ) => {
    return new Promise<EditLinkDetails | void>((resolve, reject) => {
      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          console.error("User is not authenticated.");
          reject("User is not authenticated.");
          return;
        }
  
        try {
          const userLinksCollection = collection(db, "users", user.uid, "links");
          const publicLinksCollection = collection(db, "links");
          const publicLinkDoc = doc(publicLinksCollection, shortLink);
          const userLinkDoc = doc(userLinksCollection, id);
          await updateDoc(publicLinkDoc, { link });
          await updateDoc(userLinkDoc, { name, link, customSlug });
          resolve();
        } catch (e) {
          console.error("Error updating document: ", e);
          reject(e);
        }
      });
    }
  );
}


export const deleteLink = async (id: string, shortLink: string) => {

    return new Promise<EditLinkDetails | void>((resolve, reject) => {
      
      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          console.error("User is not authenticated.");
          reject("User is not authenticated.");
          return;
        }
  
        try {
          const userLinksCollection = collection(db, "users", user.uid, "links");
          const publicLinksCollection = collection(db, "links");
          await deleteDoc(doc(userLinksCollection, id));
          await deleteDoc(doc(publicLinksCollection, shortLink));
          resolve();
        } catch (e) {
          console.error("Error deleting document: ", e);
          reject(e);
        }
      });
    });
  }

  export const getLinkById = async (id: string) => {
    return new Promise<LinkDetails | null>((resolve, reject) => {
      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          console.error("User is not authenticated.");
          reject("User is not authenticated.");
          return;
        }
  
        try {
          const userLinksCollection = collection(db, "users", user.uid, "links");
          const doc = await getDocs(userLinksCollection);
          const data = doc.docs.find((doc) => doc.id === id);
  
          if (!data) {
            console.log("No link found.");
            resolve(null);
          } else {
            const linkData = {
              id: data.id,
              name: data.data().name,
              link: data.data().link,
              shortLink: data.data().shortLink,
              clicks: data.data().clicks,
              createdAt: data.data().createdAt,
              customSlug: data.data().customSlug,
              QrCode: data.data().QrCode,
            };
            resolve(linkData);
          }
        } catch (e) {
          console.error("Error getting document: ", e);
          reject(e);
        }
      });
    });
  }




export const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
}

export const redirectLink = async (shortLink: string) => {
    try {
        const publicLinksCollection = collection(db, "links");
        const querySnapshot = await getDocs(publicLinksCollection);
        const data = querySnapshot.docs.find((doc) => doc.id === shortLink);
        const {linkId, userId} = data?.data() as { linkId: string, userId: string };
        const userLinkDoc = doc(db, "users", userId, "links", linkId);

        if (!data) {
          throw new Error("No link found for the given shortLink.");
        }

        updateDoc(userLinkDoc, { clicks: increment(1) });
        console.log("Document updated.");


        let link = data.data().link;

        try {
          new URL(link);
        } catch (e) {
          link = 'http://' + link;
        }
    
        window.location.href = link;
    } catch (e) {
        console.error("Error getting document: ", e);
        throw e;
    }
}












