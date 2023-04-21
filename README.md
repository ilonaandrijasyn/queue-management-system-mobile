# Queue managing mobile application

This is a React Native and Expo application which is a part of a queue managing system.
It is intended to be used by all the people who want to watch the queue realtime
or generate the ticket to the queue through the app.
It is done for Android nad iOS.

## Development
To run the app in dev mode install dependencies first with yarn or npm, then start the server.

```bash
yarn install
yarn run start
```
It will generate QR code which you can read with your phone and open the app with
Expo Go.

To debug the application install React Native Debugger. Then open it through console with
```
react-native-debugger --no-sanbox
```
You can enable network by right-clicking the mouse and choosing "Enable network inspect".

## Build
Build can be done with EAS build.

First install EAS CLI.

```bash
npm install -g eas-cli
```

Then login to your Expo account.
```bash
eas login
```

Configure the project for build.
```bash
eas build:configure
```

Run the build for Android.
```bash
eas build --platform android
```

Configuration is done in eas.json file.
To build the .apk file run
```bash
eas build --platform android --profile preview
```
And read the generated QR code with the file path.

Build for iOS can be done with
```bash
eas build --platform ios
```
but paid Apple Developer Program is needed.

## Other
To lint the app run
```bash
yarn run lint
```