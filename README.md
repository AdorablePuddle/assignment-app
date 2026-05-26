# Puddle's StepApp
This repository is for those who would like to install and build the application themselves. Release builds are delivered separately.

## I. Prerequisites
Installing dependencies:
```sh
npm install
```

### 1. Development Build

Before building the app, you need the `google-service.json` file provided by the firebase console. Place the file into the "key" folder (if the folder does not exist, create it yourself).

To build the app, you need the Android SDK of 26 or higher. The Android SDK can be installed from the Android Studio installer. The process for building the application locally is provided below, assuming that you had installed the Android SDK and the environment variable for ANDROID_HOME:

Prebuild:
```sh
npx expo prebuild --clean
```

Once prebuild is done, plug your android device into the machine you use to build and run the following command:
```sh
npx expo run:android
```

### 2. Release Build

To build the app in production mode, you require the same Android SDK from the above section.

Prebuild:
```sh
npx expo prebuild --clean
```

Once prebuild is done, execute the following commands:
```sh
cd android
gradlew assembleRelease
```

Your build will be located in \android\app\build\outputs\apk\release\app-release.apk

## II. Documentation
The application utilizes a number of libraries:
- expo-router
- expo-secure-store
- @react-native-firebase/app
- @react-native-firebase/auth
- expo-build-properties
- @dongminyu/react-native-step-counter
- expo-linear-gradient

It is recommended to check their documentation out for further explanation on exactly what each of them do. In short, expo-router is used for application navigation, expo-secure-store for user-specific data (example: theme selection), react-native-firebase is used for firestore usage and authentication using email / password. react-native-step-counter in place of expo-sensor for step counting and expo-linear-gradient is used for background.

The main application folder structure is as such:
```
src / app
      | (auth) // The authentication flow
      | | _layout.tsx
      | | login.tsx
      | | register.tsx
      | (tabs) // The main application flow
      | | _layout.tsx
      | | index.tsx
      | | preference.tsx
      | | tracking.tsx
      | assets // Extra assets
      | | images
      | | | distance_light.png
      | | | top_light.png
      | stylesheet // Theme-specific stylesheets
      | | dark.ts
      | | light.ts
      | _layout.tsx // Handling main navigations
      | +not-found.tsx
```
