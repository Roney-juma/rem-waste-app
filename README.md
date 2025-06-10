# Skip Location React Test

A modern React application for location-based services with skip functionality, built with performance and user experience in mind.

## 🚀 Features

- **Location Services**: Real-time location tracking and management
- **Skip Functionality**: Smart location skipping with customizable criteria
- **Interactive Maps**: Dynamic map integration with location markers
- **Responsive Design**: Mobile-first approach with cross-device compatibility
- **Real-time Updates**: Live location updates and notifications
- **User Preferences**: Customizable location settings and skip preferences
- **Offline Support**: Basic functionality available without internet connection

## 🛠️ Tech Stack

- **Frontend**: React 18+ with modern hooks
- **Styling**: CSS3 / Styled Components / Tailwind CSS
- **Maps**: Google Maps API / Mapbox / Leaflet
- **Location Services**: Geolocation API / GPS tracking
- **State Management**: React Context / Redux Toolkit
- **HTTP Client**: Axios / Fetch API
- **Build Tool**: Vite / Create React App
- **Testing**: Jest + React Testing Library

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (version 16.0 or higher)
- npm or yarn package manager
- Modern web browser with geolocation support
- API keys for map services (Google Maps/Mapbox)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Roney-juma/rem-waste-app.git
   cd rem-waste-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys to `.env.local`:
   ```env
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   REACT_APP_MAPBOX_TOKEN=your_mapbox_token
   REACT_APP_API_BASE_URL=http://localhost:3001
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
rem-waste-app/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   │   ├── ErrorScreen.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   └── ProgressSteps.jsx
|   |   |   ├── SkipCard.jsx
|   |   |   ├── SkipOverlay.jsx
│   ├── utils/
│   │   └── helpers.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── components/
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── package.json
├── README.md
└── .env.example
```

## 🎯 Usage

### Basic Location Tracking

```jsx
import { useGeolocation } from './hooks/useGeolocation';

function LocationComponent() {
  const { location, error, loading } = useGeolocation();
  
  return (
    <div>
      {loading && <p>Getting your location...</p>}
      {error && <p>Error: {error.message}</p>}
      {location && (
        <p>
          Lat: {location.latitude}, Lng: {location.longitude}
        </p>
      )}
    </div>
  );
}
```

### Skip Location Functionality

```jsx
import { useSkipLocation } from './hooks/useSkipLocation';

function SkipLocationComponent() {
  const { skipLocation, canSkip, skipCount } = useSkipLocation();
  
  const handleSkip = () => {
    skipLocation('User requested skip');
  };
  
  return (
    <button 
      onClick={handleSkip} 
      disabled={!canSkip}
    >
      Skip Location ({skipCount} skips remaining)
    </button>
  );
}
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test LocationComponent.test.js
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Set environment variables in Netlify dashboard

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_GOOGLE_MAPS_API_KEY` | Google Maps API key | Yes |
| `REACT_APP_MAPBOX_TOKEN` | Mapbox access token | Optional |
| `REACT_APP_API_BASE_URL` | Backend API URL | Yes |
| `REACT_APP_SKIP_LIMIT` | Maximum skips per session | No |

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 16+
- Mobile browsers with geolocation support

## 🐛 Troubleshooting

### Common Issues

**Location not working:**
- Ensure HTTPS is enabled (required for geolocation)
- Check browser permissions for location access
- Verify API keys are correctly configured

**Map not loading:**
- Verify API keys in environment variables
- Check network connectivity
- Ensure proper CORS configuration

**Build errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Verify all dependencies are installed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

### Development Guidelines

- Follow ESLint configuration
- Write tests for new features
- Update documentation for API changes
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Google Maps API for location services
- React community for excellent documentation
- Contributors and testers

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs)
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
