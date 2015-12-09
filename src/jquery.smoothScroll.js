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
        var settings = $.smoothScroll.getSettings(options);

        return this.each(function (index) {
            var selector = $(this).attr(settings.selectorAttribute);

            if (selector && (!settings.hashOnly || selector.match(/^#.+/))) {
                $(this).on(settings.events + '.smoothScroll.' + index, function () {
                    return $.smoothScroll.to(selector, options);
                });
            }
        });
    };

    $.smoothScroll = {
        to: function(selector, options) {
            var settings = this.getSettings(options);

            $(window).scrollTop($(window).scrollTop() + 1);

            var scrollElement = $('html');

            if (scrollElement.scrollTop() <= 0) {
                scrollElement = $('body');
            }

            scrollElement.animate({
                scrollTop: $(selector).offset().top - settings.offset
            }, settings.speed, settings.easing, settings.callback);

            return false;
        },

        // Default setting values
        defaults: {
            events: 'click',
            speed: 300,
            easing: 'linear',
            offset: 0,
            selectorAttribute: 'href',
            hashOnly: true,
            callback: function() {}
        },

        getSettings: function(options) {
            return $.extend(true, {}, this.defaults, options);
        }
    };

})(jQuery);
