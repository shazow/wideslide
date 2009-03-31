/* wideslide - jQuery plugin for a landscape-scrolling image slideshow.
 *
 * By Andrey Petrov (shazow.net) and Ryan Feeley (ryanfeeley.com)
 */

function Wideslide(_target, images, options) {
    var self = this;
    var timer = true;
    this.pos = 0;
    this.images = images;


    // Build containers
    var target = $('<div class="wideslide" />').css('height', options.height + 'px').css('width', options.width + 'px').css('overflow', 'hidden').css('display', 'block');
    $(_target).replaceWith(target);
    var container = $('<div />').css('width', options.max_width + 'px');
    container.offset = 0;
    target.append(container);
    var parent_left = target.offset().left;

    // Prepare images to be loaded
    images.each(function(i, data) {
        var img = $(this).css('float', 'left').css('margin', '0').css('position', 'relative');
        this.num = i;
        this.wideslide = self;
        container.append(img);

        this.view = function(e) {
            var width = $(this).width();
            var extra = (options.width - width)/2;
            var left = -parent_left + $(this).offset().left;

            // Calculate offset (dynamic to the current position during each click)
            var img_offset = -left + extra;
            if(this.num == images.length-1) img_offset = -left + (options.width - width);
            else if(this.num == 0) {
                container.offset = 0;
                img_offset = 0;
            }

            // Keep track of the offset and animate the motion
            container.offset += img_offset;
            container.animate({
                marginLeft: container.offset + 'px'
            }, options.speed);

            // Continue the timer if it's still on
            if(timer) $(this).sleep(options.timer, function() { if(timer) self.next() });
        }
        $(this).click(function(e) {
            timer = false;
            this.view(e);
        });

        if(this.num==0 && options.timer) {
            $(this).sleep(options.timer, function() { if(timer) self.next() });
        }
    });
}

Wideslide.prototype.next = function() {
    this.pos += 1;
    if (this.pos > this.images.length - 1) this.pos = 0; // Loop around
    this.images[this.pos].view();
}

/* Narsty hack for a proper sleep function. Death to setTimeout. */
jQuery.fn.sleep = function sleep(time, callback) {
   this.animate({opacity: 1.0}, time, callback);
}

jQuery.fn.wideslide = function(_options) {
    var options = jQuery.extend({
        width: 900,         // Width of the container
        height: 450,        // Height of the container
        max_width: 10000,   // Any number greater than the sum of all images' widths
        speed: 300,         // Speed of the switching animation
        timer: 0            // Timer in milliseconds for auto-play (0 = off)
    }, _options);

    return this.map(function() {
        var images = jQuery("img", this).remove();
        return new Wideslide(this, images, options);
    });
};
