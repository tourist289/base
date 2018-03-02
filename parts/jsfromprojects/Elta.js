function getURLVar(key) {
    var value = [];

    var query = document.location.search.split('?');

    if (query[1]) {
        var part = query[1].split('&');

        for (i = 0; i < part.length; i++) {
            var data = part[i].split('=');

            if (data[0] && data[1]) {
                value[data[0]] = data[1];
            }
        }

        if (value[key]) {
            return value[key];
        } else {
            return '';
        }
    }
}


//3.2  show more
$(document).ready(function () {
    var
        blocks = $('.js-more'),
        linkText = blocks.data('linktext'),//"показать"
        linkText2 = blocks.data('linktext2');// "скрыть"
    for(var i = 0; i < blocks.length; i++) {
        var
            realHeight = blocks[i].clientHeight,
            dataHeight = blocks[i].dataset.height,
            moreLink = document.createElement('span');
            moreLink.innerHTML = linkText;
            moreLink.dataset.height = realHeight;
            moreLink.className = 'show-more__link js-more-link';
        if(realHeight > dataHeight) {
            blocks[i].after(moreLink);
            blocks[i].style.height = dataHeight + 'px';
            blocks[i].dataset.trigger = 1;
        }
    }
    $(document).on('click', '.js-more-link', function(){
        var realheight = $(this).data('height'),
            parent = $(this).prev();
        if( parent.data('trigger') == 1) {
            parent.animate({
                height: realheight
            }, 500);
            $(this).text(linkText2);
            parent.data('trigger', 0);
            parent.addClass('open');
        } else {
            parent.animate({
                height: dataHeight
            }, 500);
            $(this).text(linkText);
            parent.data('trigger', 1);
            parent.removeClass('open');
        }
    });
});




$(document).ready(function () {
    $('.js-call').on('click', function(){
        var modal = $.remodal.lookup[$('[data-remodal-id=modal_alert_call]').data('remodal')];
        modal.open();
    });

    $(".js-mask__phone").mask("(999) 999-9999");


// // 2. formstyler js

    $('.js-styler').styler();
// 3. masked input
    $(".js-phone").mask("(999) 999-9999");

// 4 back to top
    $(window).on('scroll load', function() {
        if($(this).scrollTop() > 450) {
            $('.backTop').fadeIn();
        } else {
            $('.backTop').fadeOut();
        }
    });

    $('.js-toTop').click(function(){
        $('html, body').animate({scrollTop:0}, 'slow');
    });



});
$(document).ready(function () {
    // Highlight any found errors
    $('.text-danger').each(function () {
        var element = $(this).parent().parent();

        if (element.hasClass('form-group')) {
            element.addClass('has-error');
        }
    });

    // Currency
    $('#form-currency .currency-select').on('click', function (e) {
        e.preventDefault();

        $('#form-currency input[name=\'code\']').val($(this).attr('name'));

        $('#form-currency').submit();
    });

    // Language
    $('#form-language .language-select').on('click', function (e) {
        e.preventDefault();

        $('#form-language input[name=\'code\']').val($(this).attr('name'));

        $('#form-language').submit();
    });

    /* Search */
    $('#search input[name=\'search\']').parent().find('button').on('click', function () {
        var url = $('base').attr('href') + 'index.php?route=product/search';

        var value = $('#search input[name=\'search\']').val();

        if (value) {
            url += '&search=' + encodeURIComponent(value);
        }

        location = url;
    });

    $('#search input[name=\'search\']').on('keydown', function (e) {
        if (e.keyCode == 13) {
            $('#search input[name=\'search\']').parent().find('button').trigger('click');
        }
    });

    // Menu
    $('#menu .dropdown-menu').each(function () {
        var menu = $('#menu').offset();
        var dropdown = $(this).parent().offset();

        var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());

        if (i > 0) {
            $(this).css('margin-left', '-' + (i + 10) + 'px');
        }
    });

    // Product List
    $('#list-view').click(function () {
        $('#content .product-grid > .clearfix').remove();

        $('#content .row > .product-grid').attr('class', 'product-layout product-list col-xs-12');
        $('#grid-view').removeClass('active');
        $('#list-view').addClass('active');

        localStorage.setItem('display', 'list');
    });

    // Product Grid
    $('#grid-view').click(function () {
        // What a shame bootstrap does not take into account dynamically loaded columns
        var cols = $('#column-right, #column-left').length;

        if (cols == 2) {
            $('#content .product-list').attr('class', 'product-layout product-grid col-lg-6 col-md-6 col-sm-12 col-xs-12');
        } else if (cols == 1) {
            $('#content .product-list').attr('class', 'product-layout product-grid col-lg-4 col-md-4 col-sm-6 col-xs-12');
        } else {
            $('#content .product-list').attr('class', 'product-layout product-grid col-lg-3 col-md-3 col-sm-6 col-xs-12');
        }

        $('#list-view').removeClass('active');
        $('#grid-view').addClass('active');

        localStorage.setItem('display', 'grid');
    });

    if (localStorage.getItem('display') == 'list') {
        $('#list-view').trigger('click');
        $('#list-view').addClass('active');
    } else {
        $('#grid-view').trigger('click');
        $('#grid-view').addClass('active');
    }

    // Checkout
    $(document).on('keydown', '#collapse-checkout-option input[name=\'email\'], #collapse-checkout-option input[name=\'password\']', function (e) {
        if (e.keyCode == 13) {
            $('#collapse-checkout-option #button-login').trigger('click');
        }
    });

    // tooltips on hover
    $('[data-toggle=\'tooltip\']').tooltip({container: 'body', trigger: 'hover'});

    // Makes tooltips work on ajax generated content
    $(document).ajaxStop(function () {
        $('[data-toggle=\'tooltip\']').tooltip({container: 'body'});
    });
});

// Cart add remove functions
var cart = {
    'add': function (product_id, quantity) {
        $.ajax({
            url: 'index.php?route=checkout/cart/add',
            type: 'post',
            data: 'product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
            dataType: 'json',
            beforeSend: function () {
            },
            complete: function () {
            },
            success: function (json) {
                $('.alert, .text-danger').remove();

                if (json['redirect']) {
                    location = json['redirect'];
                }

                if (json['success']) {
                    $('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');

                    // Need to set timeout otherwise it wont update the total
                    setTimeout(function () {
                        $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
                    }, 100);

                    $('html, body').animate({scrollTop: 0}, 'slow');
                    $('#cart').load('index.php?route=common/cart/info div#cart');


                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    },
    'update': function (key, quantity) {
        $.ajax({
            url: 'index.php?route=checkout/cart/edit',
            type: 'post',
            data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
            dataType: 'json',
            beforeSend: function () {
                $('#cart > button').button('loading');
            },
            complete: function () {
                $('#cart > button').button('reset');
            },
            success: function (json) {
                // Need to set timeout otherwise it wont update the total
                setTimeout(function () {
                    $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
                }, 100);

                if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
                    location = 'index.php?route=checkout/cart';
                } else {
                    $('#cart > ul').load('index.php?route=common/cart/info ul li');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    },
    'remove': function (key) {
        $.ajax({
            url: 'index.php?route=checkout/cart/remove',
            type: 'post',
            data: 'key=' + key,
            dataType: 'json',
            beforeSend: function () {
            },
            complete: function () {
            },
            success: function (json) {
                // Need to set timeout otherwise it wont update the total
                setTimeout(function () {
                    $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
                }, 100);

                var now_location = String(document.location.pathname);

                if ((now_location == '/cart/') || (now_location == '/checkout/') || (getURLVar('route') == 'checkout/cart') || (getURLVar('route') == 'checkout/checkout')) {
                    location = 'index.php?route=checkout/cart';
                } else {
                    $('#cart').load('index.php?route=common/cart/info div#cart');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    }
}

var voucher = {
    'add': function () {

    },
    'remove': function (key) {
        $.ajax({
            url: 'index.php?route=checkout/cart/remove',
            type: 'post',
            data: 'key=' + key,
            dataType: 'json',
            beforeSend: function () {
                $('#cart > button').button('loading');
            },
            complete: function () {
                $('#cart > button').button('reset');
            },
            success: function (json) {
                // Need to set timeout otherwise it wont update the total
                setTimeout(function () {
                    $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
                }, 100);

                if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
                    location = 'index.php?route=checkout/cart';
                } else {
                    $('#cart > ul').load('index.php?route=common/cart/info ul li');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    }
}

var wishlist = {
    'add': function (product_id) {
        $.ajax({
            url: 'index.php?route=account/wishlist/add',
            type: 'post',
            data: 'product_id=' + product_id,
            dataType: 'json',
            success: function (json) {
                $('.alert').remove();

                if (json['redirect']) {
                    location = json['redirect'];
                }

                if (json['success']) {
                    $('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                }

                $('#wishlist-total span').html(json['total']);
                $('#wishlist-total').attr('title', json['total']);

                $('html, body').animate({scrollTop: 0}, 'slow');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    },
    'remove': function () {

    }
}

var contact = {
    'add': function () {
        var form = $('#connect_with_us_form');
        var msg = form.serialize();
        form.find('.loader').removeClass('hidden');
        form.find(".text-danger").text('');
        form.find('.text-danger').addClass('hidden');

        $.ajax({
            url: 'index.php?route=information/contact/add',
            type: 'post',
            data: msg,
            dataType: 'json',
            beforeSend: function () {
            },
            complete: function () {
            },
            success: function (json) {
                var form = $('#connect_with_us_form');
                form.find('.loader').addClass('hidden');

                if (json['redirect']) {
                    location = json['redirect'];
                }

                if (json['success']) {
                    var alert = $.remodal.lookup[$('[data-remodal-id=modal_alert_manager]').data('remodal')];
                    alert.open();
                    form.find('input, textarea').each(function () {
                        $(this).val('');
                    });
                } else {
                    if (json.errorField) {
                        $.each(json.errorField, function (key, value) {
                            var input = form.find("[name=" + key + "]").prev("div.text-danger");
                            input.html(value);
                            input.removeClass('hidden');
                        });
                    } else {
                        var alarm = form.find('.error-message.errorFormDevelopment');
                        alarm.html(json.alert);
                        alarm.removeClass('hidden');
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    }
};

var callBack = {
    'send': function () {
        var form = $('#call_back_form');
        var msg = form.serialize();
        form.find('.loader').removeClass('hidden');
        form.find(".text-danger").text('');
        form.find('.text-danger').addClass('hidden');

        $.ajax({
            url: 'index.php?route=extension/module/callback/add',
            type: 'post',
            data: msg,
            dataType: 'json',
            beforeSend: function () {
            },
            complete: function () {
            },
            success: function (json) {
                var form = $('#call_back_form');
                form.find('.loader').addClass('hidden');

                if (json['redirect']) {
                    location = json['redirect'];
                }

                if (json['success']) {
                    var alert = $.remodal.lookup[$('[data-remodal-id=modal_alert_manager]').data('remodal')];
                    alert.open();
                    form.find('input, textarea').each(function () {
                        $(this).val('');
                    });
                } else {
                    if (json.errorField) {
                        $.each(json.errorField, function (key, value) {
                            var input = form.find("[name=" + key + "]").prev("div.text-danger");
                            input.html(value);
                            input.removeClass('hidden');
                        });
                    } else {
                        var alarm = form.find('.error-message.errorFormDevelopment');
                        alarm.html(json.alert);
                        alarm.removeClass('hidden');
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    }
};

var product = {
    'sendPrice': function () {
        var form = $('#request_price_form');
        var msg = form.serialize();
        form.find('.loader').removeClass('hidden');
        form.find(".text-danger").text('');
        form.find('.text-danger').addClass('hidden');

        $.ajax({
            url: 'index.php?route=product/product/sendPriceRequest',
            type: 'post',
            data: msg,
            dataType: 'json',
            beforeSend: function () {
            },
            complete: function () {
            },
            success: function (json) {
                var form = $('#request_price_form');
                form.find('.loader').addClass('hidden');

                if (json['success']) {
                    var alert = $.remodal.lookup[$('[data-remodal-id=modal_alert_manager]').data('remodal')];
                    alert.open();
                    form.find('input, textarea').each(function () {
                        $(this).val('');
                    });
                } else {
                    if (json.errorField) {
                        $.each(json.errorField, function (key, value) {
                            var input = form.find("[name=" + key + "]").prev("div.text-danger");
                            input.html(value);
                            input.removeClass('hidden');
                        });
                    } else {
                        var alarm = form.find('.error-message.errorFormDevelopment');
                        alarm.html(json.alert);
                        alarm.removeClass('hidden');
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    }
};

var compare = {
    'add': function (product_id) {
        $.ajax({
            url: 'index.php?route=product/compare/add',
            type: 'post',
            data: 'product_id=' + product_id,
            dataType: 'json',
            success: function (json) {
                $('.alert').remove();

                if (json['success']) {
                    $('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');

                    $('#compare-total').html(json['total']);

                    $('html, body').animate({scrollTop: 0}, 'slow');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    },
    'remove': function () {

    }
};

/* Agree to Terms */
$(document).delegate('.agree', 'click', function (e) {
    e.preventDefault();

    $('#modal-agree').remove();

    var element = this;

    $.ajax({
        url: $(element).attr('href'),
        type: 'get',
        dataType: 'html',
        success: function (data) {
            html = '<div id="modal-agree" class="modal">';
            html += '  <div class="modal-dialog">';
            html += '    <div class="modal-content">';
            html += '      <div class="modal-header">';
            html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
            html += '        <h4 class="modal-title">' + $(element).text() + '</h4>';
            html += '      </div>';
            html += '      <div class="modal-body">' + data + '</div>';
            html += '    </div';
            html += '  </div>';
            html += '</div>';

            $('body').append(html);

            $('#modal-agree').modal('show');
        }
    });
});

// Autocomplete */
(function ($) {
    $.fn.autocomplete = function (option) {
        return this.each(function () {
            this.timer = null;
            this.items = new Array();

            $.extend(this, option);

            $(this).attr('autocomplete', 'off');

            // Focus
            $(this).on('focus', function () {
                this.request();
            });

            // Blur
            $(this).on('blur', function () {
                setTimeout(function (object) {
                    object.hide();
                }, 200, this);
            });

            // Keydown
            $(this).on('keydown', function (event) {
                switch (event.keyCode) {
                    case 27: // escape
                        this.hide();
                        break;
                    default:
                        this.request();
                        break;
                }
            });

            // Click
            this.click = function (event) {
                event.preventDefault();

                value = $(event.target).parent().attr('data-value');

                if (value && this.items[value]) {
                    this.select(this.items[value]);
                }
            }

            // Show
            this.show = function () {
                var pos = $(this).position();

                $(this).siblings('ul.dropdown-menu').css({
                    top: pos.top + $(this).outerHeight(),
                    left: pos.left
                });

                $(this).siblings('ul.dropdown-menu').show();
            }

            // Hide
            this.hide = function () {
                $(this).siblings('ul.dropdown-menu').hide();
            }

            // Request
            this.request = function () {
                clearTimeout(this.timer);

                this.timer = setTimeout(function (object) {
                    object.source($(object).val(), $.proxy(object.response, object));
                }, 200, this);
            }

            // Response
            this.response = function (json) {
                html = '';

                if (json.length) {
                    for (i = 0; i < json.length; i++) {
                        this.items[json[i]['value']] = json[i];
                    }

                    for (i = 0; i < json.length; i++) {
                        if (!json[i]['category']) {
                            html += '<li data-value="' + json[i]['value'] + '"><a href="#">' + json[i]['label'] + '</a></li>';
                        }
                    }

                    // Get all the ones with a categories
                    var category = new Array();

                    for (i = 0; i < json.length; i++) {
                        if (json[i]['category']) {
                            if (!category[json[i]['category']]) {
                                category[json[i]['category']] = new Array();
                                category[json[i]['category']]['name'] = json[i]['category'];
                                category[json[i]['category']]['item'] = new Array();
                            }

                            category[json[i]['category']]['item'].push(json[i]);
                        }
                    }

                    for (i in category) {
                        html += '<li class="dropdown-header">' + category[i]['name'] + '</li>';

                        for (j = 0; j < category[i]['item'].length; j++) {
                            html += '<li data-value="' + category[i]['item'][j]['value'] + '"><a href="#">&nbsp;&nbsp;&nbsp;' + category[i]['item'][j]['label'] + '</a></li>';
                        }
                    }
                }

                if (html) {
                    this.show();
                } else {
                    this.hide();
                }

                $(this).siblings('ul.dropdown-menu').html(html);
            }

            $(this).after('<ul class="dropdown-menu"></ul>');
            $(this).siblings('ul.dropdown-menu').delegate('a', 'click', $.proxy(this.click, this));

        });
    }


    $(document).ready(function () {


        $(document).on('click', '.js-cart-drop ',  function (e){
            if(e.target.className == 'cart__remove-icon') {
            } else {
                e.stopPropagation();
            }
        });


// filter block add class active to first tab
    setTimeout(function () {
        $('.js-block-sort ul li:first-child a').click();
    },  500);



        // menu-navigation
        $('#my-menu').removeClass('hidden');

        $('#my-menu').mmenu({
            extensions: ['effect-menu-slide', 'pagedim-black'],
            navbar: {
                title: 'ELTA-LTD'
            },
            offCanvas: {
//                pageSelector: ".main-wrap",
                position: 'left'
            }
        });

        $('#cart-mob').mmenu({
            extensions: ['effect-menu-slide', 'pagedim-black'],
            navbar: {
                title: 'Корзина'
            },
            offCanvas: {
                position: 'right'
            }
        });


        var apiButt = $('#my-menu').data('mmenu');
        apiButt.close($("#my-menu"));

        apiButt.bind('open:finish', function () {
            $('.hamburger').addClass('is-active');
        });
        apiButt.bind('close:finish', function () {
            $('.hamburger').removeClass('is-active');
        });


        // main-catalog разворачивание подкаталога
        var i,
            acc = document.getElementsByClassName("js-accordion");
        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            }
        }
        $('.js-list').on('click', function (e) {
            if(e.toElement.localName == 'li'){
                e.preventDefault();
                $(this).find('ul').toggle();
                $(this).toggleClass('open');
            }
        });


        // news-block развернуть новость
        $('.js-article').on('click', function (e) {
            $(this).parent().toggleClass('open');
        });


        // js-show-more развернуть блок О нас
        // $('.js-show-more').on('click', function (e) {
        //     $(this).parent().find('.text-wrap').toggleClass('open');
        //
        //     $(this).text() == "Cвернуть" ? $(this).text("Читать полностью") : $(this).text("Cвернуть");
        // });


        // filter block reset button
        $('.js-resetRange').on('click', function (e) {
            $(this).parents('.filters-item').find('.jq-checkbox').each(function (ind, el) {
                el.classList.remove('checked');
            })

        });


        //рейтинг
        // $('.stars').raty({
        //     readOnly: true,
        //     score: function() {
        //         return $(this).attr('data-score');
        //     },
        //     path: '/raty/images/'
        // });
        //
        // $('.js-starForm').raty({
        //     score    : 0,
        //     path: '/raty/images/'
        // });


        $('.js-styler').styler();
    });


})(window.jQuery);
