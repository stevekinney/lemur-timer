import Timer from './timer';

export default (timer) => {
  const element = document.createElement('article');

  const getDueText = () => Math.floor((timer.due - Date.now()) / 1000);

  element.classList.add('timer');
  element.innerHTML = (`
    <h3 class="timer--title">${timer.title}</h3>
    <p class="timer--due">${getDueText()}<p>
    <button class="timer--remove">Remove</button>
  `);

  const dueTimer = element.querySelector('.timer--due');
  const removeButton = element.querySelector('.timer--remove');

  const interval = setInterval(() => {
    dueTimer.textContent = getDueText();
  }, 0);

  const removeEvent = async (event) => {
    try {
      await Timer.remove(timer.id);
      event.target.removeEventListener('click', removeEvent);
      clearInterval(interval);
      element.remove();
    } catch(error) {
      console.error(error);
    }
  };

  removeButton.addEventListener('click', removeEvent);

  return element;
};
