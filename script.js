// Select ai-bot elements
const messageInput = document.querySelector(".message-input textarea");
const sendBtn = document.querySelector(".message-input span");
const messageThreadBox = document.querySelector(".message-thread");
const aiBotToggler = document.querySelector(".ai-bot-toggler");
const aiBotCloseBtn = document.querySelector(".ai-bot-close-btn");

// Variables
let inputInitialHeight;

// Ensure elements are loaded before accessing properties
document.addEventListener('DOMContentLoaded', (event) => {
  if (messageInput) {
    inputInitialHeight = messageInput.scrollHeight - 32;

    // Auto resize input and handle Enter key
    messageInput.addEventListener("input", (e) => {
      messageInput.style.height = `${inputInitialHeight}px`;
      messageInput.style.height = `${messageInput.scrollHeight - 32}px`;
    });
    messageInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 480) {
        e.preventDefault();
        handleChat();
      }
    });

    // Button click
    sendBtn.addEventListener("click", handleChat);
  }

  // Open/close chatbot
  if (aiBotToggler) {
    aiBotToggler.addEventListener("click", () => {
      document.body.classList.toggle("show-ai-bot");
    });
  }
  if (aiBotCloseBtn) {
    aiBotCloseBtn.addEventListener("click", () => {
      document.body.classList.remove("show-ai-bot");
    });
  }

});


// Create message bubble
const createMessageLine = (message, className) => {
  const listElement = document.createElement("li");
  listElement.classList.add("message", className);

  const chatContent = className === "outgoing"
    ? `<p></p>`
    : `<span><img src="https://res.cloudinary.com/dcsglluc4/image/upload/v1750420560/ai-bot-avatar_ao0mim.png" alt="AI Bot Avatar"></span><p></p>`;

  listElement.innerHTML = chatContent;
  listElement.querySelector("p").textContent = message;
  return listElement;
};

// Gemini Free API integration
const generateResponse = async (incomingListItem, userMessage) => {
  const apiKey = "AIzaSyAWFB1Ecu-EYnG793pQS9FZDPD141g2hmo"; // Replace with your API key or use a secure method to handle it
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: userMessage }]
          }
        ]
      })
    });

    const data = await res.json();

    if (data?.candidates?.length > 0) {
      const botReply = data.candidates[0].content.parts[0].text;
      incomingListItem.querySelector("p").textContent = botReply;
    } else {
      incomingListItem.querySelector("p").textContent = "Sorry, I didn’t understand. Try again.";
    }
  } catch (error) {
    incomingListItem.querySelector("p").textContent = "An error occurred. Please try again.";
    incomingListItem.querySelector("p").classList.add("error");
    console.error("Gemini API Error:", error);
  }

  if (messageThreadBox) {
      messageThreadBox.scrollTo(0, messageThreadBox.scrollHeight);
  }
};

// Handle chat
const handleChat = () => {
  const userMessage = messageInput.value.trim();
  if (!userMessage) return;

  // Clear input
  messageInput.value = "";
  messageInput.style.height = `${inputInitialHeight}px`;

  // Show user message
  messageThreadBox.appendChild(createMessageLine(userMessage, "outgoing"));
  messageThreadBox.scrollTo(0, messageThreadBox.scrollHeight);

  // Show bot thinking message
  const incomingListItem = createMessageLine("Thinking ...", "incoming");
  messageThreadBox.appendChild(incomingListItem);
  messageThreadBox.scrollTo(0, messageThreadBox.scrollHeight);

  // Get AI response
  generateResponse(incomingListItem, userMessage);
};


// Note: Replace "AIzaSyAWFB1Ecu-EYnG793pQS9FZDPD141g2hmo" with your actual Gemini API key.
// For production, consider using a secure method to handle API keys,
// such as Firebase Cloud Functions or environment variables, to avoid exposing it in client-side code.