const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('WhatsApp Bot is running!'));
app.listen(3000, () => console.log('Health check server running on port 3000'));

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true
  }
});

client.on('qr', (qr) => {
  console.log('Scan this QR code with your WhatsApp:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('WhatsApp Bot is ready!');
});

// Track user sessions
const sessions = {};

const PHONE = '14073983567';

// Flow definition
const flow = {
  start: {
    msg: `🙏 Namaste! Welcome to Sri Shyam Sharma – Hindu Priest Services!

How can I help you today? Please reply with a number:

1️⃣ Looking for Pooja
2️⃣ Looking for Good Date for Pooja
3️⃣ Pooja Items List
4️⃣ Confirm Pooja Date
5️⃣ Talk to Sri Shyam Sharma Directly`,
    opts: {
      '1': 'pooja',
      '2': 'gooddate',
      '3': 'items',
      '4': 'confirm',
      '5': 'talk'
    }
  },
  pooja: {
    msg: `🪔 Which type of pooja are you looking for?

1️⃣ Wedding
2️⃣ Homam
3️⃣ Gruhapravesham (Housewarming)
4️⃣ Satyanarayana Vratam
5️⃣ Namakaranam / Aksharabhyasam
6️⃣ Seemantham / Annaprasana
7️⃣ Upanayanam
8️⃣ Shradha Karma
9️⃣ Other Pooja
0️⃣ Back to Main Menu`,
    opts: {
      '1': 'wedding',
      '2': 'homam',
      '3': 'gruha',
      '4': 'satya',
      '5': 'nama',
      '6': 'seem',
      '7': 'upana',
      '8': 'shradha',
      '9': 'other',
      '0': 'start'
    }
  },
  wedding: {
    msg: `💒 How can I help with your Wedding?

1️⃣ Looking for Wedding Dates
2️⃣ Wedding Priest Enquiry
3️⃣ Wedding Pooja Items List
4️⃣ Confirm Wedding
0️⃣ Back to Main Menu`,
    opts: {
      '1': 'weddates',
      '2': 'wedpriest',
      '3': 'weditems',
      '4': 'wedconfirm',
      '0': 'start'
    }
  },
  weddates: {
    msg: `🗓️ Find the most auspicious date for your wedding here:
👉 https://www.ushindurituals.com/find-your-good-day

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  wedpriest: {
    msg: `🙏 Sri Shyam Sharma performs traditional Vedic weddings in Telugu, Hindi & Sanskrit.

📅 Book your wedding priest:
👉 https://www.picktime.com/home/BookYourPooja

📞 Call directly: (407) 398-3567
🌐 Know more: https://www.ushindurituals.com/sri-shyam-sharma

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  weditems: {
    msg: `🪔 Wedding pooja items list:
👉 https://www.ushindurituals.com/services

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  wedconfirm: {
    msg: `📅 Please confirm your wedding date and details here:
👉 https://www.picktime.com/home/BookYourPooja

🙏 Sri Shyam Sharma will confirm your booking shortly!

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  homam: {
    msg: `🔥 Which Homam are you looking for?

1️⃣ Ganapati Homam
2️⃣ Chandi Homam
3️⃣ Navagraha Homam
4️⃣ Sudarshana Homam
5️⃣ Ayushya Homam
6️⃣ Other Homam
0️⃣ Back to Main Menu`,
    opts: {
      '1': 'homam_book',
      '2': 'homam_book',
      '3': 'homam_book',
      '4': 'homam_book',
      '5': 'homam_book',
      '6': 'homam_book',
      '0': 'start'
    }
  },
  homam_book: {
    msg: `🔥 Book your Homam here:
📅 https://www.picktime.com/home/BookYourPooja

🪔 Pooja items list:
👉 https://www.ushindurituals.com/services

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  gruha: {
    msg: `🏠 Gruhapravesham (Housewarming) service:

1️⃣ Book Gruhapravesham
2️⃣ Pooja Items List
0️⃣ Back to Main Menu`,
    opts: {
      '1': 'gruha_book',
      '2': 'gruha_items',
      '0': 'start'
    }
  },
  gruha_book: {
    msg: `📅 Book your Gruhapravesham here:
👉 https://www.picktime.com/home/BookYourPooja

🙏 Sri Shyam Sharma will confirm shortly!

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  gruha_items: {
    msg: `🪔 Gruhapravesham items list:
👉 https://www.ushindurituals.com/services

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  satya: {
    msg: `🙏 Satyanarayana Vratam service:

1️⃣ Book Satyanarayana Vratam
2️⃣ Pooja Items List
0️⃣ Back to Main Menu`,
    opts: {
      '1': 'satya_book',
      '2': 'satya_items',
      '0': 'start'
    }
  },
  satya_book: {
    msg: `📅 Book your Satyanarayana Vratam here:
👉 https://www.picktime.com/home/BookYourPooja

🙏 Sri Shyam Sharma will confirm shortly!

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  satya_items: {
    msg: `🪔 Satyanarayana Vratam items list:
👉 https://www.ushindurituals.com/services

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  nama: {
    msg: `👶 Namakaranam / Aksharabhyasam service:

1️⃣ Book Now
2️⃣ Pooja Items List
0️⃣ Back to Main Menu`,
    opts: {
      '1': 'nama_book',
      '2': 'nama_items',
      '0': 'start'
    }
  },
  nama_book: {
    msg: `📅 Book your ceremony here:
👉 https://www.picktime.com/home/BookYourPooja

🙏 Sri Shyam Sharma will confirm shortly!

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  nama_items: {
    msg: `🪔 Namakaranam / Aksharabhyasam items list:
👉 https://www.ushindurituals.com/services

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  seem: {
    msg: `🌸 Seemantham / Annaprasana service:

1️⃣ Book Now
2️⃣ Pooja Items List
0️⃣ Back to Main Menu`,
    opts: {
      '1': 'seem_book',
      '2': 'seem_items',
      '0': 'start'
    }
  },
  seem_book: {
    msg: `📅 Book your ceremony here:
👉 https://www.picktime.com/home/BookYourPooja

🙏 Sri Shyam Sharma will confirm shortly!

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  seem_items: {
    msg: `🪔 Seemantham items list:
👉 https://www.ushindurituals.com/services

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  upana: {
    msg: `🕉️ Upanayanam (Sacred Thread Ceremony) service:

1️⃣ Book Now
2️⃣ Pooja Items List
0️⃣ Back to Main Menu`,
    opts: {
      '1': 'upana_book',
      '2': 'upana_items',
      '0': 'start'
    }
  },
  upana_book: {
    msg: `📅 Book your Upanayanam here:
👉 https://www.picktime.com/home/BookYourPooja

🙏 Sri Shyam Sharma will confirm shortly!

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  upana_items: {
    msg: `🪔 Upanayanam items list:
👉 https://www.ushindurituals.com/services

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  shradha: {
    msg: `🙏 Shradha Karma / Pitru Pooja service:

1️⃣ Book Now
2️⃣ Pooja Items List
0️⃣ Back to Main Menu`,
    opts: {
      '1': 'shradha_book',
      '2': 'shradha_items',
      '0': 'start'
    }
  },
  shradha_book: {
    msg: `📅 Book your Shradha Karma here:
👉 https://www.picktime.com/home/BookYourPooja

🙏 Sri Shyam Sharma will confirm shortly!

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  shradha_items: {
    msg: `🪔 Shradha Karma items list:
👉 https://www.ushindurituals.com/services

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  other: {
    msg: `🪔 For other poojas, please visit our services page:
👉 https://www.ushindurituals.com/services

📅 Book here:
👉 https://www.picktime.com/home/BookYourPooja

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  gooddate: {
    msg: `🗓️ Find the most auspicious date for your pooja:
👉 https://www.ushindurituals.com/find-your-good-day

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  items: {
    msg: `🪔 Complete pooja items list:
👉 https://www.ushindurituals.com/services

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  confirm: {
    msg: `📅 Please confirm your pooja date and details here:
👉 https://www.picktime.com/home/BookYourPooja

🙏 Sri Shyam Sharma will confirm your booking shortly!

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  },
  talk: {
    msg: `🙏 Sri Shyam Sharma will get back to you shortly!

📞 Call directly: (407) 398-3567
🌐 Website: https://www.ushindurituals.com
📸 Instagram: https://www.instagram.com/shyam_hindupriest/
▶️ YouTube: https://www.youtube.com/@Sri_Shyam_Sharma_Hindupriest

Reply 0️⃣ to go back to Main Menu`,
    opts: { '0': 'start' }
  }
};

// Greetings that trigger the bot
const greetings = ['hi', 'hello', 'namaste', 'hii', 'hey', 'namasthe', 'hy', 'start', 'menu'];

client.on('message', async (msg) => {
  const chatId = msg.from;
  const body = msg.body.trim().toLowerCase();

  // Skip group messages
  if (chatId.includes('@g.us')) return;

  // Skip own messages
  if (msg.fromMe) return;

  const session = sessions[chatId] || { step: null };

  // Check if greeting
  if (greetings.includes(body) || session.step === null) {
    sessions[chatId] = { step: 'start' };
    await msg.reply(flow.start.msg);
    return;
  }

  // Process current step
  const currentStep = session.step;
  if (currentStep && flow[currentStep]) {
    const opts = flow[currentStep].opts;
    if (opts && opts[body]) {
      const nextStep = opts[body];
      sessions[chatId] = { step: nextStep };
      await msg.reply(flow[nextStep].msg);
    } else {
      // Invalid option
      await msg.reply(`❌ Invalid option. Please reply with a valid number.\n\n${flow[currentStep].msg}`);
    }
  } else {
    // No session — show main menu
    sessions[chatId] = { step: 'start' };
    await msg.reply(flow.start.msg);
  }
});

client.initialize();
