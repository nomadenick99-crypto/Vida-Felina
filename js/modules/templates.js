import { escapeHtml } from "./utils.js";
import { storage, STORAGE_KEYS } from "./storage.js";

const projetos = [
  {
    titulo: "Atendimento Geriátrico Solidário",
    texto:
      "Apoio a famílias em situação de vulnerabilidade para facilitar o acesso a consultas e avaliações veterinárias.",
  },
  {
    titulo: "Casa Confortável",
    texto:
      "Campanhas para adaptação do ambiente com rampas, camas, acesso facilitado a recursos e caixas de areia adequadas.",
  },
  {
    titulo: "Rede de Alimentação",
    texto:
      "Arrecadação e distribuição de alimentos conforme a necessidade dos animais acompanhados pelo projeto.",
  },
  {
    titulo: "Educação para Tutores",
    texto:
      "Conteúdos para ajudar famílias a reconhecer mudanças relacionadas ao envelhecimento e procurar atendimento.",
  },
  {
    titulo: "Fundo de Tratamento",
    texto:
      "Mobilização de recursos para exames e tratamentos definidos por profissionais veterinários.",
  },
  {
    titulo: "Lar Temporário",
    texto:
      "Formação de uma rede de apoio para acolhimento de gatos idosos que necessitem de cuidados especiais.",
  },
];

function renderCards(items) {
  return items
    .map(
      (item) => `
        <article class="card col-4">
          <h2>${escapeHtml(item.titulo)}</h2>
          <p>${escapeHtml(item.texto)}</p>
        </article>
      `,
    )
    .join("");
}

// Lê o histórico de cadastros e mostra quantas pessoas já fazem parte da rede
function renderContador() {
  const totalVoluntarios = storage.getRegistros().length;
  if (totalVoluntarios === 0) return "";

  const palavra = totalVoluntarios === 1 ? "pessoa" : "pessoas";
  return `<p class="cta-contador">Já somos <strong>${totalVoluntarios}</strong> ${palavra} na nossa rede!</p>`;
}

export const templates = {
  "#home": () => `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-image">
        <p class="eyebrow">Cuidado, informação e solidariedade</p>
        <h1 id="hero-title">Envelhecer também é viver.</h1>
        <p>
          A Vida Felina apoia tutores e gatos idosos, promovendo
          informação, prevenção e acesso a cuidados que ajudam a
          preservar qualidade de vida.
        </p>
        <a class="button" href="#cadastro">Quero ajudar</a>
      </div>
    </section>
    <section class="content-section" aria-labelledby="sobre-title">
      <div class="about-layout">
        <figure class="feature-figure about-image">
          <img src="assets/gato-idoso-cinza.jpg" alt="Gato idoso cinza peludo">
          <figcaption>Gato idoso cinza peludo</figcaption>
        </figure>

        <div class="about-content">
          <div class="section-heading">
            <p class="eyebrow">Sobre a causa</p>
            <h2 id="sobre-title">O envelhecimento felino merece atenção</h2>
          </div>

          <div class="two-columns">
            <div>
              <p>
                O envelhecimento é um processo natural e não deve ser
                tratado como uma doença. Entretanto, gatos mais velhos
                apresentam maior risco de desenvolver problemas
                crônicos e podem demonstrar mudanças sutis de
                comportamento, mobilidade, apetite e rotina.
              </p>
              <p>
                A geriatria felina busca olhar para cada animal de forma
                individual, favorecendo prevenção, detecção precoce,
                acompanhamento clínico e qualidade de vida.
              </p>
            </div>

            <div class="info-card senior-card" tabindex="0">
              <div class="senior-summary">
                <h3>Quando o gato é considerado sênior?</h3>
                <p>
                  Diretrizes veterinárias consideram, de forma geral,
                  gatos acima de 10 anos como seniores. A idade, porém,
                  não conta toda a história: cada animal envelhece de
                  maneira individual.
                </p>
              </div>
              <div class="senior-extra">
                <p class="chart-title">Acompanhamento por fase da vida</p>
                <div class="age-chart" role="img" aria-label="Gráfico que destaca a fase sênior a partir dos 10 anos">
                  <div class="chart-bar bar-young"><span>0–6</span></div>
                  <div class="chart-bar bar-adult"><span>7–9</span></div>
                  <div class="chart-bar bar-senior"><span>10+</span></div>
                </div>
                <div class="chart-labels" aria-hidden="true">
                  <span>Filhote</span>
                  <span>Jovem Adulto</span>
                  <strong>Sênior</strong>
                </div>
                <p class="chart-note">A partir dos 10 anos, consultas preventivas ajudam a acompanhar as mudanças individuais.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="content-section alt" aria-labelledby="cuidados-title">
      <div class="section-heading">
        <p class="eyebrow">Geriatria na prática</p>
        <h2 id="cuidados-title">O que merece atenção?</h2>
      </div>

      <div class="cards grid-12">
        <article class="card col-4">
          <h3>Consultas preventivas</h3>
          <p>Acompanhamentos regulares ajudam a identificar alterações antes que se tornem problemas mais graves.</p>
        </article>

        <article class="card col-4">
          <h3>Alimentação e peso</h3>
          <p>Alterações de peso e apetite podem ser sinais importantes e devem ser acompanhadas pelo profissional veterinário.</p>
        </article>

        <article class="card col-4">
          <h3>Mobilidade e dor</h3>
          <p>Dificuldades para saltar, subir ou acessar locais habituais não devem ser simplesmente atribuídas à idade.</p>
        </article>

        <article class="card col-4">
          <h3>Comportamento</h3>
          <p>Mudanças na vocalização, caixa de areia, sono ou rotina podem indicar alterações de saúde e merecem investigação.</p>
        </article>

        <article class="card col-4">
          <h3>Ambiente adaptado</h3>
          <p>Rampas, acesso facilitado à água, alimento e caixa de areia podem tornar a rotina mais confortável.</p>
        </article>

        <article class="card col-4">
          <h3>Qualidade de vida</h3>
          <p>O objetivo é preservar conforto, autonomia, bem-estar e vínculo entre o gato e sua família.</p>
        </article>
      </div>
    </section>

    <section class="content-section" aria-labelledby="alertas-title">
      <div class="section-heading">
        <p class="eyebrow">Fique atento</p>
        <h2 id="alertas-title">Mudanças que não devem ser ignoradas</h2>
      </div>

      <ul class="check-list">
        <li>Perda ou ganho de peso sem explicação aparente.</li>
        <li>Mudança importante no apetite ou consumo de água.</li>
        <li>Alteração no uso da caixa de areia.</li>
        <li>Redução de mobilidade ou dificuldade para saltar.</li>
        <li>Alterações de sono, vocalização ou interação.</li>
        <li>Redução dos cuidados de higiene ou mudanças no pelo.</li>
      </ul>

      <p class="notice">
        <strong>Importante:</strong> este conteúdo é educativo e não substitui avaliação ou orientação de um médico-veterinário.
      </p>
    </section>

    <section class="cta" aria-labelledby="cta-title">
      <h2 id="cta-title">Ajude a transformar informação em cuidado.</h2>
      ${renderContador()}
      <p>Participe dos nossos projetos ou cadastre-se como colaborador.</p>
      <a class="button button-light" href="#projetos">Conheça os projetos</a>
    </section>
  `,

  "#projetos": () => `
    <header class="page-header">
      <p class="eyebrow">Nossas iniciativas</p>
      <h1 id="projetos-title">Projetos que colocam o cuidado em prática</h1>
      <p>
        Informação, apoio e ações para melhorar a vida de gatos idosos
        e de suas famílias.
      </p>
    </header>

    <section class="content-section" aria-labelledby="projetos-title">
      <div class="cards grid-12">
        ${renderCards(projetos)}
      </div>
    </section>

    <section class="cta" aria-labelledby="participar-title">
      <h2 id="participar-title">Quer fazer parte?</h2>
      <p>Você pode ajudar com tempo, conhecimento, divulgação ou recursos.</p>
      <a class="button button-light" href="#cadastro">Cadastrar-se</a>
    </section>
  `,

  "#cadastro": () => `
    <header class="page-header">
      <p class="eyebrow">Engajamento</p>
      <h1>Faça parte da nossa rede</h1>
      <p>
        Preencha o formulário para demonstrar interesse em colaborar
        com nossas iniciativas.
      </p>
    </header>

    <section class="form-section" aria-labelledby="form-title">
      <form id="cadastroForm" novalidate>
        <fieldset>
          <legend id="form-title">Dados pessoais</legend>

          <div class="form-grid grid-12">
            <div class="field full col-12">
              <label for="nome">Nome completo *</label>
              <input id="nome" name="nome" type="text" required minlength="3" maxlength="100" autocomplete="name">
            </div>

            <div class="field col-6">
              <label for="cpf">CPF *</label>
              <input id="cpf" name="cpf" type="text" required inputmode="numeric" maxlength="14" placeholder="000.000.000-00" autocomplete="off">
            </div>

            <div class="field col-6">
              <label for="nascimento">Data de nascimento</label>
              <input id="nascimento" name="nascimento" type="date" autocomplete="bday">
            </div>

            <div class="field col-6">
              <label for="email">E-mail *</label>
              <input id="email" name="email" type="email" required maxlength="120" autocomplete="email">
            </div>

            <div class="field col-6">
              <label for="telefone">Telefone *</label>
              <input id="telefone" name="telefone" type="tel" required inputmode="tel" maxlength="15" placeholder="(11) 99999-9999" autocomplete="tel">
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Endereço</legend>

          <div class="form-grid grid-12">
            <div class="field col-6">
              <label for="cep">CEP *</label>
              <input id="cep" name="cep" type="text" required inputmode="numeric" maxlength="9" placeholder="00000-000" autocomplete="postal-code">
            </div>

            <div class="field col-6">
              <label for="estado">Estado *</label>
              <select id="estado" name="estado" required autocomplete="address-level1">
                <option value="">Selecione</option>
                <option>SP</option>
                <option>RJ</option>
                <option>MG</option>
                <option>PR</option>
                <option>SC</option>
                <option>RS</option>
                <option>Outro</option>
              </select>
            </div>

            <div class="field full col-12">
              <label for="endereco">Endereço *</label>
              <input id="endereco" name="endereco" type="text" required maxlength="150" autocomplete="street-address">
            </div>

            <div class="field col-6">
              <label for="numero">Número *</label>
              <input id="numero" name="numero" type="text" required maxlength="10">
            </div>

            <div class="field col-6">
              <label for="complemento">Complemento</label>
              <input id="complemento" name="complemento" type="text" maxlength="80">
            </div>

            <div class="field col-6">
              <label for="bairro">Bairro *</label>
              <input id="bairro" name="bairro" type="text" required maxlength="80" autocomplete="address-level3">
            </div>

            <div class="field col-6">
              <label for="cidade">Cidade *</label>
              <input id="cidade" name="cidade" type="text" required maxlength="80" autocomplete="address-level2">
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Como você deseja ajudar?</legend>

          <div class="options">
            <label><input type="checkbox" name="ajuda" value="voluntariado"> Voluntariado</label>
            <label><input type="checkbox" name="ajuda" value="doacao"> Doação</label>
            <label><input type="checkbox" name="ajuda" value="divulgacao"> Divulgação</label>
            <label><input type="checkbox" name="ajuda" value="lar-temporario"> Lar temporário</label>
            <label><input type="checkbox" name="ajuda" value="veterinario"> Apoio veterinário</label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Mensagem</legend>

          <div class="field">
            <label for="mensagem">Conte como gostaria de colaborar</label>
            <textarea id="mensagem" name="mensagem" rows="5" maxlength="500"></textarea>
          </div>
        </fieldset>

        <div class="consent">
          <label>
            <input type="checkbox" id="termos" name="termos" required>
            Concordo em fornecer meus dados para contato relacionado às atividades da ONG. *
          </label>
        </div>

        <button class="button" type="submit">Enviar cadastro</button>
        <div class="form-error-modal" role="alert" aria-live="assertive">
          <div class="form-error-dialog">
            <strong>Revise seu cadastro</strong>
            <p>Preencha corretamente os campos obrigatórios antes de enviar.</p>
            <button class="button form-error-close" type="button">Entendi</button>
          </div>
        </div>
      </form>
    </section>
  `,

  "#confirmacao": () => {
    const ultimoCadastro = storage.get(STORAGE_KEYS.ultimoCadastro, null);
    const nome =
      ultimoCadastro && ultimoCadastro.nome
        ? escapeHtml(ultimoCadastro.nome)
        : "voluntário";

    return `
      <section class="confirmation-page" aria-labelledby="confirmation-title">
        <input class="toast-toggle" type="checkbox" id="close-toast">
        <div class="confirmation-toast" role="status">
          <label class="toast-close" for="close-toast" aria-label="Fechar aviso">&times;</label>
          <div>
            <p class="eyebrow">Cadastro enviado</p>
            <h1 id="confirmation-title">Cadastro confirmado!</h1>
            <p>Recebemos os dados de ${nome}. Em breve entraremos em contato.</p>
            <a class="button" href="#home">Voltar ao início</a>
          </div>
        </div>
      </section>
    `;
  },

  notFound: () => `
    <section class="content-section" aria-labelledby="nao-encontrado-title">
      <div class="page-header">
        <p class="eyebrow">Rota inválida</p>
        <h1 id="nao-encontrado-title">Página não encontrada</h1>
        <p>Não foi possível localizar a seção solicitada.</p>
        <a class="button" href="#home">Voltar ao início</a>
      </div>
    </section>
  `,
};
