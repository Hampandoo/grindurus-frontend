import { useState, useEffect, useRef } from "react";
import "./GrinderAIChat.css";

const predefinedResponses = [
  "Interesting question! Let's break this down in more detail.",
  "I understand your point of view. Here's what I think about it...",
  "This is a complex topic. Here are a few key points to consider.",
  "Thank you for your question. Here's what I can say on this topic...",
  "I'm not sure, but I can make the following assumption..."
];

function GrinderAIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // Стан для відкриття чату
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, []); // Відкриваємо чат при завантаженні

  const simulateAIResponse = async () => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));
    const randomResponse = predefinedResponses[Math.floor(Math.random() * predefinedResponses.length)];
    setMessages((prevMessages) => [...prevMessages, { id: Date.now(), content: randomResponse, role: "assistant" }]);
    setIsTyping(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages((prevMessages) => [...prevMessages, { id: Date.now(), content: input, role: "user" }]);
      setInput("");
      simulateAIResponse();
    }
  };

  const toggleChatWindow = () => {
    setIsChatOpen(!isChatOpen); // Перемикає стан чату
  };

  const closeChat = () => {
    setIsChatOpen(false); // Закриває чат
  };

  return (
    <div>
      {/* Іконка чату в правому кутку */}
      <div className="chat-icon" onClick={toggleChatWindow}>
        <span role="img" aria-label="robot">🤖</span>
      </div>

      {/* Вікно чату */}
      {isChatOpen && (
        <div className="chat-container">
          {/* Кнопка закриття чату */}
          <button className="close-chat" onClick={closeChat}>✖</button>
          <div className="chat-messages">
            {messages.map((m) => (
              <div key={m.id} className={`message ${m.role}`}>
                <span className="message-content">{m.content}</span>
              </div>
            ))}
            {isTyping && (
              <div className="typing-indicator">
                <span>AI печатает...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="chat-form">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter the question"
              className="chat-input"
            />
            <button type="submit" className="chat-submit">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default GrinderAIChat;
