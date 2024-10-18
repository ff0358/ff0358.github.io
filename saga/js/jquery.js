$(document).on('show.bs.modal', '#myModal', function (event) {
    // Récupérer le bouton qui a déclenché la modale
    var button = $(event.relatedTarget);
    var buttonId = button.attr('id');
    //Index du bouton 
    const buttonNumber = buttonId.match(/\d+/)[0];

    // Chemin de l'image et de l'audio 

    var imageUrl = 'image/IMG_' + buttonNumber + '.jpg';
    var audioSrc = 'audio/French_' + buttonNumber + '.mp3';

    // Sélectionner le conteneur de la modale et le vider
    var modalBody = $('#myModal .modal-body');
    modalBody.empty();
    var modalHeader = $('#myModal .modal-header');
    modalHeader.empty();

    // Créer et ajouter l'audio
    var audio = $('<audio controls>').append($('<source>').attr('src', audioSrc).attr('type', 'audio/mpeg'));
    modalHeader.append(audio);

    // Centrer l'audio
    modalBody.addClass('text-center');
    audio.addClass('d-block');

    // Créer et ajouter l'image
    var img = $('<img>').attr('src', imageUrl).addClass('img-fluid mx-auto d-block');
    modalBody.append(img);

    // Écouter l'événement de fermeture de la modale une seule fois
    $('#myModal').on('hidden.bs.modal', function () {
        // Mettre en pause l'audio
        audio.trigger('pause');
    });
});