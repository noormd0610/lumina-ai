 import Chat from './Chat.jsx';
import './chatWindow.css';
import { useContext } from 'react';
import { MyContext } from './myContext.jsx';

function ChatWindow() {
    const { prompt, setPrompt, currThreadId, messages, setMessages, isLoading, setIsLoading, theme, setTheme } = useContext(MyContext);

    
    let getReply = async () => {
        if (!prompt.trim()) return;

        const userMessage = prompt;
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setPrompt("");
        setIsLoading(true); // show loader

        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: userMessage,
                threadId: currThreadId
            })
        };

        try {
            
            const response = await fetch( "https://lumina-ai-backend.onrender.com/api/chats", options);
            const res = await response.json();
            setMessages(prev => [...prev, { role: "assistant", content: res.reply }]);
        } catch (e) {
            console.log("Error in chatWindow: " + e);
        } finally {
            setIsLoading(false); // hide loader
        }
    };

    return (
        <div className="chatWindow">
            {/* NAVBAR */}
            <nav className="navbar">
                <div className="model-selector">
                    <span>Lumina AI <i className="fa-solid fa-chevron-down"></i></span>
                </div>

                <div className="navbar-right">
                    {/* Dark/Light Toggle */}
                    <button
                        className="theme-toggle"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        title="Toggle theme"
                    >
                        {theme === 'dark'
                            ? <i className="fa-solid fa-sun"></i>
                            : <i className="fa-solid fa-moon"></i>
                        }
                    </button>

                    <div className="userIcon">
                        <i className="fa-solid fa-user"></i>
                    </div>
                </div>
            </nav>

            {/* CHAT AREA */}
            <div className="chat-container">
                <Chat />
            </div>

            {/* INPUT */}
            <div className="chatInput-wrapper">
                <div className="userInp">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        getReply();
                    }}>
                        <input
                            type="text"
                            placeholder='Ask Lumina anything...'
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            disabled={isLoading}
                        />
                        <button type="submit" className="send-btn" disabled={isLoading || !prompt.trim()}>
                            {isLoading
                                ? <i className="fa-solid fa-spinner fa-spin"></i>
                                : <i className="fa-solid fa-arrow-up"></i>
                            }
                        </button>
                    </form>
                </div>
                <p className="disclaimer">Lumina can make mistakes. Check important info.</p>
            </div>
        </div>
    );
}

export default ChatWindow;