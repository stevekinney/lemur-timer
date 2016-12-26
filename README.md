# Lemur Timer

A little reminder timer built with the following goals:

- Use [Service Workers][sw] to run in the background.
- Use [IndexDB][idb] to keep track of reminders.
- Use the [Notifications API][not] to alert users when the timer has experied.
- Weigh less than [10 kilobytes][10k].

[sw]: https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
[idb]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[not]: https://developer.mozilla.org/en-US/docs/Web/API/notification
[10k]: https://a-k-apart.com/
