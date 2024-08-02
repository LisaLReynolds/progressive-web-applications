import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  // initDB
  //1.make connection to db
  const dbJate = await openDB("jate", 1);
  //2. open up a transaction with an grant permission of read/write
  const trans = dbJate.transaction("jate", "readwrite");
  const jateStore = trans.objectStore("jate");
  const request = jateStore.put({ id: 1, value: content });

  const response = await request;
  console.log(response);

  //3. then going to connect to object store
  //4. then call whatever
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const dbJate = await openDB("jate", 1);

  const trans = dbJate.transaction("jate", "readonly");

  const jateStore = trans.objectStore("jate");

  const request = jateStore.get(1);

  const response = await request;
  console.log(response);
};

initdb();