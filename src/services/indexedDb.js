import { openDB, deleteDB } from "idb";

const authDb = "authDatabase";
const authStore = "authCredentials";

const todoDb = "todoDatabase";

export async function openAuthDatabase() {
  return await openDB(authDb, 1, {
    upgrade(db) {
      db.createObjectStore(authStore, { keyPath: "username" });
    },
  });
}

export async function saveCredentials(username, password) {
  const db = await openAuthDatabase();
  const tx = db.transaction(authStore, "readwrite");
  const store = tx.objectStore(authStore);
  await store.put({ username, password });
  await tx.done;
}

export async function getCredentials(username) {
  const db = await openAuthDatabase();
  const tx = db.transaction(authStore, "readonly");
  const store = tx.objectStore(authStore);
  const credentials = await store.get(username);
  await tx.done;
  return credentials;
}

export async function deleteDatabase() {
  await deleteDB(todoDb);
  return await deleteDB(authDb);
}

// todo
export async function openTodoDatabase(username) {
  return await openDB(`${todoDb}_${username}`, 1, {
    upgrade(db) {
      db.createObjectStore(username, { keyPath: "id", autoIncrement: true });
    },
  });
}

// add and update
export async function addtodo(todos, username) {
  const db = await openTodoDatabase(username);
  const tx = db.transaction(username, "readwrite");
  const store = tx.objectStore(username);
  if (Array.isArray(todos)) {
    for (const todo of todos) {
      await store.put(todo);
    }
  } else {
    await store.put(todos);
  }
  await tx.done;
}

export async function deleteTodo(todoId, username) {
  const db = await openTodoDatabase(username);
  const tx = db.transaction(username, "readwrite");
  const store = tx.objectStore(username);
  if (Array.isArray(todoId)) {
    for (const key of todoId) {
      await store.delete(key);
    }
  } else {
    await store.delete(todoId);
  }
  await tx.done;
}

export async function getAllTodos(username) {
  const db = await openTodoDatabase(username);
  const tx = db.transaction(username, "readwrite");
  const store = tx.objectStore(username);
  const todos = await store.getAll();
  await tx.done;
  return todos;
}
