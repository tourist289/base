
// mmenu-navigation
// stars
//  formstyler для странуцы карты, стилизация инпута
//  для странуцы карты - перемещает ингридиенты из добавок в продукт
//mask for cart-page.html  form


$(document).ready(function() {
// menu-navigation
        $('.side-nav').removeClass('hidden');
        $('.cart-mobile').removeClass('hidden');

        $('#my-menu').mmenu({
        extensions: ['effect-menu-slide', 'pagedim-black'],
        navbar: {
        title: 'PESTO'
        },
    offCanvas: {
        position: 'left'
        }
    });

    $('#cart-mob').mmenu({
        extensions: ['effect-menu-slide', 'pagedim-black'],
        navbar: {
        title: 'PESTO'
        },
    offCanvas: {
        position: 'right'

    }
});

var apiButt = $('#my-menu').data('mmenu');
    apiButt.close($("#my-menu"));

    apiButt.bind('open:finish', function() {
        $('.hamburger').addClass('is-active');
        });
    apiButt.bind('close:finish', function() {
        $('.hamburger').removeClass('is-active');
        });

    //cart-trigger
    $('.js-cart-trigger').on('click', function(){
        $('.cart').toggleClass('hidden');
    });

//            $('.js-cart-trigger').on('click', function(event){
//                console.log(666);
//                if ($(event.target).closest('.dropdown_main_menu_in').length) return;
//                $('.cart').toggleClass('hidden');
//                event.stopPropagation();
//            });

// stars
    $('.stars').raty({
        readOnly : true,
        score    : 4,
        starHalf    : 'raty-master/lib/images/star-half.png', // The name of the half star image.
        starOff     : 'raty-master/lib/images/star-off.png', // Name of the star image off.
        starOn      : 'raty-master/lib/images/star-on.png',
        cancelOff   : 'raty-master/lib/images/cancel-off.png', // Icon used on active cancel.
        cancelOn    : 'raty-master/lib/images/cancel-on.png'
    });

//  formstyler для странуцы карты, стилизация инпута
    $('.js-styler').styler();

//  для страницы карты - перемещает ингридиенты из добавок в продукт

    $('.items-wrapper').on('click', '.edit.item-small .badge' , function(e){
        let thisParent = $(this).parent('.edit').parent().parent().attr('class').split(' ')[0],
            a = $(this).parent('.edit').remove();

        if( thisParent == 'aditionals') {
            $('.main-items .items-wrapper').append(a);
        } else {
            $('.aditionals .items-wrapper').append(a);
        }
    });

//mask for cart-page.html  form
    $('#number2').mask('+38 999 999 99 99')

//    catalog-page dropdown toggle

    $(document).on('click','.dropdown-toggle', // тут прописываем селектор, который добавляем к тем .dropdown-menu, которые не должна закрываться по клику на внутренних элементах
        function (e) {
            $(this).next('.dropdown-menu').toggle();



//                        if(e.target.type == "submit"){  // ловит кклик на кнопку
//                            let l = $(this).find("input:checked").length;
//                            let arr = [];
//                            for(i = 0; i < l; i++){
//                                arr.push(" " + $(this).find("input:checked")[i].value);
//                            }
//                            $(this).parent().find(".items").text(arr);
//                            $(this).parent().removeClass("open");
//                            e.preventDefault();
//                            return;
//                        }
            e.stopPropagation();
        }
    );

    var sortBy = $('#filter-menu + .dropdown-menu .active'),
        sortText =  sortBy.text().trim();
    $('#filter-menu p').text( sortText + ' 3' );
//        $('#filter-menu + .dropdown-menu li a').on('click', function(){
//            sortText = $(this).text();
//            $(this).addClass('active');
//            $(this).parent().siblings().find('a').removeClass('active');
//            $('#filter-menu p').text( sortText );
//        });



});