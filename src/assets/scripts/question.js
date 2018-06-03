$('#new-comment-btn').click(e => {
    let comment = tinyMCE.get('new-comment-field').getContent()
    $.post(window.location.href + '/comment',{
        content: comment,
    }).done(r => {
        console.log(r);
        let newcomment = $('.comment').last().clone();
        newcomment.find('.comment-user').text(r.user.firstname + ' ' + r.user.lastname);
        newcomment.find('.comment-date').text(moment(r.createdAt).fromNow());
        newcomment.find('.comment-content').html(r.content);
        newcomment.removeClass('template');
        $('.comments').append(newcomment);
        $('#no-comments').hide();
    })
});

let acceptToggles = $('.comment-accept');
console.log(acceptToggles);
acceptToggles.click(e => {
    let commentId = $(e.target).attr('data-id');
    $.post(window.location.href + '/comment/' + commentId + '/accept',{}).done((r) => {
        console.log(r);
        acceptToggles.hide();
        $('.accepted-mark-container[data-id='+commentId+']').append('<div class="fa fa-check fa-2x text-center text-success"></div>')
    })
});