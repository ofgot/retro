const gamesComingSoon = ['gorillas', 'pacman', 'snake'];

$('.play-button').each(function () {
    const game = $(this).data('game');

    if (gamesComingSoon.includes(game)) {
        $(this).on('mouseenter', function () {
            $(this).text('SOON').prop('disabled', true);
        });

        $(this).on('mouseleave', function () {
            $(this).text('PLAY').prop('disabled', false);
        });
    } else {
        $(this).on('click', function () {
            window.location.href = `${game}.html`;
        });
    }
});

