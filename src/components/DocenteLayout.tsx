import React, { useState, useEffect, useRef } from 'react';
// Assuming you might use react-router-dom v6+ for real navigation later
// import { useNavigate } from 'react-router-dom';

// Import icons from lucide-react
import { User, CreditCard, BookUser, Pencil, GraduationCap, PlusCircle, XCircle, Save, ArrowLeft, Loader, LayoutDashboard, School, Coins, MessageSquare, BookOpen, ClipboardCheck, Gavel, Users, ChevronRight, Bot, Send, Check, X, CalendarDays, Smile, Frown, Meh, CloudRain, Upload, FileText, Hammer, Sparkles } from 'lucide-react';

// --- Hardcoded User Data ---
const hardcodedUser = {
  nombre: "Cristian Melchor",
  dni: "39776943",
  rol: "docente",
  aniosEnsenia: "1,2,3,4",
  materiasDicta: "DIBUJO TÉCNICO 1° Prog,DIBUJO TÉCNICO 2° Prog,DIBUJO TÉCNICO 3° Prog",
  escuela: "EET UEGP Nª 172 'DEOLINDO FELIPE BITTEL' RESISTENCIA- CHACO",
  monedas: "1,000,000",
};

// --- Hardcoded Student List ---
const studentListManual = [
    "Josefina Godoy", "Bianca Retamoso", "Keila Rajoy", "Medina Jair Lucas", "Garcia Juaquin Ezequiel",
    "De Jesus, Leonel Agustin", "Fernandez, Javier Guillermo", "Tiziano Joaquin Rajoy", "Enrique Quintana Jonathan",
    "Fernandez Javier", "Aguire Alexander Leonel", "Peloso Anna", "Casco Jazmin", "Valdez Sofia",
    "Caballero Luana", "Alfonzo Cantero Ariel", "Gauna Miranda Kiara", "Ojeda Juliana", "Zequeira Nelida",
    "Rios Willian", "Gomez Leandro", "Hermosi Priscila", "Barrios, Gonzalo", "Andreoli"
];

// --- AI Chatbot Modal Component ---
// Enhanced visuals and functionality remains the same
const AIChatbotModal = ({ isOpen, onClose }) => {
    const initialMessages = [
        { sender: 'bot', text: '¡Hola! Soy tu asistente IA personal. ¿Cómo puedo ayudarte hoy?' },
        { sender: 'bot', text: 'Puedes preguntarme sobre: \n• Ideas para clases\n• Ayuda con la plataforma\n• Consultas administrativas\n• ¡Y mucho más!' }
    ];
    const [messages, setMessages] = useState(initialMessages);
    const [inputValue, setInputValue] = useState('');
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Reset messages when modal opens
            setMessages(initialMessages);
            chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [isOpen]); // Rerun effect when isOpen changes

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        const userMessage = { sender: 'user', text: inputValue };
        const responses = [ 'Entendido. Estoy buscando información sobre eso.', 'Interesante pregunta. Permíteme procesarla.', 'Gracias por compartir. Estoy aquí para ayudarte.', 'Recibido. Dame un momento para pensar en la mejor respuesta.', 'Estoy aprendiendo constantemente, pero haré mi mejor esfuerzo para asistirte.' ];
        const botResponse = { sender: 'bot', text: responses[Math.floor(Math.random() * responses.length)] };
        setMessages(prev => [...prev, userMessage, botResponse]);
        setInputValue('');
    };

     const examplePrompts = [ "Dame ideas para una clase de Dibujo Técnico sobre proyecciones.", "¿Cómo registro una justificación de ausencia?", "Explícame cómo funciona la subasta de puntos." ];
     const handlePromptClick = (prompt) => { setInputValue(prompt); };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 animate-fade-in-fast">
            <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-t-2xl sm:rounded-xl shadow-2xl w-full max-w-lg h-[90vh] sm:h-auto sm:max-h-[85vh] flex flex-col overflow-hidden border border-gray-300">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex-shrink-0 shadow-md">
                    <div className="flex items-center gap-3"> <Bot className="w-7 h-7" /> <h3 className="text-lg font-semibold">Asistente IA</h3> </div>
                    <button onClick={onClose} className="text-indigo-100 hover:text-white transition-colors p-1 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"> <X className="w-6 h-6" /> </button>
                </div>
                <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-50/80">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                            <div className={`max-w-[85%] px-4 py-2.5 rounded-xl shadow-sm ${msg.sender === 'bot' ? 'bg-white border border-gray-200 text-gray-800 rounded-bl-none' : 'bg-purple-600 text-white rounded-br-none shadow-md'}`}>
                                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                     {messages.length <= 3 && (
                        <div className="pt-4 border-t border-gray-200 mt-4">
                            <p className="text-xs text-gray-500 mb-2 text-center">O prueba con un ejemplo:</p>
                            <div className="flex flex-col sm:flex-row gap-2">
                                {examplePrompts.slice(0, 2).map((prompt, i) => ( <button key={i} onClick={() => handlePromptClick(prompt)} className="flex-1 text-xs text-indigo-700 bg-indigo-100 border border-indigo-200 rounded-full px-3 py-1.5 text-center hover:bg-indigo-200 transition duration-150"> {prompt} </button> ))}
                            </div>
                             <button onClick={() => handlePromptClick(examplePrompts[2])} className="w-full mt-2 text-xs text-indigo-700 bg-indigo-100 border border-indigo-200 rounded-full px-3 py-1.5 text-center hover:bg-indigo-200 transition duration-150"> {examplePrompts[2]} </button>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Escribe tu consulta aquí..." className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm transition shadow-sm" />
                        <button type="submit" className="p-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-all duration-150 transform hover:scale-110 shadow-md"> <Send className="w-5 h-5" /> </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- Subject Panel Component ---
// Enhanced visuals and state management
const SubjectPanel = ({ subjectName, onBack }) => {
  const [activeAction, setActiveAction] = useState('idle');
  const [attendanceStep, setAttendanceStep] = useState('idle');
  const [selectedAttendanceYear, setSelectedAttendanceYear] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [attendanceDate, setAttendanceDate] = useState('');
  const [planningStep, setPlanningStep] = useState('idle');
  const [selectedPlanningYear, setSelectedPlanningYear] = useState(null);
  const [auctionStep, setAuctionStep] = useState('idle');
  const [auctionName, setAuctionName] = useState('');
  const fileInputRef = useRef(null); // Ref for file input

  const resetAllActions = () => { setActiveAction('idle'); setAttendanceStep('idle'); setPlanningStep('idle'); setAuctionStep('idle'); setSelectedAttendanceYear(null); setSelectedPlanningYear(null); setCurrentStudentIndex(0); setStudentList([]); setAuctionName(''); };
  const getFormattedDate = () => new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const startAttendance = () => { resetAllActions(); setActiveAction('attendance'); setAttendanceStep('selectYear'); };
  const handleAttendanceYearSelect = (year) => { setSelectedAttendanceYear(year); setStudentList(studentListManual); setCurrentStudentIndex(0); setAttendanceDate(getFormattedDate()); setAttendanceStep('taking'); };
  const markAttendance = (status) => { console.log(`Student: ${studentList[currentStudentIndex]}, Year: ${selectedAttendanceYear}, Status: ${status}, Date: ${attendanceDate}`); const nextIndex = currentStudentIndex + 1; if (nextIndex < studentList.length) { setCurrentStudentIndex(nextIndex); } else { setAttendanceStep('complete'); } };

  const startPlanning = () => { resetAllActions(); setActiveAction('planning'); setPlanningStep('selectYear'); };
  const handlePlanningYearSelect = (year) => { setSelectedPlanningYear(year); setPlanningStep('uploadFile'); };
  const handleFileSelect = (event) => { if (event.target.files && event.target.files[0]) { console.log(`File selected for planning: ${event.target.files[0].name}, Year: ${selectedPlanningYear}`); setPlanningStep('complete'); } if(fileInputRef.current) fileInputRef.current.value = null; }; // Reset input

  const startAuction = () => { resetAllActions(); setActiveAction('auction'); setAuctionStep('enterDetails'); };
  const handleAuctionSubmit = (event) => { event.preventDefault(); if (!auctionName.trim()) return; console.log(`Starting auction for: ${auctionName}`); setAuctionStep('complete'); };

  // --- Render Action Buttons (Idle State) ---
  const renderActionButtons = () => (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 text-center">
          {/* Attendance Button */}
          <button onClick={startAttendance} className="group flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-blue-200/50 transform hover:-translate-y-1">
              <Users className="h-10 w-10 sm:h-12 sm:w-12 mb-3 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-semibold text-sm sm:text-base">Cargar Asistencia</span>
          </button>
          {/* Planning Button */}
          <button onClick={startPlanning} className="group flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 text-green-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-green-200/50 transform hover:-translate-y-1">
              <ClipboardCheck className="h-10 w-10 sm:h-12 sm:w-12 mb-3 text-green-600 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-semibold text-sm sm:text-base">Cargar Planificaciones</span>
          </button>
          {/* Auction Button */}
          <button onClick={startAuction} className="group flex flex-col items-center justify-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 text-yellow-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-yellow-200/50 transform hover:-translate-y-1">
              <Gavel className="h-10 w-10 sm:h-12 sm:w-12 mb-3 text-yellow-600 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-semibold text-sm sm:text-base">Iniciar Subasta Puntos</span>
          </button>
      </div>
  );

  // --- Render Active Action View ---
  const renderActiveActionView = () => {
      let content = null;
      let title = '';

      if (activeAction === 'attendance') {
          title = 'Tomar Asistencia';
          switch (attendanceStep) {
              case 'selectYear': content = ( /* ... Year Selection ... */
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">Selecciona el Año</h4>
                    <div className="flex justify-center gap-3 sm:gap-4 flex-wrap"> {[1, 2, 3].map(year => ( <button key={year} onClick={() => handleAttendanceYearSelect(year)} className="px-5 sm:px-6 py-2.5 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition duration-150 ease-in-out font-medium text-sm sm:text-base transform hover:scale-105"> {year}° Año </button> ))} </div>
                  </div>
              ); break;
              case 'taking': content = ( /* ... Student Attendance ... */
                  <div>
                     <p className="text-xs sm:text-sm text-gray-500 text-center mb-2">Alumno {currentStudentIndex + 1} / {studentList.length} ({selectedAttendanceYear}° Año)</p>
                     <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5 sm:mb-6 text-center break-words p-3 bg-indigo-50 rounded-lg border border-indigo-200">{studentList[currentStudentIndex]}</h4>
                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                        <button onClick={() => markAttendance('Presente')} className="flex items-center justify-center gap-1.5 px-3 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition duration-150 ease-in-out text-xs sm:text-sm font-medium transform hover:scale-105"> <Smile className="w-4 h-4 sm:w-5 sm:h-5"/> Presente </button>
                        <button onClick={() => markAttendance('Ausente')} className="flex items-center justify-center gap-1.5 px-3 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition duration-150 ease-in-out text-xs sm:text-sm font-medium transform hover:scale-105"> <Frown className="w-4 h-4 sm:w-5 sm:h-5"/> Ausente </button>
                        <button onClick={() => markAttendance('Justificado')} className="flex items-center justify-center gap-1.5 px-3 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-150 ease-in-out text-xs sm:text-sm font-medium transform hover:scale-105"> <Meh className="w-4 h-4 sm:w-5 sm:h-5"/> Justificado </button>
                        <button onClick={() => markAttendance('Día de Lluvia')} className="flex items-center justify-center gap-1.5 px-3 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-150 ease-in-out text-xs sm:text-sm font-medium transform hover:scale-105"> <CloudRain className="w-4 h-4 sm:w-5 sm:h-5"/> Día Lluvia </button>
                     </div>
                  </div>
              ); break;
              case 'complete': content = ( /* ... Attendance Complete ... */
                   <div className="p-6 bg-green-100 rounded-lg border border-green-300 text-center"> <Check className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mx-auto mb-3"/> <h4 className="text-md sm:text-lg font-semibold text-green-800 mb-2">¡Asistencia Completa!</h4> <p className="text-green-700 text-sm sm:text-base">Asistencia del {attendanceDate} guardada exitosamente.</p> <button onClick={resetAllActions} className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out text-sm font-medium"> Cerrar </button> </div>
              ); break;
          }
      } else if (activeAction === 'planning') {
          title = 'Cargar Planificación';
          switch (planningStep) {
              case 'selectYear': content = ( /* ... Year Selection ... */
                   <div className="text-center"> <h4 className="text-lg font-semibold text-gray-700 mb-4">Selecciona el Año</h4> <div className="flex justify-center gap-3 sm:gap-4 flex-wrap"> {[1, 2, 3].map(year => ( <button key={year} onClick={() => handlePlanningYearSelect(year)} className="px-5 sm:px-6 py-2.5 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition duration-150 ease-in-out font-medium text-sm sm:text-base transform hover:scale-105"> {year}° Año </button> ))} </div> </div>
              ); break;
              case 'uploadFile': content = ( /* ... File Upload ... */
                  <div className="text-center"> <h4 className="text-lg font-semibold text-gray-700 mb-4">Cargar Planificación ({selectedPlanningYear}° Año)</h4> <p className="text-sm text-gray-600 mb-5">Selecciona el archivo PDF.</p> <label className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md cursor-pointer hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition duration-150 ease-in-out font-medium transform hover:scale-105"> <Upload className="w-5 h-5"/> Seleccionar PDF <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" /> </label> </div>
              ); break;
              case 'complete': content = ( /* ... Planning Complete ... */
                   <div className="p-6 bg-green-100 rounded-lg border border-green-300 text-center"> <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mx-auto mb-3"/> <h4 className="text-md sm:text-lg font-semibold text-green-800 mb-2">¡Planificación Cargada!</h4> <p className="text-green-700 text-sm sm:text-base">Archivo para {subjectName} - {selectedPlanningYear}° Año cargado.</p> <button onClick={resetAllActions} className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out text-sm font-medium"> Cerrar </button> </div>
              ); break;
          }
      } else if (activeAction === 'auction') {
           title = 'Subasta de Puntos';
           switch (auctionStep) {
              case 'enterDetails': content = ( /* ... Auction Details ... */
                  <form onSubmit={handleAuctionSubmit}> <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">Iniciar Subasta</h4> <div className="mb-4"> <label htmlFor="auctionName" className="block mb-1.5 text-sm font-medium text-gray-600">Nombre Examen/Actividad:</label> <input type="text" id="auctionName" value={auctionName} onChange={(e) => setAuctionName(e.target.value)} required placeholder="Ej: Examen Parcial Unidad 1" className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base" /> </div> <div className="flex justify-center mt-5"> <button type="submit" className="px-6 py-2.5 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition duration-150 ease-in-out font-medium flex items-center justify-center gap-2 transform hover:scale-105"> <Hammer className="w-5 h-5"/> Iniciar Subasta </button> </div> </form>
              ); break;
              case 'complete': content = ( /* ... Auction Complete ... */
                   <div className="p-6 bg-green-100 rounded-lg border border-green-300 text-center"> <Gavel className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mx-auto mb-3"/> <h4 className="text-md sm:text-lg font-semibold text-green-800 mb-2">¡Subasta Iniciada!</h4> <p className="text-green-700 text-sm sm:text-base">La subasta para "{auctionName}" ha comenzado.</p> <button onClick={resetAllActions} className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out text-sm font-medium"> Cerrar </button> </div>
              ); break;
           }
      }

      // Wrap content in a container with title and cancel button if not complete
      if (content && attendanceStep !== 'complete' && planningStep !== 'complete' && auctionStep !== 'complete') {
          return (
              <div className="mt-6 p-5 sm:p-6 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in-fast shadow-inner">
                  {/* Optional Title for steps */}
                  {/* <h3 className="text-xl font-semibold text-center mb-5 text-gray-700">{title}</h3> */}
                  {content}
                  {/* Add Cancel button for intermediate steps */}
                  {(attendanceStep === 'taking' || planningStep === 'uploadFile' || auctionStep === 'enterDetails') && (
                      <button onClick={resetAllActions} className="mt-6 text-xs text-gray-500 hover:text-gray-700 mx-auto block transition-colors">Cancelar Acción</button>
                  )}
              </div>
          );
      }
      // Return content directly for completion messages or if no wrapper needed
      return content;
  };

  // --- Component Return ---
  return (
    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 md:p-10 w-full max-w-4xl border border-gray-200/50 animate-fade-in-fast">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-300 pb-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3 mb-3 sm:mb-0">
            <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600 flex-shrink-0" />
            <span className="break-words">{subjectName}</span>
          </h2>
          {activeAction === 'idle' && (
              <button onClick={onBack} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-200 ease-in-out flex items-center justify-center gap-2 text-sm font-medium self-end sm:self-center">
                  <ArrowLeft className="h-4 w-4" /> Volver al Panel
              </button>
          )}
      </div>

      {/* Render Action Buttons or Active Action View */}
      {activeAction === 'idle' ? renderActionButtons() : renderActiveActionView()}

    </div>
  );
};


// --- Floating AI Chat Button ---
const FloatingAIChatButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 p-4 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-110 animate-pulse hover:animate-none"
            aria-label="Abrir Asistente IA"
        >
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
    );
};


// --- Main Container Component ---
const ProfilePage = () => {
  // --- States ---
  const [profileData, setProfileData] = useState({ nombre: '', dni: '', rol: '', escuela: '', monedas: '', aniosEnsenia: '', materiasDicta: '', });
  const [aniosEnseniaSeleccionados, setAniosEnseniaSeleccionados] = useState([]);
  const [materiasSeleccionadas, setMateriasSeleccionadas] = useState([]);
  const [materiasPorAnio, setMateriasPorAnio] = useState({});
  const [materiaSeleccionadaParaAgregar, setMateriaSeleccionadaParaAgregar] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [currentView, setCurrentView] = useState('loading');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  // const navigate = useNavigate();

  // --- Initial Data Loading Effect ---
  // FIX: Changed dependency array to [] to ensure it runs only once on mount
  useEffect(() => {
    // Only run if view is 'loading' to prevent re-running on other view changes
    if (currentView === 'loading') {
        setMensaje('Cargando datos...'); setTipoMensaje('info');
        const timer = setTimeout(() => {
             setMateriasPorAnio({ /* ... same data ... */
                "1": { "Técnico en Programación (Resolución 4333/22)": ["BIOLOGÍA 1° Prog", "HISTORIA 1° Prog", "GEOGRAFÍA 1° Prog", "LENGUA Y LIT. 1° Prog", "INGLÉS 1° Prog", "ED. FÍSICA 1° Prog", "ÉTICA Y CIUD. 1° Prog", "MATEMÁTICA 1° Prog", "FÍSICO-QUÍMICA 1° Prog", "DIBUJO TÉCNICO 1° Prog", "TECNOLOGÍA 1° Prog", "SABERES DIGITALES 1° Prog", "TALLER Informática 1° Prog", "TALLER Gestión 1° Prog", "TALLER Específico 1° Prog", "TALLER STEAM 1° Prog"], "Técnico en Industrias de Procesos (RES N° 4719/17)": ["BIOLOGÍA 1° Ind", "HISTORIA 1° Ind", "GEOGRAFÍA 1° Ind", "LENGUA 1° Ind", "INGLÉS 1° Ind", "ED. FÍSICA 1° Ind", "INFORMÁTICA 1° Ind", "ÉTICA Y CIUD. 1° Ind", "MATEMÁTICA 1° Ind", "FÍSICO-QUÍMICA 1° Ind", "DIBUJO TÉCNICO 1° Ind", "TALLER Ajuste 1° Ind", "TALLER Hojalatería 1° Ind", "TALLER Carpintería 1° Ind", "TALLER Electricidad 1° Ind"] },
                "2": { "Técnico en Programación (Resolución 4333/22)": ["MATEMÁTICA 2° Prog", "LENGUA Y LIT. 2° Prog", "INGLÉS 2° Prog", "ED. FÍSICA 2° Prog", "HISTORIA 2° Prog", "GEOGRAFÍA 2° Prog", "BIOLOGÍA 2° Prog", "FÍSICA 2° Prog", "QUÍMICA 2° Prog", "DIBUJO TÉCNICO 2° Prog", "SABERES DIGITALES 2° Prog", "TALLER Informática 2° Prog", "TALLER Gestión 2° Prog", "TALLER Específico 2° Prog", "TALLER STEAM 2° Prog"], },
                "3": { "Técnico en Programación (Resolución 4333/22)": ["MATEMÁTICA 3° Prog", "LENGUA Y LIT. 3° Prog", "INGLÉS 3° Prog", "ED. FÍSICA 3° Prog", "HISTORIA 3° Prog", "GEOGRAFÍA 3° Prog", "BIOLOGÍA 3° Prog", "FÍSICA 3° Prog", "QUÍMICA 3° Prog", "DIBUJO TÉCNICO 3° Prog", "SABERES DIGITALES 3° Prog", "TALLER Informática 3° Prog", "TALLER Gestión 3° Prog", "TALLER Específico 3° Prog", "TALLER STEAM 3° Prog"], },
                "4": { "Técnico en Programación (Resolución 4333/22)": ["MATEMÁTICA 4° Prog", "LENGUA Y LIT. 4° Prog", "INGLÉS TÉCNICO 4° Prog", "ED. FÍSICA 4° Prog", "HISTORIA 4° Prog", "GEOGRAFÍA 4° Prog", "BIOLOGÍA 4° Prog", "FÍSICA APLICADA 4° Prog", "QUÍMICA APLICADA 4° Prog", "DIBUJO TÉCNICO 4° Prog", "SIST. OPERATIVOS 4° Prog", "BASE DE DATOS 4° Prog", "PROGRAMACIÓN I 4° Prog", "LAB. DE HARDWARE 4° Prog", "LAB. DE APLICACIONES 4° Prog"], },
                "5": { /* ... */ }, "6": { /* ... */ }
             });
            const loadedData = { ...hardcodedUser };
            setProfileData(loadedData);
            const initialAnios = loadedData.aniosEnsenia?.split(',').map(a => a.trim()).filter(Boolean) || [];
            const initialMaterias = loadedData.materiasDicta?.split(',').map(m => m.trim()).filter(Boolean) || [];
            setAniosEnseniaSeleccionados(initialAnios); setMateriasSeleccionadas(initialMaterias);
            setCurrentView('profile'); // Set view to profile AFTER loading
            setMensaje(''); setTipoMensaje(''); // Clear loading message
        }, 800);
        return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Event Handlers ---
   const handleProfileInputChange = (event) => { /* ... */
        const { name, value } = event.target;
        setProfileData(prevData => ({ ...prevData, [name]: value }));
   };
  const handleAnioCheckboxChange = (event) => { /* ... */
    const { value, checked } = event.target;
    const updatedAnios = checked ? [...aniosEnseniaSeleccionados, value].sort() : aniosEnseniaSeleccionados.filter(anio => anio !== value);
    setAniosEnseniaSeleccionados(updatedAnios);
    setProfileData(prevData => ({ ...prevData, aniosEnsenia: updatedAnios.join(',') }));
    setMateriaSeleccionadaParaAgregar('');
  };
  const getMateriasDisponibles = () => { /* ... */
    const disponibles = new Set();
    aniosEnseniaSeleccionados.forEach(anio => { const anioData = materiasPorAnio[anio]; if (anioData) { Object.values(anioData).forEach(listaMaterias => { listaMaterias.forEach(materia => { if (!materiasSeleccionadas.includes(materia)) { disponibles.add(materia); } }); }); } });
    return Array.from(disponibles).sort();
  };
  const handleAgregarMateria = () => { /* ... */
    if (materiaSeleccionadaParaAgregar && !materiasSeleccionadas.includes(materiaSeleccionadaParaAgregar)) { const updatedMaterias = [...materiasSeleccionadas, materiaSeleccionadaParaAgregar].sort(); setMateriasSeleccionadas(updatedMaterias); setProfileData(prevData => ({ ...prevData, materiasDicta: updatedMaterias.join(',') })); }
    setMateriaSeleccionadaParaAgregar('');
  };
  const handleEliminarMateria = (materiaAEliminar) => { /* ... */
     const updatedMaterias = materiasSeleccionadas.filter(m => m !== materiaAEliminar); setMateriasSeleccionadas(updatedMaterias); setProfileData(prevData => ({ ...prevData, materiasDicta: updatedMaterias.join(',') }));
  };
  const handleSubmit = async (event) => { /* ... */
    event.preventDefault(); setGuardando(true); setMensaje('Guardando cambios...'); setTipoMensaje('info'); await new Promise(resolve => setTimeout(resolve, 1000));
    const finalDataToSave = { ...profileData, aniosEnsenia: aniosEnseniaSeleccionados.join(','), materiasDicta: materiasSeleccionadas.join(',') };
    setProfileData(finalDataToSave); console.log('Guardando cambios:', finalDataToSave);
    setMensaje('Perfil actualizado con éxito.'); setTipoMensaje('success'); setGuardando(false);
    setTimeout(() => { setMensaje(''); setTipoMensaje(''); setCurrentView('dashboard'); setSelectedSubject(null); }, 1200);
  };

  // --- Navigation Handlers ---
  const handleSubjectClick = (subjectName) => { setSelectedSubject(subjectName); setCurrentView('subject'); };
  const handleBackToDashboard = () => { setSelectedSubject(null); setCurrentView('dashboard'); };
  const handleProfileEdit = () => { setCurrentView('profile'); setSelectedSubject(null); };
  const handleVolverMenu = () => { alert("Acción 'Volver al Menú' simulada."); };
  const handleAIChatClick = () => { setShowChatbot(true); };
  const handleCloseChatbot = () => { setShowChatbot(false); };

  // --- Render Logic ---
  const renderContent = () => {
    switch (currentView) {
        case 'loading': return (
             <div key="loading" className="flex items-center justify-center h-screen w-screen"> {/* Ensure loading takes full screen */}
                <div className="p-6 rounded-lg flex flex-col items-center space-y-3 bg-white shadow-xl border border-gray-200">
                    <Loader className="animate-spin h-10 w-10 text-indigo-600" />
                    <span className="text-gray-700 font-medium text-lg">{mensaje || 'Cargando...'}</span>
                </div>
             </div>
        );
        case 'dashboard': return <div key="dashboard"><TeacherDashboard userData={profileData} onSubjectClick={handleSubjectClick} onProfileEdit={handleProfileEdit} onAIChatClick={handleAIChatClick} /></div>;
        case 'subject': return <div key="subject"><SubjectPanel subjectName={selectedSubject} onBack={handleBackToDashboard} /></div>;
        case 'profile': default: return (
             <div key="profile" className="relative z-10 bg-gradient-to-br from-white via-gray-50 to-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 md:p-10 w-full max-w-4xl max-h-[95vh] overflow-y-auto border border-gray-200/80 animate-fade-in-fast">
                  {/* Header */} <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center flex items-center justify-center gap-3"> <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" /> Perfil del Profesor </h2>
                  {/* Static Data */} <div className="datos-perfil mb-6 sm:mb-8 p-4 sm:p-5 bg-gray-100/80 rounded-xl border border-gray-200/90 shadow-md"> <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-5"> {/* Name */} <div className="flex items-center text-gray-700 space-x-2.5"> <User className="h-5 w-5 text-indigo-500 flex-shrink-0" /> <div> <strong className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</strong> <span className="text-sm sm:text-base font-medium text-gray-900">{profileData.nombre || 'N/A'}</span> </div> </div> {/* DNI */} <div className="flex items-center text-gray-700 space-x-2.5"> <CreditCard className="h-5 w-5 text-indigo-500 flex-shrink-0" /> <div> <strong className="block text-xs font-medium text-gray-500 uppercase tracking-wider">DNI</strong> <span className="text-sm sm:text-base font-medium text-gray-900">{profileData.dni || 'N/A'}</span> </div> </div> {/* Rol */} <div className="flex items-center text-gray-700 space-x-2.5"> <BookUser className="h-5 w-5 text-indigo-500 flex-shrink-0" /> <div> <strong className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</strong> <span className="text-sm sm:text-base font-medium text-gray-900 capitalize">{profileData.rol || 'Profesor'}</span> </div> </div> </div> </div>
                  {/* Edit Form */} <form id="formDatos" onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-4 sm:mb-5 border-b border-gray-300 pb-3 flex items-center gap-2.5"> <Pencil className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" /> Edita tus datos </h3>
                    {/* Name Input */} <div className="form-group"> <label htmlFor="nombreInput" className="block mb-1.5 text-sm font-medium text-gray-700">Nombre completo:</label> <div className="relative"> <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><User className="h-5 w-5" /></span> <input type="text" id="nombreInput" name="nombre" value={profileData.nombre} onChange={handleProfileInputChange} required className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out text-sm sm:text-base placeholder-gray-500" placeholder="Tu nombre completo" disabled={guardando} /> </div> </div>
                    {/* DNI Input */} <div className="form-group"> <label htmlFor="dniInput" className="block mb-1.5 text-sm font-medium text-gray-700">DNI (no editable):</label> <div className="relative"> <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><CreditCard className="h-5 w-5" /></span> <input type="text" id="dniInput" name="dni" value={profileData.dni} readOnly className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-gray-100 cursor-not-allowed text-gray-600 text-sm sm:text-base" /> </div> </div>
                    {/* Years */} <fieldset className="form-group space-y-3" disabled={guardando}> <legend className="block text-sm font-medium text-gray-700 mb-2">Años en los que enseña:</legend> <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3"> {Object.keys(materiasPorAnio).map(anio => ( <label key={anio} className={`flex items-center space-x-2 p-2.5 border border-gray-300 rounded-lg transition duration-150 ease-in-out cursor-pointer ${guardando ? 'bg-gray-100 cursor-not-allowed opacity-70' : 'hover:bg-indigo-50 hover:border-indigo-400 hover:shadow-sm'}`}> <input type="checkbox" value={anio} checked={aniosEnseniaSeleccionados.includes(anio)} onChange={handleAnioCheckboxChange} className="form-checkbox rounded border-gray-400 text-indigo-600 focus:ring-indigo-500 h-4 w-4 disabled:opacity-50" disabled={guardando} /> <span className={`text-xs sm:text-sm font-medium ${guardando ? 'text-gray-500' : 'text-gray-800'}`}>{anio}° Año</span> </label> ))} </div> </fieldset>
                    {/* Subjects */} <fieldset className="form-group space-y-4" disabled={guardando}> <legend className="block text-sm font-medium text-gray-700">Materias que dicta:</legend> {aniosEnseniaSeleccionados.length > 0 ? ( <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"> <div className="relative flex-grow"> <select value={materiaSeleccionadaParaAgregar} onChange={(e) => setMateriaSeleccionadaParaAgregar(e.target.value)} className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out text-sm sm:text-base appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed" disabled={getMateriasDisponibles().length === 0 || guardando}> <option value="">-- Selecciona una materia para agregar --</option> {getMateriasDisponibles().map(materia => (<option key={materia} value={materia}>{materia}</option>))} </select> <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 pointer-events-none"> <ChevronRight className="h-5 w-5" /> </span> </div> <button type="button" onClick={handleAgregarMateria} disabled={!materiaSeleccionadaParaAgregar || guardando} className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 text-sm font-medium transform hover:scale-105"> <PlusCircle className="h-4 w-4" /> Agregar </button> </div> ) : (<p className="text-sm text-gray-500 italic mt-3 px-1">Selecciona al menos un año para poder agregar materias.</p>)} {materiasSeleccionadas.length > 0 && ( <div className="mt-4 space-y-2"> <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-1">Materias seleccionadas:</p> <ul className="flex flex-wrap gap-2"> {materiasSeleccionadas.map(materia => ( <li key={materia} className={`flex items-center bg-indigo-100 text-indigo-800 text-xs sm:text-sm font-medium pl-3 pr-1.5 py-1 rounded-full shadow-sm transition-opacity duration-150 ${guardando ? 'opacity-70' : ''}`}> <span>{materia}</span> <button type="button" onClick={() => handleEliminarMateria(materia)} className={`ml-1.5 p-0.5 rounded-full text-indigo-500 transition-colors duration-150 ${guardando ? 'cursor-not-allowed hover:text-indigo-500' : 'hover:text-red-600 hover:bg-red-100/50'}`} aria-label={`Eliminar ${materia}`} disabled={guardando}> <XCircle className="h-4 w-4" /> </button> </li> ))} </ul> </div> )} </fieldset>
                    {/* Actions */} <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-6 border-t border-gray-300 mt-6 sm:mt-8"> <button type="button" onClick={handleVolverMenu} className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-150 ease-in-out flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"> <ArrowLeft className="h-5 w-5" /> Volver </button> <button type="submit" className={`px-5 py-2.5 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out flex items-center justify-center gap-2 font-medium ${guardando ? 'opacity-70 cursor-wait' : ''} text-sm sm:text-base transform hover:scale-105`} disabled={guardando}> {guardando ? <Loader className="animate-spin h-5 w-5" /> : <Save className="h-5 w-5" />} {guardando ? 'Guardando...' : 'Guardar y Ver Panel'} </button> </div>
                    {/* Feedback */} {mensaje && !guardando && ( <div className={`mt-4 p-3 rounded-lg text-sm transition-opacity duration-300 shadow-sm ${ tipoMensaje === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : (tipoMensaje === 'error' ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-blue-100 text-blue-800 border border-blue-300') }`}> {mensaje} </div> )}
                  </form>
                </div>
            );
    }
  };

  // --- Main Return ---
  return (
    <>
      {/* Injecting CSS for animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInFast { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .animate-fade-in-fast { animation: fadeInFast 0.3s ease-out forwards; }
        @keyframes pulse { 0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); } 50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); } }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        button:hover .animate-pulse, button:focus .animate-pulse { animation: none; }
      `}</style>
      {/* Main container */}
      <div className="bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 flex items-center justify-center min-h-screen p-2 sm:p-4 font-sans antialiased">
        {renderContent()}
      </div>
      {/* Floating AI Button - Rendered outside main content flow but controlled by ProfilePage state */}
      {currentView !== 'loading' && <FloatingAIChatButton onClick={handleAIChatClick} />}
      {/* Chatbot Modal */}
      <AIChatbotModal isOpen={showChatbot} onClose={handleCloseChatbot} />
    </>
  );
};

// --- Export for use in your application ---
const App = () => {
  return <ProfilePage />;
}
export default App;
