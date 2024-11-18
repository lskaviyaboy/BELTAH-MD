const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUN3YnFhQ3ViM1NIUWxwbkFXcVhJWXV4dFFvTEpJS0JVWlBFU0ltalVFbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTzJiQzJSazFOTEFyWmxKbHVDTURzSDdiU3E2WlNxZFZyQlU4VnpRQ1FHdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0T0tUT000L0RyM2RuUUtuR3pHSzdUL1pWcXRPTG5jZXY0UVdmMVdZUldJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIZXg2V2pzU1o5cG5LQWV1bzJTNHIrdmQ5OHZtZFdCME8xZzI5WGdoNUZFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1CVERTYlRXR24yQXBjRDc1WkkvenMyZnFqbjgzekJ6Qm1PUGJ5M292bU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlorOWVSbzdtV3hzay9YTDltZGdzN2RObi9HMUZjOG9TRWVESTJtYjNTakE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQU52Q2tBaEdsc0toOVEvTFU0TnNkbG9LN3JMaDVkMFRmcFJNdEZtNkgwMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNmNjUTFJb1Vnb3JzaEpHbEQrYzdmVk9SR3NoSWJsaVJSQzhPdCtWSzFCbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iml4K21KaEliMXNJQzBLaXAveFBRdi9ybjRpU1BJZSt6eTZsOHc5TTdpTWlwd0JJNS91L2pjYXhGcE8zZ3VpM2RieFBXaWFlRjd0bnRMak05VXV4dmpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQxLCJhZHZTZWNyZXRLZXkiOiJNVlVVUVFldW1rMHVPZUxHckdmOTEzV3FRUEVWZk92T1FTbStLakc4ZnZVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJrajN0bTUzN1FReVVSMGN5MUg5bnFBIiwicGhvbmVJZCI6ImVhYTYzYmQwLTZhNGEtNDRjZC05ZjNmLTE2M2Q0MmI2NmY3OSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2UGVxbVZDNUpja2pVQVhhRTVQNXd1R1N2eEE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQnVNL0N3N1RrZW1PQ2RKVUZETUNlWUxIS2xRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IktWTkpUMTMxIiwibWUiOnsiaWQiOiI5NDc1NTk5NzE2MDo1OUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT1QxLzU0RUVJR2s3cmtHR0FZZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRW5penZIUlVCbGY3MFEvQUdSZitzSXd2V3QxQy9TWmNZM2Rhd0dFbmJCYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWnZJYjBJeU9zMWhzUjU2U0xVWEFmLzdYNkNYbC9wMmhXdHptTUl4SG5ZcURiUmNHWjMzNmM3SDkyUEMwZlo3NnRhRGV1SkxzaS83bFR0c045eGlSQkE9PSIsImRldmljZVNpZ25hdHVyZSI6Im43SmhLTVE4MEV1ejVQaittZUV5VkplZTR0WFpTeVZtajhmVnJLNWhvRmlLamZwSXpkdTRZRzBLeVlJeERDaEI0QnBkbUVyNG42clUxNVhIZ3pneGpBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3NTU5OTcxNjA6NTlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUko0czd4MFZBWlgrOUVQd0JrWC9yQ01MMXJkUXYwbVhHTjNXc0JoSjJ3WCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMTk1NzI2MiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFNeWsifQ==',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Huaweike/BELTAH-MD',
    OWNER_NAME : process.env.OWNER_NAME || "Beltah Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "94755997160",
    ANTICALL: process.env.ANTICALL || "non",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTOREAD_MESSAGES: process.env.AUTOREAD_MESSAGES || "non",
    AUTO_REACT: process.env.AUTO_REACTION || "non",
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    CAPTION : process.env.CAPTION || "ᴘᴏᴡᴇʀᴇᴅ ʙʏ BELTAH-MD",
    BOT : process.env.BOT_NAME || 'BELTAH-MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    CHATBOT : process.env.PM_CHATBOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
