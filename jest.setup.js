// jest.setup.js
import { ToastAndroid } from 'react-native';

// 1. Mock react-native-firebase
jest.mock('@react-native-firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: 'test-user-id' },
  })),
}));

jest.mock('@react-native-firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(() => Promise.resolve()),
  FieldValue: {
    serverTimestamp: jest.fn(() => 'mock-timestamp'),
  },
}));

// 2. Mock the step counter package
jest.mock('@dongminyu/react-native-step-counter', () => ({
  isStepCountingSupported: jest.fn(() => Promise.resolve({ supported: true, granted: true })),
  startStepCounterUpdate: jest.fn(),
  stopStepCounterUpdate: jest.fn(),
}));

// 3. Mock ToastAndroid native methods
if (!ToastAndroid.showWithGravity) {
  ToastAndroid.showWithGravity = jest.fn();
}