// Set the date we're counting down to
var countDownDate = new Date("Oct 20, 2022 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("counter").innerHTML = days + " " + plural(['день', 'дня', 'дней'], days) + " " + hours + ":" +
        addZeroes(minutes) + ":" + addZeroes(seconds);

    function addZeroes(number) {
        return number < 10 ? "0" + number : number;
    }

    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("counter").innerHTML = "EXPIRED";
    }
}, 500);


function plural(forms, n) {
    let idx;
    // @see http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html
    if (n % 10 === 1 && n % 100 !== 11) {
        idx = 0; // many
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        idx = 1; // few
    } else {
        idx = 2; // one
    }
    return forms[idx] || '';
}





// mobileOnlySlider(".cards", true, false, 767);

// function mobileOnlySlider($slidername, $dots, $arrows, $breakpoint) {
//     var slider = $($slidername);
//     var settings = {
//         mobileFirst: true,
//         dots: $dots,
//         arrows: $arrows,
//         responsive: [{
//             breakpoint: $breakpoint,
//             settings: "unslick"
//         }]
//     };

//     slider.slick(settings);

//     $(window).on("resize", function() {
//         if ($(window).width() > $breakpoint) {
//             return;
//         }
//         if (!slider.hasClass("slick-initialized")) {
//             return slider.slick(settings);
//         }
//     });
//} // Mobile Only Slider

/* Slick needs no get Reinitialized on window Resize after it was destroyed */
$(window).on('load resize orientationchange', function() {
    $('.cards').each(function() {
        var $carousel = $(this);
        /* Initializes a slick carousel only on mobile screens */
        // slick on mobile
        if ($(window).width() > 768) {
            if ($carousel.hasClass('slick-initialized')) {
                $carousel.slick('unslick');
            }
        } else {
            if (!$carousel.hasClass('slick-initialized')) {
                $carousel.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    mobileFirst: true,
                    dots: true
                });
            }
        }
    });
});