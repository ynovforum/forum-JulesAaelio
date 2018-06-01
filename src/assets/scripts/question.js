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
    })
});