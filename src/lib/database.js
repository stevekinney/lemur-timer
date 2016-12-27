module.exports = new Promise((resolve, reject) => {
  const request = indexedDB.open('LemurTimer', 1);

  request.addEventListener('error', reject);
  request.addEventListener('success', (event) => {
    resolve(event.target.result, request);
  });

  request.addEventListener('upgradeneeded', (event) => {
    console.log('Upgrading database…');
    const database = event.target.result;

    if (!database.objectStoreNames.contains('timer')) {
      const objectStore = database.createObjectStore('timer', {
        keyPath: 'id',
        autoIncrement: true
      });

      objectStore.createIndex('title', 'title', { unique: false });
      objectStore.createIndex('due', 'due', { unique: false });
    }
  });
});
