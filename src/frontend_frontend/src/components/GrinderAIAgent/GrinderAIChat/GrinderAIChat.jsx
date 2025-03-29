import { useState, useEffect, useRef } from "react"
import "./GrinderAIChat.css"

const predefinedResponses = [
  "Интересный вопрос! Давайте разберем это подробнее.",
  "Я понимаю вашу точку зрения. Вот что я думаю по этому поводу...",
  "Это сложная тема. Вот несколько ключевых моментов, которые стоит учесть.",
  "Спасибо за ваш вопрос. Вот что я могу сказать на эту тему...",
  "Я не уверен, но могу предположить следующее...",
]

function GrinderAIChat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, []) // Removed unnecessary dependency 'messages'

  const simulateAIResponse = async () => {
    setIsTyping(true)
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))
    const randomResponse = predefinedResponses[Math.floor(Math.random() * predefinedResponses.length)]
    setMessages((prevMessages) => [...prevMessages, { id: Date.now(), content: randomResponse, role: "assistant" }])
    setIsTyping(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages((prevMessages) => [...prevMessages, { id: Date.now(), content: input, role: "user" }])
      setInput("")
      simulateAIResponse()
    }
  }

  return (
    <div className="chat-container">
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
  )
}

export default GrinderAIChat