const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');

const sessions = {};
const greetings = ['hi', 'hello', 'namaste', 'hii', 'hey', 'namasthe', 'hy', 'start', 'menu', 'hai'];

const flow = {
  start: { msg: `🙏 Namaste! Welcome to Sri Shyam Sharma – Hindu Priest Services!\n\nHow can I help you today?\n\n1️⃣ Looking for Pooja\n2️⃣ Looking for Good Date for Pooja\n3️⃣ Pooja Items List\n4️⃣ Confirm Pooja Date\n5️⃣ Talk to Sri Shyam Sharma`, opts: {'1':'pooja','2':'gooddate','3':'items','4':'confirm','5':'talk'} },
  pooja: { msg: `🪔 Which pooja?\n\n1️⃣ Wedding\n2️⃣ Homam\n3️⃣ Gruhapravesham\n4️⃣ Satyanarayana Vratam\n5️⃣ Namakaranam/Aksharabhyasam\n6️⃣ Seemantham/Annaprasana\n7️⃣ Upanayanam\n8️⃣ Shradha Karma\n9️⃣ Other\n0️⃣ Main Menu`, opts: {'1':'wedding','2':'homam','3':'gruha','4':'satya','5':'nama','6':'seem','7':'upana','8':'shradha','9':'other','0':'start'} },
  wedding: { msg: `💒 Wedding help:\n\n1️⃣ Wedding Dates\n2️⃣ Priest Enquiry\n3️⃣ Items List\n4️⃣ Confirm Wedding\n0️⃣ Main Menu`, opts: {'1':'weddates','2':'wedpriest','3':'weditems','4':'wedconfirm','0':'start'} },
  weddates: { msg: `🗓️ Find auspicious wedding date:\n👉 https://www.ushindurituals.com/find-your-good-day\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  wedpriest: { msg: `🙏 Book wedding priest:\n📅 https://www.picktime.com/home/BookYourPooja\n📞 (407) 398-3567\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  weditems: { msg: `🪔 Wedding items list:\n👉 https://www.ushindurituals.com/services\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  wedconfirm: { msg: `📅 Confirm wedding:\n👉 https://www.picktime.com/home/BookYourPooja\n\n🙏 Will confirm shortly!\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  homam: { msg: `🔥 Which Homam?\n\n1️⃣ Ganapati\n2️⃣ Chandi\n3️⃣ Navagraha\n4️⃣ Sudarshana\n5️⃣ Ayushya\n6️⃣ Other\n0️⃣ Main Menu`, opts: {'1':'homam_book','2':'homam_book','3':'homam_book','4':'homam_book','5':'homam_book','6':'homam_book','0':'start'} },
  homam_book: { msg: `🔥 Book Homam:\n📅 https://www.picktime.com/home/BookYourPooja\n🪔 Items: https://www.ushindurituals.com/services\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  gruha: { msg: `🏠 Gruhapravesham:\n1️⃣ Book Now\n2️⃣ Items List\n0️⃣ Main Menu`, opts: {'1':'gruha_book','2':'gruha_items','0':'start'} },
  gruha_book: { msg: `📅 Book Gruhapravesham:\n👉 https://www.picktime.com/home/BookYourPooja\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  gruha_items: { msg: `🪔 Items list:\n👉 https://www.ushindurituals.com/services\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  satya: { msg: `🙏 Satyanarayana Vratam:\n1️⃣ Book Now\n2️⃣ Items List\n0️⃣ Main Menu`, opts: {'1':'satya_book','2':'satya_items','0':'start'} },
  satya_book: { msg: `📅 Book:\n👉 https://www.picktime.com/home/BookYourPooja\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  satya_items: { msg: `🪔 Items:\n👉 https://www.ushindurituals.com/services\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  nama: { msg: `👶 Namakaranam/Aksharabhyasam:\n1️⃣ Book Now\n2️⃣ Items List\n0️⃣ Main Menu`, opts: {'1':'nama_book','2':'nama_items','0':'start'} },
  nama_book: { msg: `📅 Book:\n👉 https://www.picktime.com/home/BookYourPooja\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  nama_items: { msg: `🪔 Items:\n👉 https://www.ushindurituals.com/services\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  seem: { msg: `🌸 Seemantham/Annaprasana:\n1️⃣ Book Now\n2️⃣ Items List\n0️⃣ Main Menu`, opts: {'1':'seem_book','2':'seem_items','0':'start'} },
  seem_book: { msg: `📅 Book:\n👉 https://www.picktime.com/home/BookYourPooja\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  seem_items: { msg: `🪔 Items:\n👉 https://www.ushindurituals.com/services\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  upana: { msg: `🕉️ Upanayanam:\n1️⃣ Book Now\n2️⃣ Items List\n0️⃣ Main Menu`, opts: {'1':'upana_book','2':'upana_items','0':'start'} },
  upana_book: { msg: `📅 Book:\n👉 https://www.picktime.com/home/BookYourPooja\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  upana_items: { msg: `🪔 Items:\n👉 https://www.ushindurituals.com/services\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  shradha: { msg: `🙏 Shradha Karma:\n1️⃣ Book Now\n2️⃣ Items List\n0️⃣ Main Menu`, opts: {'1':'shradha_book','2':'shradha_items','0':'start'} },
  shradha_book: { msg: `📅 Book:\n👉 https://www.picktime.com/home/BookYourPooja\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  shradha_items: { msg: `🪔 Items:\n👉 https://www.ushindurituals.com/services\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  other: { msg: `🪔 All services:\n👉 https://www.ushindurituals.com/services\n📅 https://www.picktime.com/home/BookYourPooja\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  gooddate: { msg: `🗓️ Find good date:\n👉 https://www.ushindurituals.com/find-your-good-day\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  items: { msg: `🪔 Pooja items list:\n👉 https://www.ushindurituals.com/services\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  confirm: { msg: `📅 Confirm pooja date:\n👉 https://www.picktime.com/home/BookYourPooja\n\n🙏 Will confirm shortly!\n\nReply 0 for Main Menu`, opts: {'0':'start'} },
  talk: { msg: `🙏 Sri Shyam Sharma will contact you shortly!\n\n📞 (407) 398-3567\n🌐 https://www.ushindurituals.com\n📸 https://www.instagram.com/shyam_hindupriest/\n▶️ https://www.youtube.com/@Sri_Shyam_Sharma_Hindupriest\n\nReply 0 for Main Menu`, opts: {'0':'start'} }
};

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');
  const sock = makeWASocket({ auth: state, printQRInTerminal: true });
  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
    if (qr) { console.log('\n📱 Scan QR code with WhatsApp:\n'); qrcode.generate(qr, { small: true }); }
    if (connection === 'close') {
      const reconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (reconnect) startBot();
    } else if (connection === 'open') { console.log('\n✅ Bot is ready!\n'); }
  });
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg?.message || msg.key.fromMe) return;
    const from = msg.key.remoteJid;
    if (from.includes('@g.us')) return;
    const body = (msg.message?.conversation || msg.message?.extendedTextMessage?.text || '').trim().toLowerCase();
    if (!body) return;
    const session = sessions[from] || { step: null };
    if (greetings.includes(body) || !session.step) {
      sessions[from] = { step: 'start' };
      await sock.sendMessage(from, { text: flow.start.msg });
      return;
    }
    const cur = session.step;
    if (cur && flow[cur]?.opts?.[body]) {
      const next = flow[cur].opts[body];
      sessions[from] = { step: next };
      await sock.sendMessage(from, { text: flow[next].msg });
    } else if (cur && flow[cur]) {
      await sock.sendMessage(from, { text: `❌ Invalid option. Please reply with a valid number.\n\n${flow[cur].msg}` });
    } else {
      sessions[from] = { step: 'start' };
      await sock.sendMessage(from, { text: flow.start.msg });
    }
  });
}

startBot().catch(console.error);
