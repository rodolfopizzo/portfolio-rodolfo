/* ========================================
   PORTFOLIO RODOLFO PIZZO
   javascript principal
   ======================================== */

// espera o html carregar antes de rodar os scripts
document.addEventListener('DOMContentLoaded', function() {

    // ====================================
    // 1. ALTERNÂNCIA DE TEMA CLARO/ESCURO
    // ====================================
    const botaoTema = document.getElementById('botao-tema');
    const iconeTema = document.getElementById('icone-tema');
    const body = document.body;

    // verifica se o usuario ja escolheu um tema antes (memoria do navegador)
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'claro') {
        body.classList.add('tema-claro');
        iconeTema.textContent = '☀';
    }

    // clique no botão troca o tema
    botaoTema.addEventListener('click', function() {
        body.classList.toggle('tema-claro');

        // troca o icone (lua pro escuro, sol pro claro)
        if (body.classList.contains('tema-claro')) {
            iconeTema.textContent = '☀';
            localStorage.setItem('tema', 'claro');
        } else {
            iconeTema.textContent = '☾';
            localStorage.setItem('tema', 'escuro');
        }
    });


    // ====================================
    // 2. MENU HAMBURGUER NO MOBILE
    // ====================================
    const botaoHamburguer = document.getElementById('botao-hamburguer');
    const menu = document.getElementById('menu');

    botaoHamburguer.addEventListener('click', function() {
        menu.classList.toggle('aberto');
    });

    // fecha o menu ao clicar em um link (mobile)
    const linksMenu = document.querySelectorAll('.link-menu');
    linksMenu.forEach(function(link) {
        link.addEventListener('click', function() {
            menu.classList.remove('aberto');
        });
    });


    // ====================================
    // 3. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
    // ====================================
    const formulario = document.getElementById('formulario-contato');
    const modal = document.getElementById('modal');
    const fecharModal = document.getElementById('fechar-modal');

    // função que valida o formato do e-mail usando regex
    function emailValido(email) {
        // verifica padrão basico: algo@algo.algo
        const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return padrao.test(email);
    }

    // função auxiliar pra mostrar erro num campo especifico
    function mostrarErro(idCampo, idErro, mensagem) {
        const campo = document.getElementById(idCampo);
        const erro = document.getElementById(idErro);
        campo.classList.add('com-erro');
        erro.textContent = mensagem;
    }

    // função auxiliar pra limpar o erro de um campo
    function limparErro(idCampo, idErro) {
        const campo = document.getElementById(idCampo);
        const erro = document.getElementById(idErro);
        campo.classList.remove('com-erro');
        erro.textContent = '';
    }

    // quando o usuario tenta enviar o formulario
    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault(); // impede o envio padrao do navegador

        // pega os valores dos campos e tira espaços em branco
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        // variavel pra controlar se ta tudo certo
        let estaTudoValido = true;

        // limpa todos os erros anteriores antes de validar de novo
        limparErro('nome', 'erro-nome');
        limparErro('email', 'erro-email');
        limparErro('mensagem', 'erro-mensagem');

        // valida o nome (precisa ter pelo menos 2 caracteres)
        if (nome === '') {
            mostrarErro('nome', 'erro-nome', 'por favor, preencha seu nome');
            estaTudoValido = false;
        } else if (nome.length < 2) {
            mostrarErro('nome', 'erro-nome', 'nome muito curto');
            estaTudoValido = false;
        }

        // valida o e-mail
        if (email === '') {
            mostrarErro('email', 'erro-email', 'por favor, preencha o e-mail');
            estaTudoValido = false;
        } else if (!emailValido(email)) {
            mostrarErro('email', 'erro-email', 'e-mail inválido (ex: usuario@dominio.com)');
            estaTudoValido = false;
        }

        // valida a mensagem (pelo menos 10 caracteres)
        if (mensagem === '') {
            mostrarErro('mensagem', 'erro-mensagem', 'escreva sua mensagem');
            estaTudoValido = false;
        } else if (mensagem.length < 10) {
            mostrarErro('mensagem', 'erro-mensagem', 'mensagem muito curta (mínimo 10 caracteres)');
            estaTudoValido = false;
        }

        // se tudo ta certo, simula o envio
        if (estaTudoValido) {
            // limpa os campos do formulario
            formulario.reset();

            // abre o modal de confirmação
            modal.classList.add('aberto');
            modal.setAttribute('aria-hidden', 'false');
        }
    });

    // limpa o erro do campo enquanto o usuario digita (feedback rapido)
    document.getElementById('nome').addEventListener('input', function() {
        limparErro('nome', 'erro-nome');
    });
    document.getElementById('email').addEventListener('input', function() {
        limparErro('email', 'erro-email');
    });
    document.getElementById('mensagem').addEventListener('input', function() {
        limparErro('mensagem', 'erro-mensagem');
    });


    // ====================================
    // 4. CONTROLE DO MODAL
    // ====================================

    // fecha o modal ao clicar no botão fechar
    fecharModal.addEventListener('click', function() {
        modal.classList.remove('aberto');
        modal.setAttribute('aria-hidden', 'true');
    });

    // fecha tambem ao clicar fora do modal (no fundo escuro)
    modal.addEventListener('click', function(evento) {
        if (evento.target === modal) {
            modal.classList.remove('aberto');
            modal.setAttribute('aria-hidden', 'true');
        }
    });

    // fecha com a tecla ESC
    document.addEventListener('keydown', function(evento) {
        if (evento.key === 'Escape' && modal.classList.contains('aberto')) {
            modal.classList.remove('aberto');
            modal.setAttribute('aria-hidden', 'true');
        }
    });


    // ====================================
    // 5. DESTACAR LINK DO MENU CONFORME ROLAGEM
    // ====================================
    const secoes = document.querySelectorAll('.secao');

    // ao rolar a página, descobre qual seção está visivel
    window.addEventListener('scroll', function() {
        let secaoAtual = '';

        secoes.forEach(function(secao) {
            const topo = secao.offsetTop - 200;
            if (window.scrollY >= topo) {
                secaoAtual = secao.getAttribute('id');
            }
        });

        // adiciona destaque no link correspondente
        linksMenu.forEach(function(link) {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + secaoAtual) {
                link.style.color = 'var(--texto)';
            }
        });
    });

});
