$(document).ready(function(){

    setTimeout(function(){
        $('#topSlider,  #mainSlider').css('opacity', 1);
    }, 800);

    $('#mainSlider').slick({
        slidesToShow:1,
        slidesToScroll:1,
        arrows: true,
        dots: true,
        focusOnSelect:true,
        autoplay: false
//
    });
    $('#topSlider').slick({
        slidesToShow:1,
        slidesToScroll:1,
        arrows: false,
        dots: false,
        focusOnSelect:true,
        autoplay: false
//
    });
    $('#fullWSlider').slick({
        slidesToShow:6,
        slidesToScroll:3,
        arrows: false,
        dots: false,
        focusOnSelect:true,
        autoplay: false,
        responsive:[
            {
                breakpoint: 1400,
                settings:{
                    slidesToShow: 5,
                    slidesToScroll:2
                }
            },
            {
                breakpoint: 1200,
                settings:{
                    slidesToShow: 4,
                    slidesToScroll:2
                }
            },
            {
                breakpoint: 1024,
                settings:{
                    slidesToShow: 3,
                    slidesToScroll:1
                }
            },
            {
                breakpoint:760,
                settings:{
                    slidesToShow: 2,
                    slidesToScroll:1
                }
            },
            {
                breakpoint:550,
                settings:{
                    slidesToShow: 1,
                    slidesToScroll:1
                }
            }

        ]
//
    });

    $('#recentlySlider').slick({
        slidesToShow: 3,
        slidesToScroll:1,
        arrows: true,
        infinite: true,
        dots: false,
        responsive:[
//            {
//                breakpoint: 1200,
//                settings:{
//                    slidesToShow: 3,
//                    dots: false,
//                    slidesToScroll:1,
//                    arrows: false
//                }
//            },
            {
                breakpoint: 830,
                settings:{
                    slidesToShow: 2,
                    slidesToScroll:1
                }
            },
            {
                breakpoint:480,
                settings:{
                    slidesToShow: 1,
                    slidesToScroll:1
                }
            }
        ]
//
    });


    $('.sortBy select, .navigation-block .pagination select').styler();







// menu-navigation
        $('#my-menu').removeClass('hidden');

        $('#my-menu').mmenu({
            extensions: ['effect-menu-slide', 'pagedim-black'],
            navbar: {
                title: '??????'
            },
            offCanvas: {
//                pageSelector: ".main-wrap",
                position: 'left'
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















    $('.js-more').on('click', function(){
          $(this).prev().toggleClass('fullHeight');
          $('#courses').toggleClass('space');
    });

/* ********** ************************************/

//    setTimeout(function(){
//        var slides = $('#courses .slide');
//
//
////        $('#courses figure').css('width',  ww + 'px');
////        $('#courses figure img').css('width',  ww  - pLeft + 'px');
//    }, 500)


    $('#courses .slide-block').on('mouseover', function(){

        var imgHeight = $(this).find('img').height() + 60;

        $(this).find('figure').css('margin-top', '-' + imgHeight + 'px' );
    });



    $('#courses .slide-block').on('mouseleave', function(){
        $(this).find('figure').css('margin-top', 0 );
//        $(this).find('.info-block h6').css('width', 100);
//        $(this).find('.info-block h6').css('left', 0 );
    });


/* ********** ****************/


    $('.btn-wrap a').on('click', function(){
        var id = $(this).attr('href');

        $(this).addClass('active');
        $(this).siblings().removeClass('active');

        $('.tab-pane .slider').slick('unslick');

        setTimeout(function(){
            $(id + '.tab-pane .slider').slick(getCoursesSliderSettings());
        }, 330);
    });


//    <button data-toggle="modal" data-target="#signIn" class="btn-green" tabindex="0">Записаться на курс</button>


    $('#aboutCourse .price-block button').on('click', function(){
        $('#aboutCourse').modal('hide')
    });



    function getCoursesSliderSettings(){
        return {
            slidesToShow: 3,
            slidesToScroll:1,
            arrows: true,
            dots: false,
            responsive:[
                {
                    breakpoint: 800,
                    settings:{
                        slidesToShow:2,
                        slidesToScroll:1
                    }
                },
                {
                    breakpoint:530,
                    settings:{
                        slidesToShow:1,
                        slidesToScroll:1
                    }
                }
            ]
        }
    }


});