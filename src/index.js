if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./worker.js')
      .then(registration => {
        console.log('Registration successful');
      })
      .catch(error => {
        console.error('Registration failed', error);
      });
  });
}
