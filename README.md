# AR Furniture App

An innovative React Native mobile application that allows users to place and scale 3D furniture models in their real environment using Augmented Reality (AR) technology.

## 🌟 Features

- **🏠 Real-time Plane Detection**: Automatically detects horizontal and vertical surfaces for furniture placement
- **📐 Object Scaling & Rotation**: Scale furniture from 0.5x to 3.0x and rotate 360 degrees
- **🪑 Custom 3D Furniture Library**: Curated collection of furniture including chairs, tables, sofas, desks, beds, and decorations
- **🔍 Object Occlusion Simulation**: Realistic furniture placement with depth perception
- **📱 Cross-platform**: Works on both iOS and Android devices
- **🎨 Intuitive UI**: Easy-to-use furniture selector and control panels

## 🏗️ Technology Stack

- **Framework**: React Native with TypeScript
- **AR Technology**: Custom AR implementation with simulated camera feed
- **Animation**: React Native Animated API
- **State Management**: React Hooks
- **UI Components**: Custom-built components optimized for AR interactions

## 🚀 Getting Started

### Prerequisites

Make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Installation

1. Clone the repository and navigate to the project directory
2. Install dependencies:

```bash
npm install
```

3. For iOS (macOS only):
```bash
cd ios
pod install
cd ..
```

### Running the App

#### Start Metro Server

```bash
npm start
```

#### Run on Android

```bash
npm run android
```

#### Run on iOS

```bash
npm run ios
```

## 📱 How to Use

1. **Launch the App**: Open the AR Furniture App
2. **Grant Permissions**: Allow camera access for AR features
3. **Start AR Session**: Tap "Start AR Experience"
4. **Detect Surfaces**: Move your device to scan for flat surfaces
5. **Select Furniture**: Tap the furniture icon to browse the catalog
6. **Place Items**: Select furniture and tap on detected surfaces to place
7. **Edit Furniture**: Tap placed items to scale, rotate, or delete them

## 🎯 Core Components

### ARFurnitureScreen
- Main AR interface with camera integration
- Manages AR session and furniture placement
- Coordinates all AR interactions

### FurnitureSelector
- Modal-based furniture catalog browser
- Category filtering and search
- Thumbnail grid with furniture details

### ControlPanel
- Slider controls for scaling (0.5x - 3.0x)
- Rotation wheel (0° - 360°)
- Quick preset buttons
- Delete functionality

### ARRenderer
- AR view with simulated camera feed
- Plane detection visualization
- 3D furniture rendering
- Touch interaction handling

## 📁 Project Structure

```
src/
├── screens/
│   └── ARFurnitureScreen.tsx    # Main AR screen
├── components/
│   ├── FurnitureSelector.tsx    # Furniture catalog browser
│   ├── ControlPanel.tsx         # Furniture editing controls
│   └── ARRenderer.tsx           # AR rendering engine
├── models/
│   └── FurnitureItem.ts         # TypeScript interfaces
└── utils/
    └── FurnitureLibrary.ts      # Furniture catalog data

assets/
└── models/                      # 3D furniture models (GLB format)
```

## 🎨 Furniture Categories

- **Chairs**: Modern chairs, office chairs, dining chairs
- **Tables**: Dining tables, coffee tables, side tables
- **Sofas**: Sectional sofas, loveseats, recliners
- **Desks**: Office desks, writing desks, standing desks
- **Beds**: Queen beds, king beds, bunk beds
- **Cabinets**: Storage cabinets, wardrobes, bookcases
- **Decorations**: Floor lamps, plants, artwork

## 🔧 Configuration

The app uses a simulated AR environment for demonstration. For production use with real AR capabilities, integrate:

- **iOS**: ARKit framework
- **Android**: ARCore SDK
- **3D Models**: GLB/GLTF format support
- **Real Camera**: react-native-vision-camera

## 🎯 Performance Features

- **Optimized Rendering**: Efficient 3D-to-2D projection
- **Smooth Animations**: Native driver animations
- **Memory Management**: Proper cleanup of AR resources
- **Touch Optimization**: Debounced touch interactions

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**: Run `npx react-native start --reset-cache`
2. **iOS build errors**: Clean build folder in Xcode
3. **Android build errors**: Run `cd android && ./gradlew clean`
4. **Permission issues**: Check camera permissions in device settings

### Development Tips

- Use a physical device for best AR experience
- Ensure good lighting for plane detection
- Test on multiple device orientations
- Validate furniture scaling in different room sizes

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section
- Review React Native documentation

---

Built with ❤️ using React Native and AR technology

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
