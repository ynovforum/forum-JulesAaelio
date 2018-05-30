let description = $('.question-description');
let title = $('.question-title');
let textArea = $('<textarea id="description">' + '</textarea>');

$(".edit-question").click((e) => {
    if(e.target.classList.contains('fa-pencil-alt')) {
        let descriptionContent = description[0].innerHTML;
        description.hide();
        // description.replaceWith(textArea);
        description.parent().append(textArea);
        textArea.val(descriptionContent);
        tinymce.init({
            selector : '#description'
        });

        title.removeAttr('disabled');
        $(".edit-question").toggleClass('fa-pencil-alt').toggleClass('fa-save');
    } else {
        title.attr('disabled','disabled');
        description.html(tinyMCE.activeEditor.getContent());
        description.show();
        tinyMCE.activeEditor.remove();
        textArea.remove();
        $(".edit-question").toggleClass('fa-pencil-alt').toggleClass('fa-save');
    }

});
