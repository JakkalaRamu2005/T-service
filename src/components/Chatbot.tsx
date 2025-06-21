import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css'; // Assuming you save the CSS in Chatbot.css

const Chatbot: React.FC = () => {
  const chatboxRef = useRef<HTMLUListElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const createChatLi = (message: string, className: string) => {
    const chatLi = document.createElement('li');
    chatLi.classList.add('chat', `${className}`);
    let chatContent = className === 'outgoing' ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector('p')!.textContent = message;
    return chatLi;
  };

  const generateResponse = async (incomingChatLi: HTMLLIElement) => {
    const API_URL = "YOUR_API_URL"; // Replace with your actual API URL
    const messageElement = incomingChatLi.querySelector('p')!;
    const userMessage = chatInputRef.current!.value.trim();

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY' // Replace with your actual API key
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Or your preferred model
        messages: [{ role: 'user', content: userMessage }],
      }),
    };

    try {
      const res = await fetch(API_URL, requestOptions);
      const data = await res.json();
      messageElement.textContent = data.choices[0].message.content;
    } catch (error) {
      messageElement.classList.add('error');
      messageElement.textContent = 'Oops! Something went wrong. Please try again.';
    } finally {
      if (chatboxRef.current) {
        chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);
      }
    }
  };

  const handleChat = () => {
    if (!chatInputRef.current) return;

    const userMessage = chatInputRef.current.value.trim();
    if (!userMessage) return;

    chatInputRef.current.value = '';

    if (chatboxRef.current) {
      chatboxRef.current.appendChild(createChatLi(userMessage, 'outgoing'));
      chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);

      setTimeout(() => {
        const incomingChatLi = createChatLi('Thinking...', 'incoming');
        chatboxRef.current!.appendChild(incomingChatLi);
        chatboxRef.current!.scrollTo(0, chatboxRef.current!.scrollHeight);
        generateResponse(incomingChatLi);
      }, 600);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleChat();
      }
    };

    const currentChatInput = chatInputRef.current;
    if (currentChatInput) {
      currentChatInput.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (currentChatInput) {
        currentChatInput.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <>
      {chatbotOpen && (
        <div className="chatbot">
          <header>
            <h2>Chatbot</h2>
            <span
              className="close-btn material-symbols-outlined"
              onClick={() => setChatbotOpen(false)}
            >
              close
            </span>
          </header>
          <ul className="chatbox" ref={chatboxRef}>
            <li className="chat incoming">
              <span className="material-symbols-outlined">smart_toy</span>
              <p>
                Hi there 👋
                <br />
                How can I help you today?
              </p>
            </li>
          </ul>
          <div className="chat-input">
            <textarea
              placeholder="Enter a message..."
              spellCheck="false"
              required
              ref={chatInputRef}
            ></textarea>
            <span
              id="send-btn"
              className="material-symbols-outlined"
              onClick={handleChat}
            >
              send
            </span>
          </div>
        </div>
      )}
      <div className="chatbot-toggler" onClick={() => setChatbotOpen(!chatbotOpen)}>
        <span className="material-symbols-outlined">mode_comment</span>
        <span className="material-symbols-outlined">close</span>
      </div>
    </>
  );
};

export default Chatbot;