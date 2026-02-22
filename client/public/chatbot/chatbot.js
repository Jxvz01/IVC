document.addEventListener('DOMContentLoaded', () => {
    (function () {
        // Icons
        const chatIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>`;
        const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
        const sendIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`;

        // Container
        const container = document.createElement('div');
        container.id = 'ivc-chatbot-container';
        document.body.appendChild(container);

        // Initial HTML structure
        container.innerHTML = `
            <div class="ivc-chat-bubble" id="ivc-bubble">
                ${chatIcon}
            </div>
            <div class="ivc-chat-window" id="ivc-window">
                <div class="ivc-chat-header">
                    <h3>IVC Assistant</h3>
                    <div class="ivc-chat-close" id="ivc-close">${closeIcon}</div>
                </div>
                <div class="ivc-chat-messages" id="ivc-messages">
                    <div class="ivc-message bot">
                        Hi! I'm the IVC Innovations Assistant. How can I help you with our club's projects or innovations today?
                    </div>
                </div>
                <div class="ivc-chat-input-area">
                    <input type="text" id="ivc-input" placeholder="Ask about projects..." />
                    <button class="ivc-chat-send" id="ivc-send">${sendIcon}</button>
                </div>
            </div>
        `;

        const bubble = document.getElementById('ivc-bubble');
        const window = document.getElementById('ivc-window');
        const closeBtn = document.getElementById('ivc-close');
        const sendBtn = document.getElementById('ivc-send');
        const inputField = document.getElementById('ivc-input');
        const messagesContainer = document.getElementById('ivc-messages');

        let isTyping = false;

        // Toggle Chat
        bubble.addEventListener('click', () => {
            window.classList.toggle('open');
        });

        closeBtn.addEventListener('click', () => {
            window.classList.remove('open');
        });

        // Add Message to UI
        function addMessage(text, sender) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `ivc-message ${sender}`;
            msgDiv.textContent = text;
            messagesContainer.appendChild(msgDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        // Show Typing Indicator
        function showTyping() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'ivc-message bot typing';
            typingDiv.innerHTML = `
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            `;
            typingDiv.id = 'ivc-typing';
            messagesContainer.appendChild(typingDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function hideTyping() {
            const typingDiv = document.getElementById('ivc-typing');
            if (typingDiv) typingDiv.remove();
        }

        // Handle Send
        async function handleSend() {
            const text = inputField.value.trim();
            if (!text || isTyping) return;

            inputField.value = '';
            addMessage(text, 'user');

            isTyping = true;
            showTyping();

            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: text })
                });
                const data = await response.json();

                hideTyping();
                addMessage(data.reply || "Sorry, I'm having trouble connecting right now.", 'bot');
            } catch (error) {
                console.error('Chat error:', error);
                hideTyping();
                addMessage("Error connecting to server.", 'bot');
            } finally {
                isTyping = false;
            }
        }

        if (sendBtn) sendBtn.addEventListener('click', handleSend);
        if (inputField) {
            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleSend();
            });
        }
    })();
});
