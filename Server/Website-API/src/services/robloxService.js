const axios = require("axios");
const UNIVERSES = ["8647674092", "8244995861"];
const DATASTORE_NAMES = ["PlayerStore", "PlayerData"];
const ROBLOX_TOKEN = process.env.ROBLOX_TOKEN;

async function getUsername(playerId) {
  try {
    const response = await axios.get(`https://users.roblox.com/v1/users/${playerId}`);
    return response.data.name || null;
  } catch (err) {
    return null;
  }
}

async function getPlayerData(playerId, universeId, datastoreName) {
  try {
    const response = await axios.get(
      `https://apis.roblox.com/datastores/v1/universes/${universeId}/standard-datastores/datastore/entries/entry?datastoreName=${datastoreName}&entryKey=Player_${playerId}`,
      { headers: { "x-api-key": ROBLOX_TOKEN, "Content-Type": "application/json" } }
    );
    return { universeId, datastoreName, success: true, data: response.data };
  } catch (err) {
    return { universeId, datastoreName, success: false, error: err.response?.data || { message: err.message } };
  }
}

async function getPlayerDataFromAllUniverses(playerId) {
  const results = [];
  for (const universeId of UNIVERSES) {
    for (const datastoreName of DATASTORE_NAMES) {
      results.push(await getPlayerData(playerId, universeId, datastoreName));
    }
  }
  const username = await getUsername(playerId);
  return { UserId: playerId, Name: username, Data: results };
}

async function updatePlayerData(playerId, value, universeId, datastoreName) {
  try {
    const response = await axios.post(
      `https://apis.roblox.com/datastores/v1/universes/${universeId}/standard-datastores/datastore/entries/entry?datastoreName=${datastoreName}&entryKey=Player_${playerId}&scope=global`,
      { data: value },
      { headers: { "x-api-key": ROBLOX_TOKEN, "Content-Type": "application/json" } }
    );
    return { universeId, datastoreName, success: true, data: response.data };
  } catch (err) {
    return { universeId, datastoreName, success: false, error: err.response?.data || { message: err.message } };
  }
}

async function updatePlayerInAllUniverses(playerId, value) {
  const results = [];
  for (const universeId of UNIVERSES) {
    for (const datastoreName of DATASTORE_NAMES) {
      results.push(await updatePlayerData(playerId, value, universeId, datastoreName));
    }
  }
  return { UserId: playerId, Data: results };
}

async function getPlayerDataFlexible(playerId, universeId = null) {
  const results = [];
  if (universeId) {
    for (const datastoreName of DATASTORE_NAMES) {
      results.push(await getPlayerData(playerId, universeId, datastoreName));
    }
  } else {
    for (const uId of UNIVERSES) {
      for (const datastoreName of DATASTORE_NAMES) {
        results.push(await getPlayerData(playerId, uId, datastoreName));
      }
    }
  }
  const username = await getUsername(playerId);
  return { UserId: playerId, Name: username, Data: results };
}

module.exports = {
  getPlayerDataFlexible,
  updatePlayerInAllUniverses,
  getPlayerDataFromAllUniverses
};