// Telegram Bot Configuration
const BOT_TOKEN = '8680827659:AAHXMa-l2a6xVRovvQ6G0a9xKs4AchJYRpQ';

// Use your username instead of chat ID (more reliable)
const CHAT_USERNAME = '@somsokraksa217721setec'; // Your Telegram username with @

// API URL for Telegram Bot
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// Helper function to escape HTML
const escapeHtml = (text) => {
  if (!text) return 'N/A';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// Helper function to format discount message
const formatDiscountMessage = (discountPercentage, discountAmount) => {
  if (discountPercentage === 80) {
    return `🎉 <b>MEGA DEAL!</b> 80% OFF applied! 🎉\n   Saved: $${discountAmount.toFixed(2)}`;
  } else if (discountPercentage === 10) {
    return `💰 <b>10% Discount Applied!</b>\n   Saved: $${discountAmount.toFixed(2)}`;
  }
  return '';
};

// Helper function to format shipping message
const formatShippingMessage = (shippingCost, isFreeShipping) => {
  if (isFreeShipping) {
    return `🚚 <b>FREE SHIPPING</b> - Promo code applied! 🎁`;
  }
  return `📦 Shipping Cost: $${shippingCost.toFixed(2)}`;
};

// Function to send message to Telegram
export const sendTelegramMessage = async (message, parseMode = 'HTML') => {
  try {
    const response = await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_USERNAME,
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
            chat_id: '1133038010',
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
    return null;
  }
};

// Function to send order confirmation with discount info
export const sendOrderToTelegram = async (orderData, user) => {
  let itemsList = '';
  orderData.items.forEach((item, index) => {
    itemsList += `${index + 1}. ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
  });
  
  // Create discount section
  let discountSection = '';
  if (orderData.discount > 0) {
    if (orderData.discountPercentage === 80) {
      discountSection = `
🎉 <b>🎯 SPECIAL DISCOUNT 🎯</b>
━━━━━━━━━━━━━━━━━━━━━━
✨ <b>RAKSA168 Promo Code Applied!</b>
💸 <b>80% OFF</b> - MEGA SAVINGS!
💰 <b>You saved:</b> $${orderData.discount.toFixed(2)}
━━━━━━━━━━━━━━━━━━━━━━`;
    } else if (orderData.promoCode === 'FREESHIP') {
      discountSection = `
🚚 <b>FREE SHIPPING PROMO!</b>
━━━━━━━━━━━━━━━━━━━━━━
📦 <b>FREESHIP Code Applied!</b>
🎁 <b>Shipping Cost:</b> FREE
━━━━━━━━━━━━━━━━━━━━━━`;
    } else {
      discountSection = `
💰 <b>DISCOUNT APPLIED</b>
━━━━━━━━━━━━━━━━━━━━━━
🎫 <b>Promo Code:</b> ${orderData.promoCode}
💸 <b>Discount Amount:</b> $${orderData.discount.toFixed(2)}
━━━━━━━━━━━━━━━━━━━━━━`;
    }
  }
  
  // Create shipping section
  const shippingText = orderData.shipping === 0 
    ? '🚚 <b>FREE SHIPPING</b> (Promo Code Applied)' 
    : `📦 <b>Shipping Cost:</b> $${orderData.shipping.toFixed(2)}`;
  
  const message = `
🛍️ <b>🆕 NEW ORDER RECEIVED! 🆕</b>
━━━━━━━━━━━━━━━━━━━━━━

👤 <b>Customer Information:</b>
• Name: ${escapeHtml(orderData.firstName || user?.name || 'Guest')} ${escapeHtml(orderData.lastName || '')}
• Email: ${escapeHtml(user?.email || orderData.email)}
• Phone: ${escapeHtml(orderData.phone || 'Not provided')}

━━━━━━━━━━━━━━━━━━━━━━
📦 <b>ORDER DETAILS</b>
━━━━━━━━━━━━━━━━━━━━━━
${itemsList}

━━━━━━━━━━━━━━━━━━━━━━
💰 <b>PRICE BREAKDOWN</b>
━━━━━━━━━━━━━━━━━━━━━━
• Subtotal: $${orderData.subtotal.toFixed(2)}
• ${orderData.shipping === 0 ? '🚚 Shipping: FREE' : `📦 Shipping: $${orderData.shipping.toFixed(2)}`}
${orderData.discount > 0 ? `• 🎉 Discount: -$${orderData.discount.toFixed(2)}` : ''}
━━━━━━━━━━━━━━━━━━━━━━
<b>💵 TOTAL AMOUNT: $${orderData.total.toFixed(2)}</b>
━━━━━━━━━━━━━━━━━━━━━━

${discountSection}

📮 <b>SHIPPING ADDRESS</b>
━━━━━━━━━━━━━━━━━━━━━━
${escapeHtml(orderData.address)}
${escapeHtml(orderData.city)}, ${escapeHtml(orderData.state)} ${escapeHtml(orderData.zip)}

🚚 <b>SHIPPING METHOD:</b> ${escapeHtml(orderData.shippingMethod || 'Standard')}
💳 <b>PAYMENT METHOD:</b> ${escapeHtml(orderData.paymentMethod || 'Card')}

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

// Function to send product inquiry
export const sendProductInquiryToTelegram = async (product, user, message) => {
  const messageText = `
❓ <b>Product Inquiry</b>
━━━━━━━━━━━━━━━━━━━━━━

👤 <b>User:</b> ${escapeHtml(user?.name || 'Guest')}
📧 <b>Email:</b> ${escapeHtml(user?.email || 'Not provided')}

📦 <b>Product:</b> ${escapeHtml(product.name)}
🏷️ <b>Product ID:</b> ${product.id}
💰 <b>Price:</b> $${product.price}

💬 <b>Message:</b>
${escapeHtml(message)}

━━━━━━━━━━━━━━━━━━━━━━
🕐 <b>Time:</b> ${new Date().toLocaleString()}
  `;
  
  return sendTelegramMessage(messageText);
};

// Function to send checkout completion
export const sendCheckoutToTelegram = async (checkoutData, cart, user) => {
  let itemsList = '';
  cart.items.forEach((item, index) => {
    itemsList += `${index + 1}. ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
  });
  
  const message = `
💳 <b>Checkout Initiated</b>
━━━━━━━━━━━━━━━━━━━━━━

👤 <b>Customer:</b> ${escapeHtml(user?.name || 'Guest')}
📧 <b>Email:</b> ${escapeHtml(checkoutData.email)}
📞 <b>Phone:</b> ${escapeHtml(checkoutData.phone || 'Not provided')}

<b>🛒 Cart Items:</b>
${itemsList}

<b>💰 Total Amount:</b> $${cart.total.toFixed(2)}

<b>📮 Shipping Address:</b>
${escapeHtml(checkoutData.address)}
${escapeHtml(checkoutData.city)}, ${escapeHtml(checkoutData.state)} ${escapeHtml(checkoutData.zip)}

<b>🚚 Shipping Method:</b> ${escapeHtml(checkoutData.shippingMethod)}
<b>💳 Payment Method:</b> ${escapeHtml(checkoutData.paymentMethod)}

━━━━━━━━━━━━━━━━━━━━━━
🕐 <b>Time:</b> ${new Date().toLocaleString()}
  `;
  
  return sendTelegramMessage(message);
};