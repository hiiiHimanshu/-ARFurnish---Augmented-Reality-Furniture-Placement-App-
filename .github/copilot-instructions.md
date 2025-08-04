<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# AR Furniture App - Copilot Instructions

This is a React Native AR (Augmented Reality) furniture placement application that allows users to:

## Core Features
- **3D Furniture Placement**: Users can place 3D furniture models in their real environment
- **Plane Detection**: Detects horizontal and vertical surfaces for furniture placement
- **Object Scaling**: Scale furniture items up or down to fit the space
- **Object Rotation**: Rotate furniture items to desired orientations
- **Object Occlusion**: Simulates real-world occlusion where furniture can be hidden behind real objects
- **Custom 3D Library**: Includes a curated library of furniture models

## Technology Stack
- **Framework**: React Native (TypeScript)
- **AR Technology**: Custom AR implementation with simulated camera feed
- **3D Rendering**: Simplified 3D representation using React Native components
- **State Management**: React Hooks (useState, useRef, useEffect)
- **Animation**: React Native Animated API
- **UI Components**: Custom components for furniture selection and control panels

## Project Structure
- `src/screens/ARFurnitureScreen.tsx` - Main AR screen with camera and furniture placement
- `src/components/FurnitureSelector.tsx` - Furniture library browser and selector
- `src/components/ControlPanel.tsx` - Controls for scaling, rotating, and deleting placed furniture
- `src/components/ARRenderer.tsx` - AR view renderer with plane detection simulation
- `src/models/FurnitureItem.ts` - TypeScript interfaces for furniture items
- `src/utils/FurnitureLibrary.ts` - Furniture catalog with predefined items
- `assets/models/` - 3D model files (GLB format)

## Key Components

### ARFurnitureScreen
- Main coordinator component
- Handles permissions and AR session management
- Manages placed furniture state
- Coordinates between selector, renderer, and control panel

### FurnitureSelector
- Modal-based furniture browser
- Category filtering (chairs, tables, sofas, etc.)
- Thumbnail grid display
- Selection state management

### ControlPanel
- Slider-based scale control (0.5x to 3.0x)
- Rotation control (0° to 360°)
- Quick preset buttons
- Delete functionality

### ARRenderer
- Simulated camera background
- Plane detection visualization with grid overlay
- 3D to 2D coordinate conversion
- Touch interaction handling
- Furniture item rendering with shadows

## Development Guidelines

### Code Style
- Use TypeScript with strict typing
- Follow React Native best practices
- Use functional components with hooks
- Implement proper error handling
- Add loading states for better UX

### AR Implementation
- This is a simplified AR implementation for demonstration
- Real-world AR would use ARKit (iOS) or ARCore (Android)
- Plane detection is simulated with a 2-second delay
- Furniture placement uses screen coordinates converted to 3D positions

### Performance Considerations
- Use React.memo for expensive components
- Implement virtualization for large furniture lists
- Optimize animations with useNativeDriver
- Lazy load 3D models when needed

### Testing
- Test on both iOS and Android platforms
- Verify permission handling
- Test furniture placement accuracy
- Validate scaling and rotation functions

When working on this project, focus on:
1. Maintaining clean separation between AR logic and UI components
2. Ensuring smooth animations and interactions
3. Proper TypeScript typing for all components
4. Responsive design for different screen sizes
5. Accessibility features for AR interactions
