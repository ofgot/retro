// List of games that are not yet available
const gamesComingSoon = ['gorillas', 'pacman', 'snake'];

/**
 * Iterate over all "play" buttons and set appropriate behavior.
 * - For unavailable games: disable on hover and show "SOON".
 * - For available games: navigate to the corresponding game page.
 */
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

