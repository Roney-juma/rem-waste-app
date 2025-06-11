# Skip React Test

A React application for REMWaste Test Interview with skip functionality, built with performance and user experience in mind.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with cross-device compatibility

## 🛠️ Tech Stack

- **Frontend**: React 18+ with modern hooks
- **Styling**: CSS3 / Styled Components / Tailwind CSS
- **State Management**: React Context / Redux Toolkit
- **HTTP Client**: Axios API
- **Build Tool**: Vite / Create React App
- **Testing**: Jest + React Testing Library

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (version 18.0 or higher)
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
   REACT_APP_REMWASTE_API_BASE_URL = 'https://app.wewantwaste.co.uk'
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
npm test StupTests.js
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```


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
| `REACT_APP_REMWASTE_API_BASE_URL` | Backend API URL | Yes |

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 16+
- Mobile browsers with geolocation support

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

- **Roney Juma** - [Roney-Juma](https://github.com/Roney-juma)

## Live Demo

- Live demo: https://orange-computing-machine-p6jwg6rv54729464-3000.app.github.dev/
- Note: If the link is inactive, please go to https://orange-computing-machine-p6jwg6rv54729464.github.dev/ and run npm start to restart the app.
