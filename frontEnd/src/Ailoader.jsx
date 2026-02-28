import './AiLoader.css';

function AiLoader() {
  return (
    <div className="ai-loader-wrapper">
      <div className="orb-container">
        <div className="orb-ring"></div>
        <div className="orb-ring ring-2"></div>
        <div className="orb">
          <div className="orb-blob blob-1"></div>
          <div className="orb-blob blob-2"></div>
          <div className="orb-blob blob-3"></div>
        </div>
      </div>
      <span className="loader-text">Lumina is thinking<span className="dots"><span>.</span><span>.</span><span>.</span></span></span>
    </div>
  );
}

export default AiLoader;