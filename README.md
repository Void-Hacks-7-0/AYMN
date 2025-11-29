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

### 💬 AI ChatBot (MediBot) - **NEW!** 🤖
- **Speech-to-Speech** - Voice input & AI voice responses powered by Gemini
- **Medical Knowledge Base** - Context-aware responses with medical definitions
- **Emergency Detection** - Automatic detection of life-threatening symptoms
- **Smart Tools**:
  - 📋 **Symptom Report Generator** - Professional medical reports for doctors
  - 🩺 **AI Symptom Checker** - Intelligent symptom analysis with recommendations
  - 🍽️ **Meal Planner** - Personalized meal plans based on health conditions
- **Real-time Audio Playback** - Play/pause controls for AI voice responses
- **Voice Recording** - Record and send voice messages
- **Medical Context Cards** - Related medical terms displayed with definitions
- **Downloadable Reports** - Save symptom reports, meal plans as text files
- **Markdown Support** - Rich text formatting in chat responses

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

### AI & ML
- **Google Gemini AI** - Advanced conversational AI with multimodal support
  - `gemini-2.5-flash` - Chat and content generation
  - `gemini-2.5-flash-preview-tts` - Text-to-speech voice synthesis
- **@google/genai** - Official Gemini SDK
- **React Markdown** - Markdown rendering in chat

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
- **Gemini API Key** (free from Google AI Studio)

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

3. **Configure Gemini API Key** ⚠️ **REQUIRED for ChatBot**
   
   Get your free API key:
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with Google account
   - Click "Create API Key"
   - Copy your API key

   Create/edit `.env` file in the project root:
   ```env
   VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
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
│   │   ├── chatbot/     # 🆕 ChatBot components
│   │   │   ├── ChatBubble.tsx       # Message bubbles with audio
│   │   │   ├── InputControls.tsx    # Voice recording & text input
│   │   │   ├── SmartTools.tsx       # Smart tool buttons
│   │   │   └── Modal.tsx            # Report/plan viewer dialog
│   │   ├── dashboard/   # Dashboard-specific components
│   │   ├── layout/      # Layout components (AppLayout, Sidebar)
│   │   └── ui/          # shadcn/ui components
│   ├── contexts/        # React contexts (Auth, Theme)
│   ├── data/            # Dataset files (CSV) + Medical Knowledge
│   │   ├── medicalKnowledge.ts  # 🆕 Medical database
│   │   └── index.ts              # 🆕 Data exports
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities and helpers
│   ├── pages/           # Page components
│   │   └── ChatBot.tsx  # 🆕 Advanced AI chatbot page
│   ├── services/        # 🆕 External service integrations
│   │   └── gemini.ts    # Gemini AI service
│   ├── types/           # 🆕 TypeScript type definitions
│   │   └── chatbot.ts   # Chatbot types
│   ├── utils/           # 🆕 Utility functions
│   │   └── audio.ts     # Audio processing
│   ├── App.tsx          # Root component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles and theme
├── .env                 # 🆕 Environment variables (API keys)
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

## 🤖 ChatBot Features Guide

### Voice Input & Output
1. **Text Chat**: Type questions and get AI responses
2. **Voice Input**: Click 🎤 microphone to record questions
3. **Voice Responses**: Toggle 🔊 speaker icon for AI voice
4. **Audio Playback**: Click ▶️ play buttons in chat bubbles

### Medical Knowledge
- Automatically detects medical terms (fever, diabetes, headache, etc.)
- Shows context cards with:
  - Definition
  - Causes & symptoms
  - Precautions
  - When to see a doctor

### Emergency Detection
System automatically detects critical keywords:
- Chest pain, heart attack, stroke
- Severe bleeding, difficulty breathing
- Unconsciousness, blue lips
- Displays **urgent warning** to call emergency services

### Smart Tools (Unlocked after conversation)
1. **Symptom Report** 📋
   - Professional medical report
   - Formatted for doctors
   - Downloadable as text file

2. **AI Symptom Checker** 🩺
   - Analyzes reported symptoms
   - Lists potential causes
   - Home remedies & red flags
   - Educational, not diagnostic

3. **Meal Planner** 🍽️
   - Personalized meal plan
   - Based on health conditions
   - Nutritional guidance
   - 1-day menu (Breakfast, Lunch, Dinner, Snacks)

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

### ChatBot Components
- `ChatBubble`: Message display with audio controls
- `InputControls`: Voice recording & text input
- `SmartTools`: Report/checker/planner buttons
- `Modal`: Full-screen report viewer

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
| `/chatbot` | ChatBot | 🆕 AI assistant with voice |
| `/mri-analysis` | MRIAnalysis | Medical imaging |
| `/face-analysis` | FaceAnalysis | Facial health analysis |
| `/cognitive-games` | CognitiveGames | Brain training |
| `/stress-relief` | StressReliefGames | Relaxation games |

## ⚙️ Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for AI chatbot | Yes (for ChatBot) |

## 🔍 Troubleshooting

### ChatBot Not Responding
- Check `.env` file has valid `VITE_GEMINI_API_KEY`
- Restart dev server after adding API key
- Check browser console for error messages
- Verify API key at [Google AI Studio](https://aistudio.google.com)

### Voice Recording Not Working
- Allow microphone permissions in browser
- Use HTTPS in production (required for mic access)
- Check browser compatibility (Chrome/Edge recommended)

### Smart Tools Disabled
- Chat with the bot first (at least 1 exchange)
- Wait for AI response before clicking tools
- Check for loading indicator

### TypeScript Errors
- Run: `npx tsc --noEmit` to check for errors
- Restart TypeScript server in VS Code: `Ctrl+Shift+P` → "Restart TS Server"
- Clear cache: `rm -rf node_modules && npm install`

## 📈 API Usage & Limits

**Gemini API Free Tier:**
- ✅ 15 requests per minute
- ✅ 1,500 requests per day
- ✅ 1 million tokens per day

Perfect for testing and small applications! For production with high traffic, consider upgrading to paid tier.

## 🔒 Security Best Practices

- ✅ API key stored in `.env` (not committed to git)
- ✅ `.env` added to `.gitignore`
- ⚠️ Client-side API calls (acceptable for free tier)
- 🔒 For production: Use server-side API proxy
- 🔐 Never expose API keys in client code for paid services

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

- **Google Gemini** for advanced AI capabilities
- **shadcn/ui** for the beautiful component library
- **Radix UI** for accessible primitives
- **Tailwind CSS** for the utility-first framework
- **Lucide** for the icon system
- **Vite** for lightning-fast development

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check `CHATBOT_SETUP.md` for detailed ChatBot configuration
- Review browser console for runtime errors

## 🎉 Latest Updates

### v2.0 - AI ChatBot Integration
- ✨ Added advanced AI chatbot with Gemini
- 🎤 Speech-to-speech communication
- 🏥 Medical knowledge base integration
- 🚨 Emergency symptom detection
- 📋 Smart tools for reports and analysis
- 🎨 Updated UI with black/light blue theme

---

**Built with ❤️ for better healthcare accessibility**

🔗 **Quick Links:**
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Get Free API Key](https://aistudio.google.com/app/apikey)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
