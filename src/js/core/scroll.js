import { $, offsetTop } from '../util/index';

export default function (UIkit) {

    UIkit.component('scroll', {

        props: {
            duration: Number,
            easing: String,
            offset: Number
        },

        defaults: {
            duration: 1000,
            easing: 'easeOutExpo',
            offset: 0
        },

        methods: {

            scrollToElement(el) {

                // get / set parameters
                var target = offsetTop($(el)) - this.offset,
                    docHeight = document.documentElement.offsetHeight,
                    winHeight = window.innerHeight;

                if (target + winHeight > docHeight) {
                    target = docHeight - winHeight;
                }

                // animate to target, fire callback when done
                $('html,body')
                    .stop()
                    .animate({scrollTop: Math.round(target)}, this.duration, this.easing)
                    .promise()
                    .then(() => this.$el.trigger('scrolled', [this]));

            }

        },

        events: {

            click(e) {

                if (e.isDefaultPrevented()) {
                    return;
                }

                e.preventDefault();
                this.scrollToElement($(this.$el[0].hash).length ? this.$el[0].hash : 'body');
            }

        }

    });

    $.easing.easeOutExpo = $.easing.easeOutExpo || function (x, t, b, c, d) {
        return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    };

}
