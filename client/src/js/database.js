import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  //initDB
  //we have to make a connection to db
  const dbJate = await openDB('jate', 1);
  //open up a transaction with an grant permissions of read/write
  const trans = dbJate.transaction('jate', "readwrite");
  //then connect to object store

  const jateStore = trans.objectStore('jate');

  const request = jateStore.put({id: 1, value: content });

  const response = await request;
  console.log(response);
  
  //then we can call whatever
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    //we have to make a connection to db
    const dbJate = await openDB('jate', 1);
    //open up a transaction with an grant permissions of read/write
    const trans = dbJate.transaction('jate', "read");
    //then connect to object store
  
    const jateStore = trans.objectStore('jate');
  
    const request = jateStore.get(1);
  
    const response = await request;
    console.log(response);
    
}

initdb();
