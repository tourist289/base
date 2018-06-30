$(function() {
    //============  Modal window
    // $(document).ready(function() {
    //     $('.mobileHeader').removeClass('hidden');
    //
    //
    //     var overlay   = $('#overlay'),
    //         openModal = $('.openModal'),
    //         close     = $('.closeModalIcon, #overlay'),
    //         modal     = $('.modalDiv');
    //
    //     openModal.click( function(e){
    //         e.preventDefault();
    //         let div = $(this).attr('href');
    //         overlay.fadeIn(400,
    //             function(){
    //                 $(div)
    //                     .css('display', 'block')
    //                     .animate({opacity: 1, top: '15%'}, 200);
    //             });
    //
    //     });
    //
    //     close.click( function(){
    //         modal
    //             .animate({opacity: 0, top: '45%'}, 200,
    //                 funcCloseModal()
    //             );
    //     });
    //
    //     //============  ESCAPE key pressed
    //     $(document).keydown(function(e) {
    //         if (e.keyCode == 27) {
    //             modal
    //                 .animate({opacity: 0, top: '45%'}, 200,
    //                     funcCloseModal()
    //                 );
    //         }
    //     });
    //
    //     function funcCloseModal() {
    //         let that = $(this);
    //
    //         that.css('display', 'none');
    //         overlay.fadeOut(400);
    //
    //         setTimeout(function () {
    //             modal.removeAttr('style');
    //         }, 600);
    //
    //     };
    //
    // });



    $(document).ready(function(){
        $('.header').height($(window).height());
    })


    //============  MMENU
    $('#myMenu').mmenu({
        extensions: [ 'effect-menu-slide'],
        navbar: {
            title: '<span>LOGO</span>'
        },
        offCanvas: {
            position: 'left'
        }
    });


    var apiButt = $('#myMenu').data('mmenu');
        apiButt.bind('open:finish', function() {
            $('.hamburger').addClass('is-active');
        });
        apiButt.bind('close:finish', function() {
            $('.hamburger').removeClass('is-active');
        });


    //============  Height
    /*function setEqualHeight(elem) {
        var tallestcolumn = 0;
        elem.each(
            function() {
                currentHeight = $(this).height();
                if(currentHeight > tallestcolumn) {
                    tallestcolumn = currentHeight;
                }
            }
        );
        elem.height(tallestcolumn);
    }
    $(document).ready(function() {
        setEqualHeight($('.columnsPri'));
    });*/

    //============  FORM STYLER
    //$('').styler();

    //============  Masked Input
    // $('.masked').mask('+38(000) 000-0000', {placeholder: "+38(__) ___-____"});



    // })
})();
