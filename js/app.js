$(document).ready(function(){
    // Lodash debounce to control the number of times functions are triggered
    debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    $('[data-group').each(function(){
        var $allTarget = $(this).find('[data-target]'),
            $allClick = $(this).find('[data-click]'),
            activeClass = 'active';
        
        $allTarget.first().addClass(activeClass);
        $allClick.first().addClass(activeClass);
        $allClick.click(function(e){
            e.preventDefault();

            var id = $(this).data('click'),
                $target = $('[data-target="' + id + '"]');
            
            $allClick.removeClass(activeClass);
            $allTarget.removeClass(activeClass);

            $target.addClass(activeClass);
            $(this).addClass(activeClass);
        })
    });

   // This function create a softly scroll when you click at a internal link
    $('.menu-nav a[href^="#"]').on('click', function(e){
        /* That case, a[href^="#"] will prevent default works only internal links, 
		 however external links will work normally  */
        e.preventDefault();
        var id = $(this).attr('href'),
            menuHeight = $('.menu').innerHeight(),
            targetOffset = $(id).offset().top;

        $('html, body').animate({
            scrollTop: targetOffset - menuHeight
        },500);
    });

    // A simple function that scroll at the top when you click on the logo of this website
    $('.logo').click(function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // This class will underscored the section activated when you click at the link
    $('section').each(function(){
        var height = $(this).height(),
            offsetTop = $(this).offset().top,
            id = $(this).attr('id'),
            menuHeight = $('.menu').innerHeight() + 1,
            itemMenu = $('a[href="#' + id + '"]');
        
        $(window).scroll(function(){
            var scrollTop = $(window).scrollTop();
            if(offsetTop - menuHeight < scrollTop && offsetTop + height - menuHeight > scrollTop) {
                itemMenu.addClass('active');
            } else {
                itemMenu.removeClass('active');
            }
        });
    });

    // This section will add a class that activates the burger menu
    $('.mobile-btn').click(function(){
        $(this).toggleClass('active');
        $('.mobile-menu').toggleClass('active');
    });

    // Here you control the addition of the .active class that controls the carousel in the introduction
    (function() {
        function slider(sliderName){
            var sliderClass = '.' + sliderName,
                activeClass = 'active',
                rotate = setInterval(rotateSlide, 2000);
                
            $('.slide > :first').addClass(activeClass);

            function rotateSlide() {
                var activeSlide = $(sliderClass + ' > .' + activeClass),
                    nextSlide = activeSlide.next();

                if(nextSlide.length == 0) {
                    nextSlide = $( sliderClass + ' > :first');
                }
                activeSlide.removeClass(activeClass);
                nextSlide.addClass(activeClass);
            }
        }
        slider('introducao');
    })();

    // Animation at scrolling

    (function() { 
        var $target = $('[data-anime="scroll"]'),
            animationClass = 'animate',
            offset = $(window).height() * 3/4;
        
        function animeScroll() {
            var documentTop = $(document).scrollTop();

            $target.each(function(){
                var itemTop = $(this).offset().top;
                console.log('teste');
                if (documentTop > itemTop - offset) {
                    $(this).addClass(animationClass);
                } else {
                    $(this).removeClass(animationClass);
                }
            });
        }
        animeScroll();
        $(document).scroll(debounce(function(){
            animeScroll();
        }, 200));
    })();
});