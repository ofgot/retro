const gamesComingSoon = ['gorillas', 'pacman', 'snake'];

document.querySelectorAll('.play-button').forEach((button) => {
    button.addEventListener('click', () => {
        const game = button.dataset.game;
        window.location.href = `${game}.html`;
    });
});

document.querySelectorAll('.play-button').forEach((button) => {
    const game = button.dataset.game;

    if (gamesComingSoon.includes(game)) {

      button.addEventListener('mouseenter', () => {
        button.textContent = 'SOON';
        button.disabled = true;
      });

      button.addEventListener('mouseleave', () => {
        button.textContent = 'PLAY';
      });
    }
});
