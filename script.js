// Efeito suave ao carregar os cards (Seu código existente)
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".car-card");
    cards.forEach((card, i) => {
        card.style.opacity = "0";
        setTimeout(() => {
            card.style.transition = "opacity 2s ease";
            card.style.opacity = "1";
        }, i * 150);
    });

    // ==========================================================
    // NOVA FUNCIONALIDADE: SLIDE DE IMAGENS NO CARD
    // ==========================================================
    
    // 1. Encontra todas as setas de navegação
    const slideArrows = document.querySelectorAll(".slide-arrow");

    // 2. Itera sobre cada seta para adicionar o evento de clique
    slideArrows.forEach(arrow => {
        arrow.addEventListener("click", (event) => {
            // Previne que o clique no botão inicie o evento de link ou outro comportamento padrão
            event.preventDefault();
            // Para evitar que o clique no slide acione o hover/transform do card
            event.stopPropagation(); 

            // Obtém o elemento pai, que é o container do slide
            const sliderContainer = arrow.closest(".slider-container");
            if (!sliderContainer) return; // Se não encontrar o container, sai da função

            // Pega o contêiner das imagens e todas as imagens (slides)
            const carImagesContainer = sliderContainer.querySelector(".car-images");
            const slides = carImagesContainer.querySelectorAll(".car-slide");
            
            // Pega a direção do slide (1 para frente, -1 para trás)
            const direction = parseInt(arrow.dataset.direction);

            // Encontra o slide atualmente ativo
            const activeSlide = carImagesContainer.querySelector(".car-slide.active");
            let currentIndex = parseInt(activeSlide.dataset.slide);

            // Remove a classe 'active' do slide atual
            activeSlide.classList.remove("active");

            // Calcula o novo índice
            let newIndex = currentIndex + direction;

            // Lógica Circular:
            // Se for além do último slide, volta para o primeiro (0)
            if (newIndex >= slides.length) {
                newIndex = 0; 
            // Se for antes do primeiro slide (índice -1), vai para o último
            } else if (newIndex < 0) {
                newIndex = slides.length - 1;
            }

            // Adiciona a classe 'active' ao novo slide
            slides[newIndex].classList.add("active");
        });
    });
});