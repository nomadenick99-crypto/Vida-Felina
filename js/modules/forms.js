import { storage } from "./storage.js";
import {
  normalizeText,
  normalizeDigits,
  isValidEmail,
  isValidCpf,
  isValidPhone,
  isValidCep,
} from "./utils.js";

function getFieldValue(form, name) {
  const field = form.elements.namedItem(name);
  if (!field) return "";

  if (field.type === "checkbox") {
    return field.checked ? field.value : "";
  }

  if (field.type === "select-one") {
    return field.value || "";
  }

  return field.value || "";
}

function collectFormData(form) {
  const ajuda = Array.from(
    form.querySelectorAll('input[name="ajuda"]:checked'),
  ).map((item) => item.value);

  return {
    nome: normalizeText(getFieldValue(form, "nome")),
    cpf: normalizeDigits(getFieldValue(form, "cpf")),
    nascimento: getFieldValue(form, "nascimento"),
    email: normalizeText(getFieldValue(form, "email")),
    telefone: normalizeDigits(getFieldValue(form, "telefone")),
    cep: normalizeDigits(getFieldValue(form, "cep")),
    estado: normalizeText(getFieldValue(form, "estado")),
    endereco: normalizeText(getFieldValue(form, "endereco")),
    numero: normalizeText(getFieldValue(form, "numero")),
    complemento: normalizeText(getFieldValue(form, "complemento")),
    bairro: normalizeText(getFieldValue(form, "bairro")),
    cidade: normalizeText(getFieldValue(form, "cidade")),
    ajuda,
    mensagem: normalizeText(getFieldValue(form, "mensagem")),
    termos: getFieldValue(form, "termos") === "on",
  };
}

function showErrorDialog(message) {
  const modal = document.querySelector(".form-error-modal");
  const messageNode = document.querySelector(".form-error-dialog p");
  if (!modal || !messageNode) return;

  messageNode.textContent = message;
  modal.style.display = "flex";
  document.querySelector(".form-error-close")?.focus();
}

function hideErrorDialog() {
  const modal = document.querySelector(".form-error-modal");
  if (!modal) return;
  modal.style.display = "none";
}

// Cada regra recebe o campo e devolve a mensagem de erro ("" = campo correto)
const obrigatorio = (campo) =>
  normalizeText(campo.value) ? "" : "Campo obrigatório.";

const regras = {
  nome: (campo) =>
    normalizeText(campo.value).length >= 3
      ? ""
      : "Informe o nome completo (mínimo de 3 letras).",
  cpf: (campo) => (isValidCpf(campo.value) ? "" : "Informe um CPF válido."),
  email: (campo) =>
    isValidEmail(campo.value) ? "" : "Informe um e-mail válido (ex.: nome@site.com).",
  telefone: (campo) =>
    isValidPhone(campo.value) ? "" : "Informe um telefone com DDD.",
  cep: (campo) => (isValidCep(campo.value) ? "" : "Informe um CEP com 8 dígitos."),
  estado: (campo) => (campo.value ? "" : "Selecione o estado."),
  endereco: obrigatorio,
  numero: obrigatorio,
  bairro: obrigatorio,
  cidade: obrigatorio,
  termos: (campo) =>
    campo.checked ? "" : "Você precisa concordar para continuar.",
};

// Troca as classes de erro/sucesso e cria (ou remove) a mensagem abaixo do campo
function marcarCampo(input, mensagem) {
  const field = input.closest(".field, .consent");
  if (!field) return;

  field.querySelector(".mensagem-erro")?.remove();
  field.classList.toggle("campo-erro", Boolean(mensagem));
  field.classList.toggle("campo-ok", !mensagem);
  input.setAttribute("aria-invalid", String(Boolean(mensagem)));
  input.removeAttribute("aria-describedby");

  if (mensagem) {
    const aviso = document.createElement("small");
    aviso.className = "mensagem-erro";
    aviso.id = `${input.id}-erro`;
    aviso.textContent = mensagem;
    field.appendChild(aviso);
    input.setAttribute("aria-describedby", aviso.id);
  }
}

function validarCampo(input) {
  const regra = regras[input.name];
  if (!regra) return true;

  const mensagem = regra(input);
  marcarCampo(input, mensagem);
  return !mensagem;
}

function validateForm(form) {
  const camposComErro = [];

  Object.keys(regras).forEach((nome) => {
    const campo = form.elements.namedItem(nome);
    if (campo && !validarCampo(campo)) {
      camposComErro.push(campo);
    }
  });

  if (camposComErro.length > 0) {
    showErrorDialog(
      camposComErro.length === 1
        ? "Há 1 campo com problema. Veja a mensagem em vermelho."
        : `Há ${camposComErro.length} campos com problema. Veja as mensagens em vermelho.`,
    );
    return false;
  }

  hideErrorDialog();
  return collectFormData(form);
}

function formatPhone(value) {
  const digits = normalizeDigits(value).slice(0, 11);
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, (_, a, b, c) =>
      c ? `(${a}) ${b}-${c}` : `(${a}) ${b}`,
    );
  }
  return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, (_, a, b, c) =>
    c ? `(${a}) ${b}-${c}` : `(${a}) ${b}`,
  );
}

function formatCpf(value) {
  const digits = normalizeDigits(value).slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

function formatCep(value) {
  const digits = normalizeDigits(value).slice(0, 8);
  return digits.replace(/(\d{5})(\d)/, "$1-$2");
}

export function bindFormHandlers() {
  const form = document.getElementById("cadastroForm");
  if (!form || form.dataset.bound === "true") return;

  form.dataset.bound = "true";

  const cpfInput = document.getElementById("cpf");
  const telefoneInput = document.getElementById("telefone");
  const cepInput = document.getElementById("cep");

  cpfInput?.addEventListener("input", (event) => {
    event.target.value = formatCpf(event.target.value);
  });

  telefoneInput?.addEventListener("input", (event) => {
    event.target.value = formatPhone(event.target.value);
  });

  cepInput?.addEventListener("input", (event) => {
    event.target.value = formatCep(event.target.value);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = validateForm(form);

    if (!data) return;

    const saved = storage.saveRegistro(data);
    if (!saved) {
      showErrorDialog("Não foi possível salvar o cadastro no momento.");
      return;
    }

    // Avisa o resto da aplicação que um cadastro novo foi salvo
    window.dispatchEvent(
      new CustomEvent("cadastro:salvo", {
        detail: { total: storage.getRegistros().length },
      }),
    );

    window.location.hash = "#confirmacao";
  });

  // Tempo real: ao sair de qualquer campo, o evento "borbulha" até o form
  form.addEventListener("focusout", (event) => {
    validarCampo(event.target);
  });

  // Enquanto a pessoa corrige um campo marcado com erro, ele é conferido de novo
  form.addEventListener("input", (event) => {
    hideErrorDialog();
    if (event.target.closest(".campo-erro")) {
      validarCampo(event.target);
    }
  });

  // Ao fechar o aviso, o cursor vai para o primeiro campo com erro
  const fecharAviso = () => {
    hideErrorDialog();
    form.querySelector(".campo-erro input, .campo-erro select")?.focus();
  };

  form.querySelector(".form-error-close")?.addEventListener("click", fecharAviso);

  // Teclado dentro da janela de erro: Esc fecha e o Tab não sai dela
  // (o único controle é o botão "Entendi", então o foco fica nele)
  form.querySelector(".form-error-modal")?.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      fecharAviso();
    } else if (event.key === "Tab") {
      event.preventDefault();
      form.querySelector(".form-error-close")?.focus();
    }
  });
}
