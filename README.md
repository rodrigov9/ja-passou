![](./.github/feature.png)

<h1 align="center">Já Passou? (Has it passed?)</h1>

<p align="center">A mobile app that provides real-time train schedules and delay information for the Portuguese railway network.</p>

<div align="center">
  <a href="./LICENSE">
    <img alt="LICENSE: MIT" src="https://img.shields.io/badge/license-MIT-06b6d4?style=for-the-badge" />
  </a>
</div>

<br />

## Features

- 🕐 Real-time data from an official source (Infraestruturas de Portugal)
- 🚂 Departures and arrivals by station
- ⚠️ Delays and suppressions
- 🌙 Dark Mode

## Installation

### Android

The app is currently in closed testing. Google requires new apps to run a closed test with at least 12 testers, for at least 14 days. If you want to help, follow this steps:

1. Join the Google Group: https://groups.google.com/g/japassou-alpha
2. Join the closed test: https://play.google.com/apps/testing/dev.rvitorino.japassou
3. Install the app: https://play.google.com/store/apps/details?id=dev.rvitorino.japassou

### iOS

Building for iOS requires a paid Apple Developer membership that I can not currently afford, but you can [build the app yourself](#building-for-production).

## Tech stack

- Expo + React Native + Expo Router
- TanStack Query for data fetching and caching
- Uniwind (Tailwind CSS) for styling

## Roadmap

- [x] ⭐ Favorite stations
- [ ] 🪪 Get train status from service id and date
- [ ] 🏷️ Filter station services by type
- [ ] 📜 OSS licenses page
- [ ] 🌐 English translation
- [ ] 🔎 Internal stations list for better search
  - [ ] 🗺️ Stations map and closest station

## Contributing

### 1. Installation

Clone the repository and install the dependencies

```bash
git clone https://github.com/rodrigov9/ja-passou.git
cd ja-passou
pnpm install
```

### 2. Development build

To develop the app, you'll need to create a development client and install it on your device or emulator.

> If you add a library that contains native code APIs, for example, `expo-secure-store`, you will have to rebuild the development client

#### Build locally

> Requires Android Studio for building to Android and Xcode for building to iOS.

```bash
pnpm prebuild
pnpm android # or pnpm ios
```

#### Build on the cloud with [EAS Build](https://expo.dev/eas)

> ⚠️ Building on the cloud requires linking a new project to the code with `eas init`. This will change the projectId on the app config. **DO NOT COMMIT THAT CHANGE WHEN MAKING A PULL REQUEST**

```bash
eas build --profile development
```

### 3. Start the project

```bash
pnpm start
```

## Building for production

Clone the repository and install the dependencies

```bash
git clone https://github.com/rodrigov9/ja-passou.git
cd ja-passou
pnpm install
```

### Build locally

> Requires Android Studio for building to Android and Xcode for building to iOS.

Regenerate the `android` and `ios` folders with production settings

```bash
pnpm expo prebuild --clean
```

Build the app locally

```bash
pnpm expo run:android --variant release
# or
pnpm expo run:ios --configuration Release
```

> Note: using the scripts from package.json (`pnpm prebuild` and `pnpm android`/`pnpm ios`) will build the app with the debug name, id and icon.

### Build on the cloud with [EAS Build](https://expo.dev/eas)

> ⚠️ Building on the cloud requires linking a new project to the code with `eas init`. This will change the projectId on the app config. **DO NOT COMMIT THAT CHANGE WHEN MAKING A PULL REQUEST**

```bash
eas build --profile preview
```

## Disclaimer

All data regarding train schedules and delays is provided by [Infraestruturas de Portugal](https://servicos.infraestruturasdeportugal.pt/pt-pt/horarios), and is therefore their responsibility and may contain errors. This app has no affiliation with Infraestruturas de Portugal, Comboios de Portugal (CP), Fertagus, or any other entity responsible for the services presented.

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.
