# Development Guide - AR Furniture App

This guide helps developers set up and work with the AR Furniture App.

## 🛠️ Development Setup

### Prerequisites

1. **Node.js** (v18 or higher)
2. **React Native CLI**: `npm install -g @react-native-community/cli`
3. **Watchman** (for file watching): `brew install watchman`

### Platform-Specific Setup

#### iOS Development (macOS only)
1. **Xcode** (latest version from App Store)
2. **CocoaPods**: `sudo gem install cocoapods`
3. **iOS Simulator** (comes with Xcode)

#### Android Development
1. **Android Studio** with Android SDK
2. **Java Development Kit (JDK)** 17 or 11
3. **Android Virtual Device (AVD)** or physical device

### Environment Configuration

1. Set up your development environment:
```bash
npx react-native doctor
```

2. Install dependencies:
```bash
npm install
```

3. For iOS, install pods:
```bash
cd ios && pod install && cd ..
```

## 🚀 Running the App

### Start Metro Bundler
```bash
npm start
```

### Run on iOS
```bash
npm run ios
```

### Run on Android
```bash
npm run android
```

### Development Scripts
- `npm run reset-cache` - Clear Metro cache
- `npm run doctor` - Check environment setup
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 🏗️ Architecture

### Component Structure
```
src/
├── screens/           # Main app screens
├── components/        # Reusable UI components
├── models/           # TypeScript interfaces
└── utils/            # Utility functions and data
```

### State Management
- Uses React Hooks for local state
- Context API for global state (if needed)
- No external state management library

### AR Implementation
- **Current**: Simulated AR for development
- **Production**: Integrate ARKit (iOS) / ARCore (Android)

## 🎨 UI/UX Guidelines

### Design Principles
- **Minimalist**: Clean, uncluttered AR interface
- **Intuitive**: Self-explanatory interactions
- **Accessible**: Support for different abilities
- **Responsive**: Works on various screen sizes

### Color Scheme
- **Primary**: #007AFF (iOS Blue)
- **Secondary**: #34C759 (Green)
- **Warning**: #FF9500 (Orange)
- **Error**: #FF3B30 (Red)
- **Background**: #000000 (Black for AR)

### Typography
- **Primary**: System font (San Francisco on iOS, Roboto on Android)
- **Sizes**: 12px (small), 16px (body), 20px (heading), 32px (title)

## 🔧 Development Tools

### Recommended VS Code Extensions
- **React Native Tools** - Debugging and IntelliSense
- **ES7+ React/Redux/React-Native snippets** - Code snippets
- **Prettier** - Code formatting
- **ESLint** - Code linting
- **Auto Rename Tag** - HTML/JSX tag editing

### Debugging
1. **React Native Debugger**: External debugging tool
2. **Flipper**: Mobile app debugger from Facebook
3. **VS Code Debugger**: Built-in debugging support

### Performance Monitoring
- **Flipper**: Monitor performance metrics
- **React DevTools**: Component tree inspection
- **Memory Profiler**: Check for memory leaks

## 🧪 Testing

### Testing Strategy
- **Unit Tests**: Individual component testing
- **Integration Tests**: Component interaction testing
- **E2E Tests**: Full user flow testing

### Testing Tools
- **Jest**: Unit and integration testing
- **React Native Testing Library**: Component testing
- **Detox**: E2E testing (optional)

### Running Tests
```bash
npm test              # Run all tests
npm test -- --watch  # Watch mode for development
npm test -- --coverage # Test coverage report
```

## 📱 Platform Considerations

### iOS Specific
- **ARKit**: Native AR framework
- **Metal**: Graphics performance
- **Core ML**: Machine learning integration
- **App Store**: Distribution guidelines

### Android Specific
- **ARCore**: Google's AR platform
- **OpenGL ES**: Graphics rendering
- **TensorFlow Lite**: AI integration
- **Play Store**: Distribution requirements

## 🚀 Performance Optimization

### Bundle Size
- Use only necessary dependencies
- Implement code splitting where possible
- Optimize images and 3D models

### Runtime Performance
- Use `useCallback` and `useMemo` for expensive operations
- Implement virtualization for large lists
- Optimize animations with native driver

### Memory Management
- Proper cleanup in `useEffect`
- Release AR resources when not needed
- Monitor texture and model memory usage

## 🐛 Common Issues & Solutions

### Metro Bundle Issues
```bash
npm run reset-cache
rm -rf node_modules && npm install
```

### iOS Build Issues
```bash
cd ios && pod install --repo-update
```

### Android Build Issues
```bash
cd android && ./gradlew clean
```

### Type Errors
- Check TypeScript configuration
- Update @types packages
- Use proper type annotations

## 🔐 Security Considerations

### Camera Permissions
- Request permissions gracefully
- Explain why permissions are needed
- Handle permission denials

### Data Privacy
- No biometric data collection
- Local processing when possible
- Clear privacy policy

### 3D Model Security
- Validate model file formats
- Sanitize user inputs
- Secure model download URLs

## 📦 Building for Production

### iOS Production Build
1. Open Xcode project
2. Select "Generic iOS Device"
3. Product → Archive
4. Distribute to App Store

### Android Production Build
```bash
cd android
./gradlew assembleRelease
```

### Release Checklist
- [ ] Update version numbers
- [ ] Test on real devices
- [ ] Performance optimization
- [ ] Security review
- [ ] App store compliance

## 📈 Monitoring & Analytics

### Crash Reporting
- Integrate Crashlytics or Sentry
- Monitor AR-specific crashes
- Track performance metrics

### Usage Analytics
- Track furniture placement patterns
- Monitor user engagement
- A/B test new features

## 🤝 Contributing

### Code Style
- Use Prettier for formatting
- Follow ESLint rules
- Write meaningful commit messages
- Add JSDoc comments for complex functions

### Pull Request Process
1. Create feature branch
2. Write tests for new features
3. Update documentation
4. Request code review
5. Merge after approval

---

Happy coding! 🚀
