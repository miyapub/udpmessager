$(document).ready(function () {
    setInterval(function () {
        $.getJSON('api/msg', function (arr) {
            $('#msglist').html('');
            arr.map(function(item){
                var li=$('<li></li>');
                var from=$('<div></div>');
                from.text(item.from);

                var msg=$('<div></div>');
                msg.text(item.msg);

                var time=$('<div></div>');
                time.text(item.time);

                li.append(from);
                li.append(msg);
                li.append(time);
                
                $('#msglist').append(li);
            });
            console.log(arr);
        });
    }, 300);
    $('#enter').click(function () {
        var msg = $('#msg').val();
        $.post('api/msg', { msg: msg }, function (json) {
            $('#msg').val('');
            console.log(json);
        });
        console.log(msg);
    });
});