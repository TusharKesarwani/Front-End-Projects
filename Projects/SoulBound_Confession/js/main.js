const navbarToggler = document.querySelector(".navbar-toggler");
const navbarCollapse = document.querySelector("#navbar-wd");

navbarToggler.addEventListener("click", () => {
  navbarCollapse.classList.toggle("show");
});


(function($, window, document) {

    $.fn.slider = function(options) {

        return this.each(function() {

            var that = $(this);

            var defaults = {
                start_timeout: 1000,
                slide_animation: 1000,
                speed_of_effects: 1.5,
                delay_of_effects: 0.2
            };

            var settings = $.extend({}, defaults, options);

            var obj = {
                slides: that.find('li'),
                start: false,
                clips_number: 8,
                first_slide: function() {
                    return this.slides.eq(0);
                },
                start_clip_slide: function() {
                    return this.slides.eq(1);
                },
                loop: function(next_slide) {

                    for (var i = 0; i < obj.clips_number; i++) {

                        if (obj.start === false) {
                            obj.start_clip_slide().css({
                                'z-index': 1,
                                'display': 'block'
                            });
                        }

                        var canvas_element = $('<canvas>').attr({
                            id: 'canvasID_' + (i + 1),
                            class: 'canvasClass'
                        }).attr({
                            width: 100,
                            height: 500
                        }).css('left', 100 * i);

                        if (obj.start === false) {
                            canvas_element.appendTo(obj.start_clip_slide());
                        } else {
                            canvas_element.appendTo(next_slide);
                        }

                        var canvas = document.getElementById('canvasID_' + (i + 1));
                        var ctx = canvas.getContext('2d');
                        ctx.imageSmoothingEnabled = false;

                        var img = document.createElement('img');

                        var img_src = '';
                        if (obj.start === false) {
                            img_src = obj.start_clip_slide().find('img').attr('src');
                        } else {
                            img_src = next_slide.find('img').attr('src');
                        }

                        img.src = img_src;

                        ctx.drawImage(img, 100 * i, 0, 100, 500, 0, 0, 100, 500);
                    }
                },
                animation: function() {
                    if (obj.start === false) {
                        obj.loop();
                    }
                    obj.start = true;

                    var tl = new TimelineMax();

                    tl.add(TweenMax.set('.canvasClass', { top: -500 }));
                    tl.add(TweenMax.staggerTo(".canvasClass", settings.speed_of_effects, { top: 0 }, settings.delay_of_effects, myCompleteAll));

                    function myCompleteAll() {
                        setTimeout(obj.all_done, settings.slide_animation);
                    }
                },
                change_slide: function(next_slide) {
                    $('canvas').remove();
                    obj.loop(next_slide);
                    obj.animation();
                },
                all_done: function() {
                    obj.slides.css({
                        'z-index': 1,
                        'display': 'block'
                    });

                    var current_slide = that.find('li.active');

                    if (current_slide.length === 0) {
                        current_slide = obj.start_clip_slide();
                    }

                    current_slide.css({
                        'z-index': 2,
                        'display': 'block'
                    }).find('img').css('visibility', 'visible');

                    var next_slide = current_slide.next();

                    if (next_slide.length === 0) {
                        current_slide.css({
                            'z-index': 2,
                            'display': 'block'
                        }).find('img').css('visibility', 'visible');

                        next_slide = obj.first_slide();
                    }

                    obj.slides.removeClass('active');
                    next_slide.addClass('active');

                    next_slide.css({
                        'z-index': 3,
                        'display': 'block'
                    }).find('img').css('visibility', 'hidden');

                    obj.change_slide(next_slide);
                },
                init: function() {
                    obj.first_slide().css({
                        'z-index': 1,
                        'display': 'block'
                    }).find('img').css('visibility', 'visible');

                    obj.start_clip_slide().find('img').css('visibility', 'hidden');

                    setTimeout(obj.animation, settings.start_timeout);
                }
            };

            obj.init();
        });
    };

    $(document).ready(function() {
        $('#banner').slider();
    });

})(jQuery, window, document);
