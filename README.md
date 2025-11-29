# HealthAI Guardian 🏥

A comprehensive AI-powered healthcare platform featuring predictive analytics, symptom checking, MRI analysis, mental health support, and personalized health plans. Built with modern web technologies and designed with a sleek black and light blue theme.

## ✨ Features

### 🔐 Authentication
- Secure user authentication with email/password
- Protected routes for authenticated users
- Session management with React Context

### 📊 Dashboard
- Real-time health metrics visualization
- Vital signs monitoring (Heart Rate, Blood Pressure, Blood Sugar, Temperature)
- Interactive progress rings and charts
- Quick access to all health features

### 🩺 Health Analysis Tools
- **Symptom Checker**: AI-powered symptom analysis and recommendations
- **Predictive Analytics**: Health predictions using machine learning models
  - Diabetes risk assessment
  - Stress level analysis
  - Custom health metrics tracking
- **MRI Analysis**: Upload and analyze medical imaging
- **Face Analysis**: Facial recognition for health indicators

### 💬 AI ChatBot
- Intelligent health assistant
- Medical query support
- 24/7 availability

### 🎯 Wellness Features
- **Personalized Health Plans**: Custom diet and exercise recommendations
- **Cognitive Games**: Brain training and mental fitness exercises
- **Stress Relief Games**: Relaxation and mindfulness activities

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **React Router** for navigation
- **TanStack Query** for data fetching and state management

### UI Components
- **shadcn/ui** - High-quality, accessible component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icon system

### Design System
- Custom black and light blue color palette
- Light and dark mode support
- Responsive design for all devices
- Glass morphism effects

### Data Visualization
- **Recharts** - Interactive charts and graphs
- Custom progress rings and vital cards

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd healthai-guardian-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
healthai-guardian/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── dashboard/   # Dashboard-specific components
│   │   ├── layout/      # Layout components (AppLayout, Sidebar)
│   │   └── ui/          # shadcn/ui components
│   ├── contexts/        # React contexts (Auth, Theme)
│   ├── data/            # Dataset files (CSV)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities and helpers
│   ├── pages/           # Page components
│   ├── App.tsx          # Root component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles and theme
├── package.json
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## 🎨 Theme Customization

The application uses a custom black and light blue theme defined in `src/index.css`:

### Light Mode
- Background: Very light blue (`hsl(205 100% 97%)`)
- Foreground: Near-black (`hsl(215 25% 12%)`)
- Primary: Light blue (`hsl(199 90% 55%)`)
- Accent: Bright light blue (`hsl(199 95% 60%)`)

### Dark Mode
- Background: Deep near-black (`hsl(220 15% 6%)`)
- Foreground: Off-white (`hsl(210 40% 98%)`)
- Primary: Vibrant light blue (`hsl(199 95% 60%)`)
- Cards: Dark gray-black (`hsl(220 16% 10%)`)

To customize colors, edit the CSS variables in `src/index.css`.

## 📊 Available Datasets

The application includes sample datasets for analysis:
- `diabetes_dataset.csv` - Diabetes risk factors
- `mri_dataset.csv` - Medical imaging data
- `stress_dataset.csv` - Stress level indicators

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run build:dev` | Build development bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

## 🧩 Key Components

### Protected Routes
All health features require authentication. The `ProtectedRoute` component handles authorization.

### AppLayout
Main layout component with:
- Responsive sidebar navigation
- Header with theme toggle
- Mobile-friendly menu

### Dashboard Cards
- `VitalCard`: Display health metrics
- `ProgressRing`: Circular progress indicators
- Custom charts with Recharts

## 🔐 Authentication Flow

1. User visits the app
2. Redirected to `/auth` if not authenticated
3. Login with credentials
4. Access to all protected routes
5. Session persists in context

## 🌐 Routing Structure

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Index | Landing page |
| `/auth` | Auth | Login/Register |
| `/dashboard` | Dashboard | Main dashboard |
| `/symptom-checker` | SymptomChecker | Symptom analysis |
| `/predictive-analytics` | PredictiveAnalytics | Health predictions |
| `/health-plans` | HealthPlans | Personalized plans |
| `/chatbot` | ChatBot | AI assistant |
| `/mri-analysis` | MRIAnalysis | Medical imaging |
| `/face-analysis` | FaceAnalysis | Facial health analysis |
| `/cognitive-games` | CognitiveGames | Brain training |
| `/stress-relief` | StressReliefGames | Relaxation games |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Radix UI** for accessible primitives
- **Tailwind CSS** for the utility-first framework
- **Lucide** for the icon system

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Built with ❤️ for better healthcare accessibility**
