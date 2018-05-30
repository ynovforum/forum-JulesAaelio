$(".edit-question").click((r) => {
    let description = $('.question-description');
    description.replaceWith('<textarea value="'+ description.innerHTML + '">' +
        '</textarea>' );
});