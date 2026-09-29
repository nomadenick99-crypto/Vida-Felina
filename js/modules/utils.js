export function normalizeText(value = "") {
  return String(value).replace(/\s+/g, " ").trim();
}

export function normalizeDigits(value = "") {
  return String(value).replace(/\D/g, "");
}

export function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function isValidEmail(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeText(value));
}

export function isValidCpf(value = "") {
  const digits = normalizeDigits(value);

  if (digits.length !== 11) return false;

  // CPFs com todos os dígitos iguais (ex.: 111.111.111-11) passam na conta, mas são inválidos
  if (/^(\d)\1{10}$/.test(digits)) return false;

  // Multiplica os primeiros dígitos por pesos decrescentes (10..2 ou 11..2)
  // e transforma o resto da divisão por 11 no dígito verificador esperado
  const calcularDigito = (quantidade) => {
    let soma = 0;
    for (let i = 0; i < quantidade; i++) {
      soma += Number(digits[i]) * (quantidade + 1 - i);
    }
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  return (
    calcularDigito(9) === Number(digits[9]) &&
    calcularDigito(10) === Number(digits[10])
  );
}

export function isValidPhone(value = "") {
  const digits = normalizeDigits(value);
  return digits.length >= 10 && digits.length <= 11;
}

export function isValidCep(value = "") {
  return normalizeDigits(value).length === 8;
}
