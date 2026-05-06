/**
 * Funções globais de navegação
 */
function goBack() {
    window.history.back();
}

function goForward() {
    window.history.forward();
}

function goHome() {
    // Altere para o caminho correto do seu menu principal
    window.location.href = '/index.html';
}

// Garante que o FontAwesome esteja carregado no <head>
function ensureFontAwesome() {
    const faLink = document.querySelector('link[href*="font-awesome"]');
    if (!faLink) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
        document.head.appendChild(link);
    }
}

// Função para injetar a barra de navegação no corpo do documento
function injectNavigationBar() {
    // Verifica se a barra já existe no HTML para evitar duplicidade e sobreposição
    if (document.querySelector('.nav')) return;

    // Detecta se estamos na página inicial
    const path = window.location.pathname;
    const isHome = path === '/' || path.endsWith('/index.html') || path === '/unkvoices/';

    const navHtml = `
        <div class="nav">
            <button onclick="goBack()" title="Voltar"><i class="fas fa-chevron-left"></i></button>
            <button onclick="goHome()" title="Início" class="${isHome ? 'active' : ''}">
                <i class="fas fa-house"></i>
            </button>
            <button onclick="goForward()" title="Avançar"><i class="fas fa-chevron-right"></i></button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', navHtml);
}

/**
 * Otimização Global de Imagens
 * Adiciona loading="lazy" a todas as imagens e gerencia carregamento progressivo
 */
function initImageOptimization() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, { rootMargin: "50px" });

    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('loading', 'lazy');
        if (img.dataset.src) observer.observe(img);
    });
}

// Injeta os ícones se necessário ou executa lógica de check de login
document.addEventListener("DOMContentLoaded", () => {
    ensureFontAwesome();
    // Primeiro, injeta a barra de navegação
    injectNavigationBar();
    initImageOptimization();
});