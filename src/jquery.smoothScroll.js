/*!
 * jquery.smoothScroll() - v0.0.1
 *
 * Depends on jQuery
 * http://jquery.com/
 *
 * Copyright 2015 Masunaga Ray
 * http://www.msng.info/
 *
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.html
 */
;(function ($) {
    'use strict';

    $.fn.smoothScroll = function (options) {
        // Merge defaults to options
        var settings = $.extend(true, {}, $.fn.smoothScroll.defaults, options);

        return this.each(function (index) {
            var selector = $(this).attr(settings.selectorAttribute);
            if (selector && (!settings.hashOnly || selector.match(/^#.+/))) {
                $(this).on(settings.events + '.smoothScroll.' + index, function () {
                    $(window).scrollTop($(window).scrollTop() + 1);

                    var scrollElement = $('html');
                    if (scrollElement.scrollTop() <= 0) {
                        scrollElement = $('body');
                    }

                    scrollElement.animate({
                        scrollTop: $(selector).offset().top - settings.offset
                    }, settings.speed, settings.easing);

                    return false;
                });
            }
        });
    };

    // Default setting values
    $.fn.smoothScroll.defaults = {
        events: 'click',
        speed: 300,
        easing: 'linear',
        offset: 0,
        selectorAttribute: 'href',
        hashOnly: true
    };
})(jQuery);
