import { getFirestore, collection, addDoc, Timestamp, getDocs, deleteDoc, doc, setDoc, updateDoc, increment, getDoc, query, where  } from 'firebase/firestore';
import { auth } from '../firebase/config'; 
import { nanoid } from 'nanoid';
import { CreateLink, LinkDetails, EditLinkDetails} from './definations';

const db = getFirestore(); 

export const handleCreateShortenLink = async (name: string, link: string, customSlug?: string) => {
  return new Promise<CreateLink>(async (resolve, reject) => {
    const user = auth.currentUser;
    if (!auth.currentUser) {
        reject(new Error("User is not authenticated."));
        return;
    }

    const slugRex = /^[a-zA-Z0-9-_]{5,15}$/;

    if(customSlug && !slugRex.test(customSlug)){
      console.error("Custom Slug is invalid");
      reject(new Error("Custom slug must be 5-15 characters long, contain only letters, numbers, and underscores, and must not contain spaces."));
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
      if (customSlug) {
        const customSlugCollection = collection(db, "customSlugs");
        const customSlugDoc = doc(customSlugCollection, customSlug);
        const customSlugSnapshot = await getDoc(customSlugDoc);

        if (customSlugSnapshot.exists()) {
            console.error("Custom Slug already exists");
            reject(new Error("Custom Slug already exists"));
            return; 
        }
      }
      const userLinksCollection = collection(db, "users", userId ?? "", "links");
      const resp = await addDoc(userLinksCollection, data);
      const publicLinkData = {
        link,
        userId: user?.uid,
        linkId: resp.id ,
      };

      const publicLinksCollection = collection(db, "links");
      await setDoc(doc(publicLinksCollection, data.shortLink), publicLinkData);

      if (customSlug){
        console.log(`Creating document with customSlug: ${customSlug}`);
        const customSlugCollection = collection(db, "customSlugs");
        await setDoc(doc(customSlugCollection, customSlug), publicLinkData);
      }
      resolve(data)
    } catch (e) {
        console.error("Error adding document: ", e);
    }
  });
};

export async function handleGetLinks() {
    return new Promise<LinkDetails[]>((resolve, reject) => {
      auth.onAuthStateChanged(async (user) => {
        if (!user) {
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

export const updateLink = async (id: string, name: string, link: string, shortLink: string, customSlug?: string, prevCustomSlug?: string ) => {
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
        const customSlugCollection = collection(db, "customSlugs");
        
        const slugRex = /^[a-zA-Z0-9-_]{5,15}$/;
        if(customSlug){
          const newCustomSlug = await getDoc(doc(customSlugCollection, customSlug));
          if (newCustomSlug.exists()){
            reject("Custom Slug already exists");
            return;
          }
        }
        if(customSlug && !slugRex.test(customSlug)){
          reject("Custom slug must be 5-15 characters long, contain only letters, numbers, and underscores, and must not contain spaces.");
          return;
        }

        const publicLinkDoc = doc(publicLinksCollection, shortLink);
        const userLinkDoc = doc(userLinksCollection, id);
        await updateDoc(publicLinkDoc, { link });
        await updateDoc(userLinkDoc, { name, link, customSlug });

        await setDoc(doc(customSlugCollection, customSlug),{
          linkId: id,
          userId: user.uid,
          link: link
        })

        await deleteDoc(doc(customSlugCollection, prevCustomSlug));
        
        resolve();
      } catch (e) {
        console.error("Error updating document: ", e);
        reject(e);
      }
    });
  });
}

export const deleteLink = async (id: string, shortLink: string, customSlug?: string) => {
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
        const customSlugCollection = collection(db, "customSlugs");
        await deleteDoc(doc(userLinksCollection, id));
        await deleteDoc(doc(publicLinksCollection, shortLink));
        await deleteDoc(doc(customSlugCollection, customSlug));
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

export const redirectLink = async (slug: string) => {
    try {
        const publicLinksCollection = collection(db, "links");
        const customLinksCollection = collection(db, "customSlugs");
        let querySnapshot = await getDocs(query(publicLinksCollection, where("__name__", "==", slug)));
        let data = querySnapshot.docs[0]?.data();

        if(!data){
          querySnapshot = await getDocs(query(customLinksCollection, where("__name__", "==", slug)));
          data = querySnapshot.docs[0]?.data();
        }

        if (!data) {
          throw new Error("No link found for the given shortLink.");
        }

        const { linkId, userId } = data as { linkId: string, userId: string };
        const userLinkDoc = doc(db, "users", userId, "links", linkId);

        await updateDoc(userLinkDoc, { clicks: increment(1) });
        console.log("Document updated.");


        let link = data.link;

        try {
          new URL(link);
        } catch (e) {
          link = 'https://' + link;
        }
    
        window.location.href = link;
    } catch (e) {
        console.error("Error getting document: ", e);
        throw e;
    }
}

export const getCardData = async () => {
  try {
    const fetchLink = await handleGetLinks();
    const data = await Promise.all([
      fetchLink.reduce((acc, link) => acc + link.clicks, 0),
      fetchLink.length
    ])

    const totalClicks = data[0];
    const totalLinks = data[1];

    return { totalClicks, totalLinks };


  } catch (error) {
    console.error("Error fetching links", error);
    throw new Error("Error fetching links");
  }
}

export const getRecentLinks = async (): Promise<LinkDetails[] > => {
  try {
    const fetchLink = await handleGetLinks();
    const data = await Promise.all([
      fetchLink.sort((a, b) => b?.createdAt?.toDate()?.getTime() - a?.createdAt?.toDate()?.getTime())
    ])
    const recentLinks = data[0].slice(0, 5);
    return recentLinks;
  } catch (error) {
    console.error("Error fetching links", error);
    throw error;
  }
}
