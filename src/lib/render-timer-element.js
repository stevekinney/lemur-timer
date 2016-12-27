import Timer from './timer';

export default (timer) => {
  const element = document.createElement('article');

  element.classList.add('timer');
  element.innerHTML = (`
    <h3>${timer.title}</h3>
    <p>${timer.due}<p>
    <button class="remove-timer">Remove</button>
  `);

  const removeButton = element.querySelector('.remove-timer');

  const removeEvent = (event) => {
    Timer.remove(timer.id)
         .then(() => {
           event.target.removeEventListener('click', removeEvent);
           element.remove();
         })
         .catch(console.error);
  };

  removeButton.addEventListener('click', removeEvent);

  return element;
};
