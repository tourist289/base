



// 3. show more

// 4. mmenu
// 5.slick slider


$(document).ready(function(){









// 3. show more
    $('.js-more').on('click', function(){
        $(this).prev().toggleClass('fullHeight');
        $('#courses').toggleClass('space');
    });


// 4. mmenu
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




// 5.slick slider
    $('#topSlider').slick({
        slidesToShow:1,
        slidesToScroll:1,
        arrows: false,
        dots: false,
        focusOnSelect:true,
        autoplay: false
//
    });

    $('#fullWSlider').slick(getCoursesSliderSettings());

    function getCoursesSliderSettings(){
        return {
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
        }
    }



// 6.




});



