import renderTimerElement from './render-timer-element';
import addElementToTimersSection from './append-timer-element';

export default fetchTimers = window.fetchTimers = async () => {
  const timers = await Timer.findAll();
  return timers.map(renderTimerElement).forEach(addElementToTimersSection);
};
