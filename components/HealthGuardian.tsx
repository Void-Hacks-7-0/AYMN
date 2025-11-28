import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Activity, Brain, Moon, Flame, Thermometer, Stethoscope, 
  MessageSquare, Scan, Menu, X, LogOut, Send, AlertTriangle, 
  CheckCircle, Calendar, Utensils, Dumbbell, Bot, Gamepad2, 
  PlusCircle, Save, Wifi, FileText
} from 'lucide-react';
import { Card, ProgressBar, CircularProgress, CustomIcons } from './ui';
import { 
  UserProfile, WeeklyPlanItem, Vitals, Notification, ChatMessage, 
  SymptomResult, RiskInputs, RiskScore, CardItem, NavItem 
} from '../types';

// --- Mock Data & Constants ---

const MOCK_USER_PROFILE: UserProfile = {
  name: "Alex Student",
  university: "Tech University",
  bloodType: "O+"
};

const WEEKLY_PLAN: WeeklyPlanItem[] = [
  { day: 'Monday', focus: 'Cardio & Carbs', workout: '30m Jog', meal: 'Oatmeal & Fruit' },
  { day: 'Tuesday', focus: 'Strength & Protein', workout: 'Bodyweight Circuit', meal: 'Grilled Chicken Salad' },
  { day: 'Wednesday', focus: 'Recovery', workout: 'Yoga/Stretching', meal: 'Smoothie Bowl' },
  { day: 'Thursday', focus: 'HIIT', workout: '20m Interval Training', meal: 'Quinoa & Veggies' },
  { day: 'Friday', focus: 'Endurance', workout: '45m Brisk Walk', meal: 'Fish & Rice' },
  { day: 'Saturday', focus: 'Active Fun', workout: 'Sports/Hiking', meal: 'Cheat Meal (Moderate)' },
  { day: 'Sunday', focus: 'Rest', workout: 'Meditation', meal: 'Light Soup' },
];

const DR_AI_RESPONSES = {
  default: "I'm analyzing your input. Could you provide more details about how you're feeling?",
  greeting: "Hello! I'm Dr. AI. I'm here to help you stay healthy during your studies. How are you feeling today?",
  stress: "It sounds like you're under pressure. For immediate relief, try the 4-7-8 breathing technique. Should I connect you to a counselor?",
  headache: "Headaches are common with study stress. Have you hydrated recently? Screen time might also be a factor.",
  doctor: "I am connecting you to a human specialist... Please wait while I forward your profile.",
  emergency: "If this is a medical emergency, please call emergency services immediately. I am an AI assistant.",
  memory: "Memory issues can be related to stress, sleep, or other conditions. Try the Cognitive Game in the menu to test your recall!"
};

export default function HealthGuardian() {
  // State Management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Login State
  const [loginId, setLoginId] = useState('');
  
  // Vitals State
  const [vitals, setVitals] = useState<Vitals>({
    heartRate: 72,
    steps: 4520,
    stressLevel: 35,
    sleepHours: 6.5,
    calories: 1250,
    lastUpdated: 'Today, 9:00 AM'
  });
  const [isEditingVitals, setIsEditingVitals] = useState(false);
  const [tempVitals, setTempVitals] = useState<Vitals>({...vitals});

  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Chatbot State
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { sender: 'bot', text: DR_AI_RESPONSES.greeting }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Forms State
  const [symptomInput, setSymptomInput] = useState('');
  const [symptomResult, setSymptomResult] = useState<SymptomResult | null>(null);
  const [isAnalyzingSymptoms, setIsAnalyzingSymptoms] = useState(false);

  // Risk & Model Integration State
  const [riskInputs, setRiskInputs] = useState<RiskInputs>({ bmi: 22, sleep: 7, activity: 'moderate' });
  const [riskScore, setRiskScore] = useState<RiskScore | null>(null);
  const [apiUrl, setApiUrl] = useState(''); 
  const [isUsingExternalModel, setIsUsingExternalModel] = useState(false);
  const [isCalculatingRisk, setIsCalculatingRisk] = useState(false);

  const [mriImage, setMriImage] = useState<string | null>(null);
  const [mriResult, setMriResult] = useState<string | null>(null);
  const [isScanningMRI, setIsScanningMRI] = useState(false);

  // --- Memory Game State ---
  const [gameCards, setGameCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<any[]>([]); // Icons are functions
  const [gameMoves, setGameMoves] = useState(0);
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'won'>('idle'); 
  
  // --- Effects ---

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const addNotification = (message: string, type: Notification['type'] = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // --- Dashboard Logic (Manual Update) ---
  
  const handleUpdateVitals = () => {
    setVitals({
      ...tempVitals,
      lastUpdated: 'Just now'
    });
    setIsEditingVitals(false);
    addNotification("Daily logs updated successfully!", "success");
    
    if (tempVitals.heartRate > 100) addNotification("Heart rate indicates stress. Try breathing exercises.", "alert");
    if (tempVitals.sleepHours < 6) addNotification("Low sleep recorded. Recommendation: 8 hours.", "warning");
  };

  // --- Game Logic ---

  const initializeGame = () => {
    const { Sun, Star, Zap, Cloud } = CustomIcons;
    const icons = [Heart, Brain, Moon, Flame, Sun, Star, Zap, Cloud];
    const deck = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((Icon, index) => ({ id: index, Icon, isFlipped: false, isMatched: false }));
    
    setGameCards(deck);
    setFlippedCards([]);
    setMatchedPairs([]);
    setGameMoves(0);
    setGameStatus('playing');
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || gameCards[id].isMatched || flippedCards.includes(id)) return;

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setGameMoves(prev => prev + 1);
      const [firstId, secondId] = newFlipped;
      
      if (gameCards[firstId].Icon === gameCards[secondId].Icon) {
        setMatchedPairs(prev => [...prev, gameCards[firstId].Icon]);
        setGameCards(prev => prev.map(card => 
          (card.id === firstId || card.id === secondId) ? { ...card, isMatched: true } : card
        ));
        setFlippedCards([]);
        
        if (matchedPairs.length + 1 === 8) {
          setGameStatus('won');
        }
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // --- AI Logic ---

  const handleSymptomCheck = () => {
    if (!symptomInput.trim()) return;
    setIsAnalyzingSymptoms(true);
    setSymptomResult(null);

    setTimeout(() => {
      setIsAnalyzingSymptoms(false);
      const lowerInput = symptomInput.toLowerCase();
      let condition = "General Fatigue";
      let severity: SymptomResult['severity'] = "Low";
      let advice = "Rest and hydration recommended.";

      if (lowerInput.includes("head") || lowerInput.includes("dizzy")) {
        condition = "Migraine / Tension Headache";
        severity = "Medium";
        advice = "Reduce screen time, dim lights, and drink water.";
      } else if (lowerInput.includes("chest") || lowerInput.includes("breath")) {
        condition = "Potential Respiratory Issue";
        severity = "High";
        advice = "Seek professional medical attention immediately.";
      } else if (lowerInput.includes("memory") || lowerInput.includes("forget")) {
        condition = "Cognitive Fatigue / Stress";
        severity = "Medium";
        advice = "Try the Memory Game in this app to test focus. Get more sleep.";
      }

      setSymptomResult({ condition, severity, advice });
    }, 2000);
  };

  const calculateRisk = async () => {
    setIsCalculatingRisk(true);
    setRiskScore(null);

    if (isUsingExternalModel && apiUrl) {
      try {
        let cleanUrl = apiUrl.trim();
        if (cleanUrl.startsWith('http://') && cleanUrl.includes('ngrok')) {
           cleanUrl = cleanUrl.replace('http://', 'https://');
        }
        
        const endpoint = cleanUrl.endsWith('/predict') ? cleanUrl : `${cleanUrl.replace(/\/$/, '')}/predict`;
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
          body: JSON.stringify(riskInputs),
        });

        if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
        
        const data = await response.json();
        setRiskScore(data);
        addNotification("Analysis received from External Model", "success");
      } catch (error: any) {
        console.error("API Error:", error);
        addNotification(`Connection Failed: ${error.message}. Using local logic.`, "alert");
        calculateLocalRisk();
      }
    } else {
      setTimeout(() => {
        calculateLocalRisk();
      }, 1000);
    }
    
    setIsCalculatingRisk(false);
  };

  const calculateLocalRisk = () => {
    let diabetesRisk = 20;
    let stressRisk = 30;

    if (riskInputs.bmi > 25) diabetesRisk += 20;
    if (riskInputs.bmi > 30) diabetesRisk += 30;
    if (riskInputs.sleep < 6) { stressRisk += 30; diabetesRisk += 10; }
    if (riskInputs.activity === 'sedentary') { diabetesRisk += 25; stressRisk += 10; }

    setRiskScore({ diabetes: Math.min(diabetesRisk, 95), stress: Math.min(stressRisk, 95) });
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput;
    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = DR_AI_RESPONSES.default;
      const lowerMsg = userMsg.toLowerCase();

      if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) botResponse = DR_AI_RESPONSES.greeting;
      else if (lowerMsg.includes('stress') || lowerMsg.includes('anxious')) botResponse = DR_AI_RESPONSES.stress;
      else if (lowerMsg.includes('memory') || lowerMsg.includes('forget')) botResponse = DR_AI_RESPONSES.memory;
      else if (lowerMsg.includes('doctor') || lowerMsg.includes('human')) botResponse = DR_AI_RESPONSES.doctor;
      else if (lowerMsg.includes('die') || lowerMsg.includes('emergency')) botResponse = DR_AI_RESPONSES.emergency;

      setChatHistory(prev => [...prev, { sender: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleMRIUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMriImage(URL.createObjectURL(file));
      setMriResult(null);
      setIsScanningMRI(true);

      setTimeout(() => {
        setIsScanningMRI(false);
        const diagnoses = ["Normal Scan", "Mild Inflammation Detected", "Minor Tissue Strain", "Clear Scan"];
        setMriResult(diagnoses[Math.floor(Math.random() * diagnoses.length)]);
      }, 3500);
    }
  };

  // --- Views ---

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-200">
        <div className="max-w-md w-full bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-8 space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-900/30 mb-4">
              <Activity className="w-8 h-8 text-sky-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">HealthAI Guardian</h1>
            <p className="text-slate-400 mt-2">Student Health Monitoring System</p>
          </div>
          
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
            <div>
              <label className="block text-sm font-medium text-slate-300">Student ID</label>
              <input 
                type="text" 
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="mt-1 block w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-sky-500 focus:border-sky-500" 
                placeholder="STU-2025-X" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <input type="password" className="mt-1 block w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-sky-500 focus:border-sky-500" placeholder="••••••••" required />
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-sky-400 hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors">
              Access Dashboard
            </button>
          </form>
          <p className="text-xs text-center text-slate-500">Prototype for Hackathon Presentation</p>
        </div>
      </div>
    );
  }

  // Navigation Items
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Daily Log', icon: Activity },
    { id: 'game', label: 'Memory Game', icon: Gamepad2 },
    { id: 'symptoms', label: 'Symptom AI', icon: Stethoscope },
    { id: 'analytics', label: 'Risk Analytics', icon: Scan },
    { id: 'plans', label: 'Health Plans', icon: Calendar },
    { id: 'chat', label: 'Dr. AI Chat', icon: MessageSquare },
    { id: 'mri', label: 'MRI Scan', icon: Brain },
  ];

  return (
    <div className="min-h-screen bg-black font-sans text-slate-200 flex overflow-hidden">
      
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
        {notifications.map(note => (
          <div key={note.id} className={`flex items-center p-4 rounded-lg shadow-lg border-l-4 ${note.type === 'alert' ? 'bg-red-900/80 border-red-500 text-white' : 'bg-sky-900/80 border-sky-500 text-white'} backdrop-blur-sm animate-fade-in-down`}>
            <AlertTriangle className="w-5 h-5 mr-3" />
            <span className="font-medium">{note.message}</span>
          </div>
        ))}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-20 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-slate-950 border-r border-slate-900 shadow-xl transform transition-transform duration-300 ease-in-out md:transform-none ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col h-full`}>
        <div className="p-6 border-b border-slate-900 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <div className="bg-sky-600 p-2 rounded-lg shadow-[0_0_15px_rgba(2,132,199,0.5)]">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Guardian</span>
          </div>
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-sky-900/30 text-sky-400 border border-sky-900/50 shadow-[0_0_10px_rgba(56,189,248,0.1)]' 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-900 shrink-0 mt-auto">
          <div className="flex items-center p-3 rounded-lg bg-slate-900 mb-3">
            <div className="w-10 h-10 rounded-full bg-sky-900 flex items-center justify-center text-sky-400 font-bold border border-sky-800">
              {MOCK_USER_PROFILE.name.charAt(0)}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{MOCK_USER_PROFILE.name}</p>
              <p className="text-xs text-slate-500 truncate">ID: {loginId || 'Unknown'}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center justify-center space-x-2 p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen bg-black">
        {/* Top Header (Mobile) */}
        <header className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-10">
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6 text-slate-400" />
          </button>
          <span className="font-bold text-lg text-white">HealthAI Guardian</span>
          <div className="w-6"></div> {/* Spacer */}
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
          
          {/* DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-white">Hello, {MOCK_USER_PROFILE.name} 👋</h2>
                  <p className="text-slate-400 mt-1">Track your daily statistics manually or sync from phone.</p>
                </div>
                <div className="text-right flex items-center gap-4">
                  <p className="text-sm text-slate-500 hidden md:block">Updated: {vitals.lastUpdated}</p>
                  <button 
                    onClick={() => { setIsEditingVitals(!isEditingVitals); setTempVitals(vitals); }}
                    className="flex items-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-500 transition-colors shadow-lg shadow-sky-900/50"
                  >
                    {isEditingVitals ? <X className="w-4 h-4 mr-2" /> : <PlusCircle className="w-4 h-4 mr-2" />}
                    {isEditingVitals ? 'Cancel' : 'Log Data'}
                  </button>
                </div>
              </div>

              {isEditingVitals && (
                <Card className="bg-slate-800 border-sky-900 border animate-fade-in-down">
                  <h3 className="font-bold text-white mb-4">Input Today's Readings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase">Heart Rate (BPM)</label>
                      <input 
                        type="number" 
                        value={tempVitals.heartRate} 
                        onChange={(e) => setTempVitals({...tempVitals, heartRate: Number(e.target.value)})}
                        className="w-full mt-1 p-2 rounded bg-slate-900 border border-slate-700 text-white focus:ring-1 focus:ring-sky-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase">Steps</label>
                      <input 
                        type="number" 
                        value={tempVitals.steps} 
                        onChange={(e) => setTempVitals({...tempVitals, steps: Number(e.target.value)})}
                        className="w-full mt-1 p-2 rounded bg-slate-900 border border-slate-700 text-white focus:ring-1 focus:ring-sky-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase">Stress (0-100)</label>
                      <input 
                        type="number" 
                        value={tempVitals.stressLevel} 
                        onChange={(e) => setTempVitals({...tempVitals, stressLevel: Number(e.target.value)})}
                        className="w-full mt-1 p-2 rounded bg-slate-900 border border-slate-700 text-white focus:ring-1 focus:ring-sky-500 outline-none"
                      />
                    </div>
                    <div className="flex items-end">
                      <button onClick={handleUpdateVitals} className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-500 flex justify-center items-center font-bold">
                        <Save className="w-4 h-4 mr-2" /> Save Log
                      </button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Vitals Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <Card className="flex flex-col items-center justify-center border-b-4 border-rose-500">
                  <div className="p-3 bg-rose-900/30 rounded-full mb-2">
                    <Heart className="w-6 h-6 text-rose-500" />
                  </div>
                  <span className="text-3xl font-bold text-white">{vitals.heartRate}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wide">Avg BPM</span>
                </Card>
                
                <Card className="flex flex-col items-center justify-center border-b-4 border-sky-500">
                  <div className="p-3 bg-sky-900/30 rounded-full mb-2">
                    <Activity className="w-6 h-6 text-sky-500" />
                  </div>
                  <span className="text-3xl font-bold text-white">{vitals.steps}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wide">Steps Today</span>
                </Card>

                <Card className="flex flex-col items-center justify-center border-b-4 border-violet-500">
                  <div className="p-3 bg-violet-900/30 rounded-full mb-2">
                    <Brain className="w-6 h-6 text-violet-500" />
                  </div>
                  <span className="text-3xl font-bold text-white">{vitals.stressLevel}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wide">Stress Index</span>
                </Card>

                <Card className="flex flex-col items-center justify-center border-b-4 border-indigo-500 col-span-1 md:col-span-2 lg:col-span-2">
                  <div className="flex w-full justify-around items-center">
                    <CircularProgress 
                      value={vitals.sleepHours} 
                      max={9} 
                      color="text-indigo-400" 
                      icon={Moon} 
                      label="Sleep Logged" 
                      unit="hrs"
                    />
                     <CircularProgress 
                      value={vitals.calories} 
                      max={2500} 
                      color="text-orange-400" 
                      icon={Flame} 
                      label="Est. Burn" 
                      unit="kcal"
                    />
                  </div>
                </Card>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <h3 className="font-bold text-slate-300 mb-4 flex items-center">
                    <Thermometer className="w-5 h-5 mr-2 text-sky-500" /> 
                    Weekly Temperature Trends
                  </h3>
                  <div className="h-48 flex items-end justify-between space-x-2 px-2">
                    {[36.5, 36.6, 36.4, 37.0, 36.8, 36.5, 36.6].map((temp, i) => (
                      <div key={i} className="flex flex-col items-center w-full group">
                         <div 
                          className="w-full bg-sky-900/50 rounded-t-sm hover:bg-sky-500 transition-colors relative" 
                          style={{ height: `${(temp - 35) * 40}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {temp}°C
                          </div>
                        </div>
                         <span className="text-xs text-slate-500 mt-2">{['M','T','W','T','F','S','S'][i]}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h3 className="font-bold text-slate-300 mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-sky-500" />
                    Activity History (Manual)
                  </h3>
                  <div className="space-y-4">
                    <ProgressBar value={20} color="bg-green-500" label="Fat Burn (Low)" />
                    <ProgressBar value={45} color="bg-sky-500" label="Cardio (Moderate)" />
                    <ProgressBar value={15} color="bg-red-500" label="Peak (High)" />
                  </div>
                  <p className="text-xs text-slate-500 mt-4">Based on logs submitted this week.</p>
                </Card>
              </div>
            </div>
          )}

          {/* GAME VIEW */}
          {activeTab === 'game' && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white">Cognitive Health Check</h2>
                <p className="text-slate-400">Test your short-term memory. Match all pairs to win.</p>
              </div>

              {gameStatus === 'idle' && (
                <Card className="text-center py-12">
                   <Brain className="w-16 h-16 text-sky-500 mx-auto mb-4" />
                   <h3 className="text-xl font-bold text-white mb-2">Ready to test your memory?</h3>
                   <p className="text-slate-400 mb-6 max-w-md mx-auto">This game helps track cognitive function over time. Sudden drops in memory score can indicate stress or other conditions.</p>
                   <button 
                    onClick={initializeGame}
                    className="bg-sky-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-sky-500 transition-transform hover:scale-105 shadow-lg shadow-sky-900/50"
                   >
                     Start Game
                   </button>
                </Card>
              )}

              {gameStatus === 'playing' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-800">
                    <span className="font-bold text-slate-300">Moves: {gameMoves}</span>
                    <button onClick={initializeGame} className="text-sm text-red-400 hover:text-red-300">Restart</button>
                  </div>
                  <div className="grid grid-cols-4 gap-3 md:gap-4">
                    {gameCards.map((card) => (
                      <div 
                        key={card.id} 
                        onClick={() => handleCardClick(card.id)}
                        className={`aspect-square cursor-pointer perspective-1000 group`}
                      >
                        <div className={`relative w-full h-full transition-all duration-500 transform style-preserve-3d ${
                          (card.isFlipped || card.isMatched || flippedCards.includes(card.id)) ? 'rotate-y-180' : ''
                        }`}>
                          <div className="absolute w-full h-full bg-slate-800 rounded-xl flex items-center justify-center backface-hidden shadow-md border border-slate-700">
                            <Gamepad2 className="w-8 h-8 text-slate-600 opacity-50" />
                          </div>
                          <div className={`absolute w-full h-full ${card.isMatched ? 'bg-sky-900/50 border-2 border-sky-500' : 'bg-slate-700 border-2 border-slate-600'} rounded-xl flex items-center justify-center backface-hidden rotate-y-180 shadow-md`}>
                            <card.Icon className={`w-8 h-8 ${card.isMatched ? 'text-sky-400' : 'text-white'}`} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {gameStatus === 'won' && (
                <Card className="text-center py-12 bg-green-900/20 border-green-900">
                  <div className="inline-block p-4 bg-green-900/50 rounded-full mb-4">
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-400 mb-2">Excellent Memory!</h3>
                  <p className="text-green-200 mb-6">You cleared the board in {gameMoves} moves.</p>
                  <button 
                    onClick={initializeGame}
                    className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-500 shadow-lg"
                   >
                     Play Again
                   </button>
                </Card>
              )}
            </div>
          )}

          {/* SYMPTOM CHECKER VIEW */}
          {activeTab === 'symptoms' && (
            <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white">AI Symptom Checker</h2>
                <p className="text-slate-400">Describe what you are feeling, and our AI will analyze potential conditions.</p>
              </div>

              <Card>
                <textarea
                  className="w-full p-4 rounded-lg bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent min-h-[150px]"
                  placeholder="e.g., I have a throbbing headache on the left side and feel sensitive to light..."
                  value={symptomInput}
                  onChange={(e) => setSymptomInput(e.target.value)}
                ></textarea>
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={handleSymptomCheck}
                    disabled={isAnalyzingSymptoms}
                    className="bg-sky-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-sky-500 transition-colors flex items-center disabled:opacity-50"
                  >
                    {isAnalyzingSymptoms ? (
                      <>
                        <Activity className="w-5 h-5 mr-2 animate-spin" /> Analyzing...
                      </>
                    ) : (
                      <>Analyze Symptoms</>
                    )}
                  </button>
                </div>
              </Card>

              {symptomResult && (
                <Card className="bg-slate-900 border-l-4 border-sky-500 animate-slide-up">
                  <div className="flex items-start">
                    <div className="p-2 bg-sky-900/30 rounded-full mr-4">
                      <Stethoscope className="w-6 h-6 text-sky-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Analysis Result</h3>
                      <div className="mt-2 space-y-2">
                        <p className="text-slate-300"><span className="font-semibold text-slate-400">Potential Condition:</span> {symptomResult.condition}</p>
                        <p className="text-slate-300">
                          <span className="font-semibold text-slate-400">Severity:</span> 
                          <span className={`ml-2 px-2 py-0.5 rounded text-xs font-bold uppercase ${
                            symptomResult.severity === 'High' ? 'bg-red-900/50 text-red-300 border border-red-800' : 
                            symptomResult.severity === 'Medium' ? 'bg-amber-900/50 text-amber-300 border border-amber-800' : 
                            'bg-green-900/50 text-green-300 border border-green-800'
                          }`}>
                            {symptomResult.severity}
                          </span>
                        </p>
                        <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg mt-3">
                          <p className="text-sm text-slate-400"><span className="font-bold text-slate-300">Recommendation:</span> {symptomResult.advice}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* RISK ANALYTICS VIEW */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fade-in">
               <h2 className="text-2xl font-bold text-white">Predictive Health Analytics</h2>
               
               {/* Model Connection Toggle */}
               <Card className="bg-slate-900 border-slate-700">
                 <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center">
                       <Wifi className={`w-6 h-6 mr-3 ${isUsingExternalModel ? 'text-green-400' : 'text-slate-500'}`} />
                       <div>
                         <h3 className="font-bold text-white">External AI Model Integration</h3>
                         <p className="text-xs text-slate-400">Connect to your Google Colab/Python backend</p>
                       </div>
                    </div>
                    <div className="flex items-center space-x-3 w-full md:w-auto">
                       <div className="relative flex-1 md:w-64">
                         <input 
                           type="text" 
                           placeholder="Paste ngrok URL" 
                           className="w-full bg-black text-white border border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                           value={apiUrl}
                           onChange={(e) => setApiUrl(e.target.value)}
                         />
                       </div>
                       <button 
                        onClick={() => {
                          if (!apiUrl) {
                            addNotification("Please enter a URL first", "warning");
                            return;
                          }
                          setIsUsingExternalModel(!isUsingExternalModel);
                          addNotification(isUsingExternalModel ? "Disconnected from External Model" : "Connected to External Model", "info");
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${isUsingExternalModel ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-200'}`}
                       >
                         {isUsingExternalModel ? 'Active' : 'Connect'}
                       </button>
                    </div>
                 </div>
                 {isUsingExternalModel && (
                   <div className="mt-2 text-xs text-green-400 flex items-center">
                     <CheckCircle className="w-3 h-3 mr-1" />
                     Requests will be sent to external API
                   </div>
                 )}
               </Card>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <Card>
                   <h3 className="font-bold text-lg mb-4 text-white">Risk Assessment Factors</h3>
                   <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-400">BMI (Body Mass Index)</label>
                        <input 
                          type="range" min="15" max="40" 
                          value={riskInputs.bmi} 
                          onChange={(e) => setRiskInputs({...riskInputs, bmi: parseInt(e.target.value)})}
                          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                          <span>15</span>
                          <span className="font-bold text-sky-400">{riskInputs.bmi}</span>
                          <span>40</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-400">Avg. Sleep (Hours)</label>
                        <input 
                          type="range" min="3" max="10" 
                          value={riskInputs.sleep} 
                          onChange={(e) => setRiskInputs({...riskInputs, sleep: parseInt(e.target.value)})}
                          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                         <div className="flex justify-between text-xs text-slate-500 mt-1">
                          <span>3h</span>
                          <span className="font-bold text-blue-400">{riskInputs.sleep}h</span>
                          <span>10h</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-400">Activity Level</label>
                        <select 
                          value={riskInputs.activity}
                          onChange={(e) => setRiskInputs({...riskInputs, activity: e.target.value})}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
                        >
                          <option value="sedentary">Sedentary (Low)</option>
                          <option value="moderate">Moderate</option>
                          <option value="active">Active (High)</option>
                        </select>
                      </div>

                      <button 
                        onClick={calculateRisk}
                        disabled={isCalculatingRisk}
                        className="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700 border border-slate-700 transition-colors flex justify-center items-center"
                      >
                        {isCalculatingRisk ? <Activity className="w-5 h-5 animate-spin" /> : 'Calculate Risk Score'}
                      </button>
                   </div>
                 </Card>

                 <div className="space-y-6">
                    {riskScore ? (
                      <>
                        <Card className="border-l-4 border-rose-500">
                          <h3 className="font-bold text-lg mb-2 flex justify-between text-white">
                            Type 2 Diabetes Risk
                            <span className={riskScore.diabetes > 50 ? 'text-red-400' : 'text-green-400'}>
                              {riskScore.diabetes > 50 ? 'Elevated' : 'Low'}
                            </span>
                          </h3>
                          <div className="w-full bg-slate-800 rounded-full h-4 mb-2">
                            <div 
                              className={`h-4 rounded-full transition-all duration-1000 ${riskScore.diabetes > 60 ? 'bg-red-500' : riskScore.diabetes > 30 ? 'bg-amber-500' : 'bg-green-500'}`}
                              style={{ width: `${riskScore.diabetes}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-slate-500">Based on analysis of input parameters.</p>
                        </Card>

                        <Card className="border-l-4 border-violet-500">
                          <h3 className="font-bold text-lg mb-2 flex justify-between text-white">
                            Chronic Stress Risk
                            <span className={riskScore.stress > 50 ? 'text-red-400' : 'text-green-400'}>
                               {riskScore.stress > 50 ? 'High' : 'Managed'}
                            </span>
                          </h3>
                          <div className="w-full bg-slate-800 rounded-full h-4 mb-2">
                            <div 
                              className={`h-4 rounded-full transition-all duration-1000 ${riskScore.stress > 60 ? 'bg-violet-500' : riskScore.stress > 30 ? 'bg-violet-400' : 'bg-violet-200'}`}
                              style={{ width: `${riskScore.stress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-slate-500">Correlated with sleep patterns and variability.</p>
                        </Card>
                      </>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800 rounded-xl p-8">
                        <Scan className="w-12 h-12 mb-2 opacity-50" />
                        <p>Adjust factors and click calculate to see predictive analysis.</p>
                      </div>
                    )}
                 </div>
               </div>
            </div>
          )}

          {/* HEALTH PLANS VIEW */}
          {activeTab === 'plans' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-white">Personalized Health Plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {WEEKLY_PLAN.map((item, index) => (
                  <Card key={index} className="hover:border-sky-500 transition-colors relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-sky-500"></div>
                    <div className="pl-2">
                      <h3 className="font-bold text-lg text-white mb-1">{item.day}</h3>
                      <span className="inline-block bg-slate-800 text-sky-300 text-xs px-2 py-1 rounded mb-3 border border-slate-700">
                        {item.focus}
                      </span>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-slate-400">
                          <Dumbbell className="w-4 h-4 mr-2 text-blue-400" />
                          {item.workout}
                        </div>
                        <div className="flex items-center text-sm text-slate-400">
                          <Utensils className="w-4 h-4 mr-2 text-green-400" />
                          {item.meal}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* CHATBOT VIEW */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-[calc(100vh-8rem)] animate-fade-in">
              <Card className="flex-1 flex flex-col overflow-hidden p-0 border-slate-800">
                <div className="bg-sky-900/50 p-4 flex items-center shadow-md border-b border-slate-800">
                   {/* Dr. AI Avatar Animation */}
                  <div className="relative mr-4">
                     <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.5)] animate-bounce">
                        <Bot className="w-8 h-8 text-black" />
                     </div>
                     <div className="absolute -bottom-2 w-12 h-2 bg-black opacity-50 rounded-full blur-sm animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Dr. AI</h3>
                    <p className="text-sky-200 text-xs flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 shadow-[0_0_5px_rgba(74,222,128,0.8)]"></span>
                      Online • Proactive Support
                    </p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
                  {chatHistory.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                        msg.sender === 'user' 
                          ? 'bg-sky-600 text-white rounded-tr-none' 
                          : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                     <div className="flex justify-start">
                       <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700 shadow-sm flex space-x-1">
                         <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                         <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100"></div>
                         <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200"></div>
                       </div>
                     </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
                  <input 
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask Dr. AI about your health..."
                    className="flex-1 p-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="bg-sky-600 p-2 rounded-lg text-white hover:bg-sky-500 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </Card>
            </div>
          )}

          {/* MRI SCANNER VIEW (Gamified) */}
          {activeTab === 'mri' && (
            <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white">MRI Diagnostic Tool</h2>
                <p className="text-slate-400">AI-Powered Image Recognition for Radiological Data</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-slate-700 bg-black">
                   {!mriImage ? (
                     <label className="cursor-pointer flex flex-col items-center">
                        <Scan className="w-16 h-16 text-slate-600 mb-4" />
                        <span className="text-slate-400 font-medium">Upload MRI Scan</span>
                        <span className="text-slate-600 text-xs mt-1">Supports JPG, PNG (Simulated)</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleMRIUpload} />
                     </label>
                   ) : (
                     <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
                        <img src={mriImage} alt="MRI" className="max-h-[300px] object-contain opacity-80" />
                        {isScanningMRI && (
                          <div className="absolute inset-0 bg-sky-900/50 flex flex-col items-center justify-center backdrop-blur-sm">
                             <div className="w-full h-1 bg-sky-400 absolute top-0 animate-scan shadow-[0_0_15px_#38bdf8]"></div>
                             <p className="text-white font-bold bg-black/70 px-3 py-1 rounded border border-sky-500">Scanning Tissues...</p>
                          </div>
                        )}
                        <button 
                          onClick={() => { setMriImage(null); setMriResult(null); }}
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full shadow-md hover:bg-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                     </div>
                   )}
                </Card>

                <Card className="flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-violet-400" />
                    Analysis Report
                  </h3>
                  
                  {mriResult ? (
                     <div className="space-y-4 animate-fade-in">
                       <div className="flex items-center space-x-2 text-green-400 bg-green-900/20 p-3 rounded-lg border border-green-900">
                         <CheckCircle className="w-5 h-5" />
                         <span className="font-bold">Scan Complete</span>
                       </div>
                       
                       <div>
                         <p className="text-sm text-slate-400">Diagnosis:</p>
                         <p className="text-xl font-bold text-white">{mriResult}</p>
                       </div>

                       <div>
                          <p className="text-sm text-slate-400">Confidence Score:</p>
                          <ProgressBar value={92} color="bg-violet-500" label="" />
                       </div>

                       <div className="bg-slate-950 p-3 rounded text-xs text-slate-500 italic border border-slate-800">
                         Note: This is a gamified simulation. Real MRI analysis requires certified radiologists.
                       </div>
                     </div>
                  ) : (
                    <div className="text-center text-slate-600">
                      <FileText className="w-12 h-12 mx-auto mb-2 opacity-30" />
                      <p>Upload an image to generate analysis.</p>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <footer className="p-6 text-center text-slate-600 text-xs border-t border-slate-900 mt-8">
          <p>© 2025 HealthAI Guardian. Designed for Student Well-being.</p>
          <p className="mt-1 text-red-900 font-medium">DISCLAIMER: This application is a prototype for educational purposes only. It is NOT a substitute for professional medical advice, diagnosis, or treatment.</p>
        </footer>
      </main>
    </div>
  );
}