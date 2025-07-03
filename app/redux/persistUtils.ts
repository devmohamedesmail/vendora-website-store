import { persistor } from './store';

// Utility functions for persistence management
export const clearPersistedData = async () => {
  try {
    await persistor.purge();
    console.log('Persisted data cleared successfully');
  } catch (error) {
    console.error('Error clearing persisted data:', error);
  }
};

export const pausePersistence = () => {
  persistor.pause();
};

export const resumePersistence = () => {
  persistor.persist();
};

export const flushPersistence = async () => {
  try {
    await persistor.flush();
    console.log('Persisted data flushed successfully');
  } catch (error) {
    console.error('Error flushing persisted data:', error);
  }
};
