require('dotenv').config();
const path = require('path');

function parseBoolean(value) {
  if (typeof value === "string") {
    value = value.trim().toLowerCase();
  }
  switch (value) {
    case true:
    case "true":
      return true;
    default:
      return false;
  }
}

// Build config from environment variables
function buildFromEnv() {
  const ownerRaw = process.env.OWNER_IDS || "";
  const ownerID = ownerRaw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  return {
    token: process.env.BOT_TOKEN,
    prefix: process.env.BOT_PREFIX || ".",
    ownerID,
    SpotifyID: process.env.SPOTIFY_ID || "",
    SpotifySecret: process.env.SPOTIFY_SECRET || "",
    LastFmKey: process.env.LASTFM_KEY || "",
    LastFmSecret: process.env.LASTFM_SECRET || "",
    color: process.env.BOT_COLOR || "#00D4FF",
    logs: process.env.LOGS_CHANNEL || "",
    node_source: process.env.BOT_NODE_SOURCE || "spsearch",
    links: {
      support: process.env.SUPPORT_LINK || "https://discord.gg/pdJDxSBA5v",
      invite: process.env.INVITE_LINK || "https://discord.gg/pdJDxSBA5v",
      guild: process.env.GUILD_LINK || "https://discord.gg/pdJDxSBA5v",
    },
    Webhooks: {
      black: process.env.WEBHOOK_BLACK || "",
      player_create: process.env.WEBHOOK_PLAYER_CREATE || "",
      player_delete: process.env.WEBHOOK_PLAYER_DELETE || "",
      guild_join: process.env.WEBHOOK_GUILD_JOIN || "",
      guild_leave: process.env.WEBHOOK_GUILD_LEAVE || "",
      cmdrun: process.env.WEBHOOK_CMDRUN || "",
    },
    nodes: [
      {
        name: process.env.LAVALINK_NAME || "Groove",
        url: process.env.LAVALINK_URL || "lavalinkv4.serenetia.com:443",
        auth: process.env.LAVALINK_AUTH || "https://seretia.link/discord",
        secure: parseBoolean(process.env.LAVALINK_SECURE ?? "true"),
      },
    ],
    node_options: {
      moveOnDisconnect: true,
      resume: true,
      resumeTimeout: 60,
      resumeByLibrary: true,
      reconnectTries: 15,
      reconnectInterval: 10,
      restTimeout: 60000,
      voiceConnectionTimeout: 30000,
      userAgent: "Groove",
    },
  };
}

let config;

const jsonConfigPath = path.join(__dirname, 'config.json');
try {
  config = require(jsonConfigPath);
  console.log("[Config] Loaded from config.json");
} catch {
  console.log("[Config] config.json not found — loading from environment variables");
  config = buildFromEnv();

  if (!config.token) {
    console.error("❌ BOT_TOKEN is not set! Add it as an environment variable.");
    process.exit(1);
  }
}

config.parseBoolean = parseBoolean;

module.exports = config;
