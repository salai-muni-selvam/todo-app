import { openDB, deleteDB } from "idb";

const dbName = "todoApp";
const authStore = "authCredentials";

export async function openDatabase() {
  return await openDB(dbName, 1, {
    upgrade(db) {
      db.createObjectStore(authStore, { keyPath: "username" });
    },
  });
}

export async function saveCredentials(username, password) {
  const db = await openDatabase();
  const tx = db.transaction(authStore, "readwrite");
  const store = tx.objectStore(authStore);
  await store.put({ username, password });
  await tx.done;
}

export async function getCredentials(username) {
  const db = await openDatabase();
  const tx = db.transaction(authStore, "readonly");
  const store = tx.objectStore(authStore);
  const credentials = await store.get(username);
  await tx.done;
  return credentials;
}

export async function deleteDatabase() {
  return await deleteDB(dbName);
}
