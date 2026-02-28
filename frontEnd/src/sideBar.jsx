 import './sideBar.css';
import { useContext } from 'react';
import { MyContext } from './myContext.jsx';
import { v4 as uuidv4 } from 'uuid';

function SideBar() {
    const { setCurrThreadId, setMessages, threads } = useContext(MyContext);

    const handleNewChat = () => {
        setCurrThreadId(uuidv4()); // generate new thread
        setMessages([]);           // clear chat window
    };

    return (
        <section className="sideBar">
            {/* Top Section: Logo & New Chat */}
            <div className="side-top">
                <div className="logo-container">
                    <img src="/src/newLogo2.png" alt="Lumina Logo" className="logo-img" />
                    <span>Lumina AI</span>
                </div>
                <button className="new-chat-btn" onClick={handleNewChat}>
                    <i className="fa-solid fa-plus"></i>
                    <span>New Chat</span>
                    <i className="fa-solid fa-pen-to-square edit-icon"></i>
                </button>
            </div>

            {/* Middle Section: Scrollable History */}
            <div className="side-history">
                <p className="history-label">Recent</p>
                <ul>
                    {threads && threads.length > 0 ? (
                        threads.map((thread) => (
                            <li key={thread._id} onClick={() => {
                                setCurrThreadId(thread.threadId);
                                setMessages(thread.messages);
                            }}>
                                <i className="fa-regular fa-message"></i>
                                <span>{thread.title}</span>
                            </li>
                        ))
                    ) : (
                        <li className="no-history">No chats yet</li>
                    )}
                </ul>
            </div>

            {/* Bottom Section: User Profile */}
            <div className="side-bottom">
                <div className="user-section">
                    <div className="user-avatar">N</div>
                    <div className="user-info">
                        <p className="user-name">Noor Md</p>
                        <p className="user-plan">Free Plan</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SideBar;