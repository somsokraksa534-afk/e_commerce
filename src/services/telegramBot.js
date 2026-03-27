// Telegram Bot Configuration
const BOT_TOKEN = '8680827659:AAHXMa-l2a6xVRovvQ6G0a9xKs4AchJYRpQ';

// Use your username instead of chat ID (more reliable)
const CHAT_USERNAME = '@somsokraksa217721setec'; // Your Telegram username with @

// Alternative: Use chat ID (get it from @userinfobot)
// const CHAT_ID = '1133038010';

// API URL for Telegram Bot
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// Helper function to escape HTML
const escapeHtml = (text) => {
  if (!text) return 'N/A';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// Function to send message to Telegram
export const sendTelegramMessage = async (message, parseMode = 'HTML') => {
  try {
    // Try using username first, fallback to chat ID
    const response = await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_USERNAME, // Using username is more reliable
        text: message,
        parse_mode: parseMode,
      }),
    });
    
    const data = await response.json();
    if (!data.ok) {
      // If username fails, try with chat ID
      if (data.description.includes('chat not found')) {
        const fallbackResponse = await fetch(`${TELEGRAM_API}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: '1133038010', // Your chat ID
            text: message,
            parse_mode: parseMode,
          }),
        });
        const fallbackData = await fallbackResponse.json();
        if (!fallbackData.ok) {
          throw new Error(fallbackData.description);
        }
        return fallbackData;
      }
      throw new Error(data.description);
    }
    return data;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    // Don't throw - just log error so checkout doesn't fail
    return null;
  }
};

// Function to send order confirmation
export const sendOrderToTelegram = async (orderData, user) => {
  let itemsList = '';
  orderData.items.forEach((item, index) => {
    itemsList += `${index + 1}. ${item.name} x${item.quantity} - $${item.price * item.quantity}\n`;
  });
  
  const message = `
🛍️ <b>New Order Received!</b>
━━━━━━━━━━━━━━━━━━━━━━

👤 <b>Customer:</b> ${escapeHtml(user?.name || 'Guest')}
📧 <b>Email:</b> ${escapeHtml(user?.email || orderData.email)}
📞 <b>Phone:</b> ${escapeHtml(orderData.phone || 'Not provided')}

<b>📦 Order Details:</b>
${itemsList}

<b>💰 Order Summary:</b>
• Subtotal: $${orderData.subtotal}
• Shipping: $${orderData.shipping}
• Total: $${orderData.total}

<b>🚚 Shipping Address:</b>
${escapeHtml(orderData.address)}
${escapeHtml(orderData.city)}, ${escapeHtml(orderData.state)} ${escapeHtml(orderData.zip)}

━━━━━━━━━━━━━━━━━━━━━━
🕐 <b>Order Time:</b> ${new Date().toLocaleString()}
  `;
  
  return sendTelegramMessage(message);
};

// Function to send contact form data
export const sendContactFormToTelegram = async (formData) => {
  const message = `
📬 <b>New Contact Form Submission</b>
━━━━━━━━━━━━━━━━━━━━━━

👤 <b>Name:</b> ${escapeHtml(formData.name)}
📧 <b>Email:</b> ${escapeHtml(formData.email)}
📋 <b>Subject:</b> ${escapeHtml(formData.subject)}
💬 <b>Message:</b>
${escapeHtml(formData.message)}

━━━━━━━━━━━━━━━━━━━━━━
🕐 <b>Time:</b> ${new Date().toLocaleString()}
  `;
  
  return sendTelegramMessage(message);
};

// Function to send newsletter subscription
export const sendNewsletterToTelegram = async (email) => {
  const message = `
📧 <b>New Newsletter Subscription!</b>
━━━━━━━━━━━━━━━━━━━━━━

📧 <b>Email:</b> ${escapeHtml(email)}
🕐 <b>Time:</b> ${new Date().toLocaleString()}
  `;
  
  return sendTelegramMessage(message);
};

// Function to send user registration notification
export const sendRegistrationToTelegram = async (userData) => {
  const message = `
🎉 <b>New User Registration!</b>
━━━━━━━━━━━━━━━━━━━━━━

👤 <b>Name:</b> ${escapeHtml(userData.name)}
📧 <b>Email:</b> ${escapeHtml(userData.email)}
🕐 <b>Registered:</b> ${new Date().toLocaleString()}
  `;
  
  return sendTelegramMessage(message);
};