import EventEmitter from 'events';

// Create a singleton event emitter
const bookmarkEvents = new EventEmitter();

// Export constants for event names
export const BOOKMARK_CHANGED = 'bookmark_changed';

export default bookmarkEvents;
