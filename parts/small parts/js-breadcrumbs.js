//remove href from last link in breadcrambs 
    if($('.js-breadcrumbs a').length > 1 ) {
        $('.js-breadcrumbs a:last-child').attr('href', '#');
        $('.js-breadcrumbs a:last-child').on('click', function (e) {
            e.preventDefault();
        })
    }
