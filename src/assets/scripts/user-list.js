$('.promote-btn').click(e => {
    let userId = $(e.target).attr('data-id');
    $.post(window.location.origin + '/users/' + userId + '/promote',{}).done((r) => {
        if(r.role && r.role === 'ADMIN') {
            $(e.target).toggleClass('promote-btn');
            $(e.target).toggleClass('demote-btn');
            $(e.target).toggleClass('btn-danger');
            $(e.target).toggleClass('btn-primary');
            $(e.target).text('Demote');
            $('.user-role[data-id='+userId+']').text('Administrateur');
        }
    })
});

$('.demote-btn').click(e => {
    let userId = $(e.target).attr('data-id');
    $.post(window.location.origin + '/users/' + userId + '/demote',{}).done((r) => {
        if(r.role && r.role === 'USER') {
            console.log('DEMOTE');
            $(e.target).toggleClass('promote-btn');
            $(e.target).toggleClass('demote-btn');
            $(e.target).toggleClass('btn-danger');
            $(e.target).toggleClass('btn-primary');
            $(e.target).text('Promote');
            $('.user-role[data-id='+userId+']').text('Utilisateur');
        }
    })
});