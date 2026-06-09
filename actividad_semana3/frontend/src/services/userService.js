import { credencialError, credencialSuccess } from "../utils/alerts.js";

const CHARACTERS_KEY = "customCharacters";
const DELETED_CHARACTERS_KEY = "deletedCharacters";

function readJson(key, fallback) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return data ?? fallback;
  } catch (error) {
    console.error(`Error al leer ${key}:`, error);
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getCharacters() {
  const characters = readJson(CHARACTERS_KEY, []);
  return Array.isArray(characters) ? characters : [characters];
}

export function getDeletedCharacterIds() {
  const deletedIds = readJson(DELETED_CHARACTERS_KEY, []);
  return Array.isArray(deletedIds) ? deletedIds.map(String) : [];
}

export function createCharacter(character) {
  try {
    const characters = getCharacters();
    const newCharacter = {
      ...character,
      id: `local-${Date.now()}`,
      episode: [],
      isLocal: true,
    };

    saveJson(CHARACTERS_KEY, [...characters, newCharacter]);
    credencialSuccess("Personaje creado correctamente");
    return newCharacter;
  } catch (error) {
    console.error("Error al crear el personaje:", error);
    credencialError("No se pudo crear el personaje");
    return null;
  }
}

export function updateCharacter(id, character) {
  try {
    const characters = getCharacters();
    const characterId = String(id);
    const updatedCharacter = {
      ...character,
      id: characterId,
      episode: character.episode ?? [],
      isLocal: true,
    };
    const exists = characters.some((item) => String(item.id) === characterId);
    const updatedCharacters = exists
      ? characters.map((item) => String(item.id) === characterId ? { ...item, ...updatedCharacter } : item)
      : [...characters, updatedCharacter];

    saveJson(CHARACTERS_KEY, updatedCharacters);
    credencialSuccess("Personaje actualizado correctamente");
    return updatedCharacter;
  } catch (error) {
    console.error("Error al actualizar el personaje:", error);
    credencialError("No se pudo actualizar el personaje");
    return null;
  }
}

export function deleteCharacter(id) {
  try {
    const characterId = String(id);
    const characters = getCharacters().filter((item) => String(item.id) !== characterId);
    const deletedIds = getDeletedCharacterIds();

    saveJson(CHARACTERS_KEY, characters);
    saveJson(DELETED_CHARACTERS_KEY, [...new Set([...deletedIds, characterId])]);
    credencialSuccess("Personaje eliminado correctamente");
    return true;
  } catch (error) {
    console.error("Error al eliminar el personaje:", error);
    credencialError("No se pudo eliminar el personaje");
    return false;
  }
}
