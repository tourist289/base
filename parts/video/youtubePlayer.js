

//YOUTUbe video on a page   
    $(window).ready(function() {
    //   put this code on a page where your video is 
    // <script>     
    //     // 2. This code loads the IFrame Player API code asynchronously.
    //     var tag = document.createElement('script');
    //     tag.src = "https://www.youtube.com/iframe_api";
    //     var firstScriptTag = document.getElementsByTagName('script')[0];
    //     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    //
    //     var player1;
    //     var player2;
    //     function onYouTubeIframeAPIReady() {
    //         player1 = new YT.Player('player1');
    //         player2 = new YT.Player('player2');
    //     }
    // </script>
    //    

    // <iframe id="player1" class="embed-responsive-item" id="youtube" src="https://www.youtube-nocookie.com/embed/SMmDIMmQTak?rel=0&amp;enablejsapi=1" frameborder="0" allowfullscreen></iframe>
    // <iframe id="player2" class="embed-responsive-item" id="youtube" src="https://www.youtube-nocookie.com/embed/SMmDIMmQTak?rel=0&amp;enablejsapi=1" frameborder="0" allowfullscreen></iframe>


        // triger video player inside slider on tovar page
        $('.js_slider-for.page-slider').on('beforeChange' , function(event, slick, currentSlide, nextSlide){

            let indexWithIframe = $(this).find('.slick-slide iframe').closest('.slider_item').attr('data-slick-index');
            if(nextSlide == indexWithIframe ){
                player1.playVideo();
            } else {
                player1.stopVideo();
            }
        });

    // triger video player inside slider on tovar page
        $('.js_slider-for.modal-slider').on('beforeChange' , function(event, slick, currentSlide, nextSlide){

            let indexWithIframe = $(this).find('.slick-slide iframe').closest('.slider_item').attr('data-slick-index');
            if(nextSlide == indexWithIframe ){
                player2.playVideo();
            } else {
                player2.stopVideo();
            }
        });
    });

