let description = $('.question-description');
let title = $('.question-title');
let textArea = $('<textarea id="description">' + '</textarea>');

$(".edit-question").click((e) => {
    if(e.target.classList.contains('fa-pencil-alt')) {
        let descriptionContent = description[0].innerHTML;
        description.hide();

        //Add the text area and transform it to editor.
        description.parent().append(textArea);
        textArea.val(descriptionContent);
        tinymce.init({
            selector : '#description'
        });

        //Enable the title input.
        title.removeAttr('disabled');

        //Toggle the button
        $(".edit-question").toggleClass('fa-pencil-alt').toggleClass('fa-save');
    } else {

        //Get the editor content and display it.
        let descriptionContent = tinyMCE.activeEditor.getContent();
        let data = JSON.stringify({
            title: "CACA"
            // description: descriptionContent
        });
        console.log(data);
        console.log(descriptionContent);
        $.ajax({
            type: 'POST',
            url: window.location.href,
            contentType: 'application/json; charset=utf-8',
            dataType:'json',
            data : data
        }).done((r) => {
            console.log(r);
            description.html(descriptionContent);
            description.show();

            //Remove the editor
            tinyMCE.activeEditor.remove();
            textArea.remove();

            //Block back the title input.
            title.attr('disabled','disabled');

            //Toggle the button
            $(".edit-question").toggleClass('fa-pencil-alt').toggleClass('fa-save');
        }).fail((e) => {
            console.error(e);
        });
    }

});
