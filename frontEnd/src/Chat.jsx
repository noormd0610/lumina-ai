 import { useContext, useEffect, useRef } from 'react';
import { MyContext } from './myContext.jsx';
import AiLoader from './Ailoader.jsx';

function formatMessage(text) {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
      return (
        <div key={i} className="msg-bullet">
          <span className="bullet-dot">◆</span>
          <span>{parts}</span>
        </div>
      );
    }
    if (/^\d+\./.test(line.trim())) {
      return <div key={i} className="msg-numbered">{parts}</div>;
    }
    if (line.trim().endsWith(':') && line.trim().length < 60) {
      return <div key={i} className="msg-heading">{parts}</div>;
    }
    return <p key={i} className="msg-para">{parts}</p>;
  });
}

function Chat() {
  const { messages, isLoading } = useContext(MyContext);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="welcome-screen">
        <h2>Good to see you ✦</h2>
        <p>Ask Lumina anything. Your ideas deserve great answers.</p>
      </div>
    );
  }

  return (
    <div className="chat-area">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.role}`}>
          <span className="message-label">
            {msg.role === 'user' ? 'You' : 'Lumina'}
          </span>
          <div className="message-bubble">
            {msg.role === 'assistant'
              ? formatMessage(msg.content)
              : <p className="msg-para">{msg.content}</p>
            }
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="message assistant">
          <span className="message-label">Lumina</span>
          <AiLoader />
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}

export default Chat;