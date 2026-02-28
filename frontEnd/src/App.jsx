 import './App.css'
import ChatWindow from './chatWindow.jsx';
import { MyContext } from './myContext.jsx';
import SideBar from './sideBar.jsx';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv4());
  const [messages, setMessages] = useState([]);
  const [threads, setThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('dark');



//   <div className={`app ${theme}`}>
//   <MyContext.Provider value={providerValues}>
//     {sidebarOpen && <SideBar />}
//     <ChatWindow />
//   </MyContext.Provider>
// </div>

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Fetch all threads on load
  useEffect(() => {
    fetch( "https://lumina-ai-backend.onrender.com/api/threads")
      .then(res => res.json())
      .then(data => setThreads(data))
      .catch(err => console.log("Error fetching threads:", err));
  }, []);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    messages, setMessages,
    threads, setThreads,
    isLoading, setIsLoading,
    theme, setTheme
  };

  return (
    <div className={`app ${theme}`}>
      <MyContext.Provider value={providerValues}>
        <SideBar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  );
}

export default App;