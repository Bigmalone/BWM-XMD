const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0Z2K2oyNkFrY3B0bG5XbVFGdlE0emdNZCtJV3ptRVhMc215NUZ2eXRHcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZzJGR3B1NDZUZU1TR3hHanlraFVxL29NSDRDdm9kZTNZdUxtM3pqM3lFdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTRkdQVDBubFdpQ041Q252cGZmSHc0MzBIZks5QytVN1VUd3pXbVlXb1c0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKTy95SS93OXFuNXhuejRJMFh1MlpSLzJ0ZFhXb1BrTUsrYTI5aHFxNmhVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklBb2szWHFXWURjeVl3UmNneXc4bnNjcUZ5UjdPZzhrek4rZ3FyZHZhMFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlIxeFFsUHFVS3VtSXdtem0rOURMNGQvMkFRcEZJSUtWVkI3OThBM2JmQm89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0xrL2dsS3AraG9QWnZLM0pKenpIc3FneGFSSWNQWjdsdjc4QVF0QmxXQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidHZUc3VjckFmNkFJNDdLZWFOZWtVVUlhT3VUdlZBekVHclBkbmxMdWkwZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imw0ZndOSFU1cnUxekpqWnNCejBaMGZuREZOeUl4WU1nUzQvWU15c2pobTU5UmZBMWt2b251QXNiZEFPMUhmZFNqRURzaW9ENXZmWnlMTGFJTkZKTmdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTEsImFkdlNlY3JldEtleSI6InhtaWZiMVRxVmU1cC9Jc3l4N3QzMk8zNDFyaGR4c3I4ZWNGN0VzcTdFczQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkpXbU5KMy1wVGdDaDBORFh0NnRhbnciLCJwaG9uZUlkIjoiYWIyZjA1YzEtZTJmMS00NzAxLTg2NmItYjhhMWFiNDVjODcxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZyN1VVZFdnaC8raGlGSUx5ekZJWDdaMitVVT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXcFlkcG9DWTdCMU01ekxBakJHUE1RTG5Fb2M9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWVcxN0VWQVAiLCJtZSI6eyJpZCI6IjIzMzUwNDY4Njk0MTo0NUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUFQ3b2VnQ0VPK2M2N1VHR0FVZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoieFlzbk15Q0tlR0dMcG5waWNSS1dKdXRUQ3ZvYllUV3hEbjdDcXcrMGx6RT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiL0dtVUFNdDZ1dis3czdjUkxnYVRqUWhoSFRqelF5dytNamllYzFvYkJLV1pQOC9kdk5vd1ppdUlMN3JHNDZtNFpiTGlXZ09SWi9CTk9ya2pzejJOZ2c9PSIsImRldmljZVNpZ25hdHVyZSI6Ik5yUmxyMi9Razc4dFIxY1g2L2Q5Z0pGdjJMRWhNeFZOUVR6bFhIYk5tV3V1UEw3ZkI0ZXZ2WWFSZm5RaFBnQmRLcFVQTnYxTHUwNGxtTGlBeDB1MWlBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMzNTA0Njg2OTQxOjQ1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmNXTEp6TWdpbmhoaTZaNlluRVNsaWJyVXdyNkcyRTFzUTUrd3FzUHRKY3gifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzUxODU4OCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGVU0ifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


