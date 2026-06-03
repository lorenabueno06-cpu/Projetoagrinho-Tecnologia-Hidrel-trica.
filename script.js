document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mecanismo de Modo Escuro (Dark Mode)
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Aplica o tema salvo no carregamento
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // 2. Animação de Contador de Eficiência (Efeito de Scroll)
    const counter = document.getElementById('counter');
    const targetValue = 15; // Valor final em %
    let animated = false;

    const animateCounter = () => {
        let startValue = 0;
        const duration = 2000; // Tempo da animação em milissegundos
        const stepTime = Math.abs(Math.floor(duration / targetValue));
        
        const timer = setInterval(() => {
            startValue += 1;
            counter.textContent = startValue;
            if (startValue >= targetValue) {
                clearInterval(timer);
            }
        }, stepTime);
    };

    // Detecta se a seção do contador está visível na tela
    const checkScroll = () => {
        if (!counter) return;
        
        const rect = counter.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        
        // Ativa a animação quando o elemento entra na visualização do usuário
        if (!(rect.bottom < 0 || rect.top - viewHeight >= 0) && !animated) {
            animateCounter();
            animated = true; // Impede que execute múltiplas vezes
        }
    };

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Executa uma vez inicial caso já esteja visível
});