import database from './database';

export default Timer = window.Timer = {
  async create(timer) {
    const db = await database;
    const transaction = db.transaction(['timer'], 'readwrite');

    return new Promise((resolve, reject) => {
      transaction.onerror = reject;

      const objectStoreRequest = transaction.objectStore('timer').add(timer);

      objectStoreRequest.onerror = reject;
      objectStoreRequest.onsuccess = (event) => {
        const id = event.target.result;
        resolve(Object.assign({ id }, timer));
      };
    });
  },
  async findAll() {
    const db = await database;
    const objectStore = db.transaction('timer').objectStore('timer');

    return new Promise((resolve, reject) => {
      const openCursor = objectStore.openCursor();
      let timers = [];

      openCursor.onsuccess = (event) => {
        const cursor = event.target.result;
        if (!cursor) { return resolve(timers); }
        timers = [...timers, cursor.value];
        cursor.continue();
      }

      openCursor.onerror = reject;
    });
  },
  async remove(id) {
    const db = await database;
    const transaction = db.transaction(['timer'], 'readwrite');

    return new Promise((resolve, reject) => {
      const objectStoreRequest = transaction.objectStore('timer').delete(id);

      objectStoreRequest.onerror = reject;
      objectStoreRequest.onsuccess = (event) => {
        resolve(event.target.result);
      };
    });
  }
};
