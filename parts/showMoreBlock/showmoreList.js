
// 3.1 show more for list ( ul > li*5 )
    const
        TEXTTOSHOW = 'Показать еще',
        TEXTTOHIDE = 'Скрыть';
    $('.js-nested').each(function(){
        let
            itemsToShow = 5,
            filterAmount = $(this).find('li').length;
        if( filterAmount > itemsToShow){
            $('li', this).eq(itemsToShow - 1).nextAll().hide().addClass('toggleable');
            $(this).after(`<div class="filter__show-more js-show"><span>${TEXTTOSHOW}</span></div>`);
        }
    });

    $('.js-show').on('click', function(){
        $(this).find('span').text() == TEXTTOHIDE ? $(this).find('span').text(TEXTTOSHOW) : $(this).find('span').text(TEXTTOHIDE);
        $(this).prev().find('li.toggleable').slideToggle();
    });

//
// <ul class=" js-nest">
//     <li></li>
//     <li></li>
//     <li></li>
//     <li></li>
//     <li></li>
//     <li></li>
// </ul>


