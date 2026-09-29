const DEFAULT_STORAGE = {
  registros: "vidaFelina.registros",
  ultimoCadastro: "vidaFelina.ultimoCadastro",
};

export const STORAGE_KEYS = DEFAULT_STORAGE;

export const storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      const parsed = JSON.parse(raw);
      return parsed ?? fallback;
    } catch (error) {
      console.warn(`Não foi possível ler ${key}:`, error);
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Não foi possível salvar ${key}:`, error);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Não foi possível remover ${key}:`, error);
    }
  },

  getRegistros() {
    const registros = this.get(STORAGE_KEYS.registros, []);
    return Array.isArray(registros) ? registros : [];
  },

  saveRegistro(registro) {
    const registros = this.getRegistros();
    registros.push(registro);
    const salvouLista = this.set(STORAGE_KEYS.registros, registros);
    const salvouUltimo = this.set(STORAGE_KEYS.ultimoCadastro, registro);
    return salvouLista && salvouUltimo;
  },
};
