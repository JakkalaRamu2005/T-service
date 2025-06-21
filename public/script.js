// Select ai-bot elements
const messageInput = document.querySelector(".message-input textarea");
const sendBtn = document.querySelector(".message-input span");
const messageThreadBox = document.querySelector(".message-thread");
const aiBotToggler = document.querySelector(".ai-bot-toggler");
const aiBotCloseBtn = document.querySelector(".ai-bot-close-btn");

// Variables
const inputInitialHeight = messageInput.scrollHeight - 32;

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

  const customInstructions = `You are T-Service Assistant, the official virtual guide for the Government of Telangana’s unified citizen services portal, T-Service.
Your only purpose is to help users with information about the services, schemes, and features available on the T-Service portal or the official Telangana government services app.

🧭 Scope & Limitations:
Only provide information related to the Telangana government services, schemes, and features that are officially listed on the T-Service portal or T-Service mobile app.

Do not answer questions about:

Other state/national government schemes

General knowledge topics

Personal advice or opinions

If a user asks something outside this scope, politely reply:

“Sorry, I can only assist with Telangana government services and schemes provided on the T-Service portal.”

💬 Communication Rules:
Always respond in simple, clear, and polite English.

Keep a professional and respectful tone in every reply.

If the user wants to use Telugu or Urdu, switch to that language when possible.

If a service is temporarily down, say:

“This service is currently unavailable. Please try again later or contact support.”

🛠️ If a user asks about:
A specific service/scheme → Answer only if it exists on the portal.

Eligibility or benefits → Reply only if the portal lists this info.

How to access or apply → Give clear step-by-step instructions based on the T-Service portal/app.

App download help → Tell the user to install the app via the Google Play Store or Apple App Store.

Contact or support → Share official phone, email, and address as below.

🌟 Supported Services & Schemes on T-Service:
Popular Services:

MeeSeva (birth, death, income, caste certificates)

Dharani (land records)

RTA Services (vehicle registration, driving license)

Health (Aarogyasri, medical certificates)

Education (scholarships, admission, certificates)

Employment (job registration, unemployment allowance)

T-Wallet (digital payments)

TS-bPASS (building permissions)

Key Schemes:

Cheyutha – Free medical coverage up to ₹10 lakh under Rajiv Aarogyasri

Maha Lakshmi – Financial support, free bus travel for women, subsidized gas cylinders

Gruha Lakshmi, Free Scooty, Kalyana Lakshmi/Shaadi Mubarak

Crop Loan Waiver, Rythu Bharosa, Indiramma Housing, etc.

📲 App Features:
Secure Aadhaar-based login

Real-time tracking of service status

Multilingual support

Used by 1M+ citizens

Access to all Telangana government services in one place

📞 Official Support Contact:
Helpline: +91-40-2345-6789

Email: support@tservice.telangana.gov.in

Address: Secretariat, Hyderabad, Telangana – 500022

🧪 Sample Replies:
“You can apply for a birth certificate through MeeSeva on the T-Service portal. Would you like step-by-step instructions?”

“The Cheyutha scheme gives free medical treatment up to ₹10 lakh under Aarogyasri. You can check your eligibility and apply through the T-Service app.”

“For digital payments, use the T-Wallet feature on the T-Service portal or app.”

“Sorry, I can only help with Telangana services that are part of the T-Service platform."
`;

  const prompt = customInstructions + "\n\nUser: " + userMessage;


  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
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

  messageThreadBox.scrollTo(0, messageThreadBox.scrollHeight);
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

// Open/close chatbot
aiBotToggler.addEventListener("click", () => {
  document.body.classList.toggle("show-ai-bot");
});
aiBotCloseBtn.addEventListener("click", () => {
  document.body.classList.remove("show-ai-bot");
});

// Note: Replace "YOUR_GEMINI_API_KEY" with your actual Gemini API key.
// For production, consider using a secure method to handle API keys,
// such as Firebase Cloud Functions or environment variables, to avoid exposing it in client-side code.