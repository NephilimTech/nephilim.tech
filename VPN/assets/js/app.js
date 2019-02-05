$(function() {
  // mobile nav
  $('.js-toggle-mobile-nav').on('click', function() {
    var $this = $(this),
        $nav  = $('.b12-nav');

    if (!$nav.hasClass('is-visible')) {
      $this.addClass('active');
      $nav.addClass('is-visible');
      $('body').css('overflow', 'hidden');
      headroom.destroy();
    } else {
      $this.removeClass('active');
      $nav.removeClass('is-visible');
      $('body').removeAttr('style');
      headroom.init();
    }
  });

  // sticky navbar
  if ($('.b12-nav-sticky').length) {
    var stickyToggle = function(sticky, stickyWrapper, scrollElement) {
      var stickyHeight = sticky.outerHeight();
      var stickyTop = stickyWrapper.offset().top;

      if (scrollElement.scrollTop() > stickyTop) {
        stickyWrapper.height(stickyHeight);
        sticky.addClass("is-sticky");
      } else {
        sticky.removeClass("is-sticky");
        stickyWrapper.height('auto');
      }
    };

    var sticky = $('.b12-nav-sticky');
    var stickyWrapper = $('<div>').addClass('sticky-wrapper');
    sticky.before(stickyWrapper);

    $(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function() {
      stickyToggle(sticky, stickyWrapper, $(this));
    });

    stickyToggle(sticky, stickyWrapper, $(window));
  }

  // jumping nav
  var navElement = document.querySelector('.b12-nav');

  if (navElement) {
    var headroom  = new Headroom(navElement, {
      offset: 200
    });
    headroom.init();
  }

  // mobile footer nav
  $('.js-mobile-toggle-footer-nav').on('click', function(e) {
    var $this = $(this),
        $parent = $this.closest('.footer__nav'),
        $nav = $parent.find('.footer__nav-list');

    if (!$parent.hasClass('is-nav-visible')) {
      $nav.slideDown('fast', function() {
        $parent.addClass('is-nav-visible');
      });
    } else {
      $nav.slideUp('fast', function() {
        $parent.removeClass('is-nav-visible');
      });
    }
  });

  if ($('.js-testimonials-slider').length) {
    $('.js-testimonials-slider').slick({
      infinite: true,
      appendArrows: '.js-testimonials-slider',
      prevArrow: '<button type="button" class="slick-prev"><svg width="10" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L1 9l8 8" stroke="#623CDC" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
      nextArrow: '<button type="button" class="slick-next"><svg width="10" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l8 8-8 8" stroke="#623CDC" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
      dots: true
    });
  }

  if ($('.js-featured-slider').length) {
    var $slider = $('.js-featured-slider');

    $slider.on('init', function(slick) {
      var $firstDot = $(slick.target).find('.slick-dots li:first');
      $firstDot.removeClass('slick-active');
      setTimeout(function() {
        $firstDot.addClass('slick-active');
      }, 1000);
    });

    $slider.slick({
      infinite: true,
      appendArrows: '.featured-slider',
      prevArrow: '<button type="button" class="slick-prev"><svg width="10" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L1 9l8 8" stroke="#623CDC" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
      nextArrow: '<button type="button" class="slick-next"><svg width="10" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l8 8-8 8" stroke="#623CDC" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
      dots: true,
      pauseOnHover: false,
      pauseOnDotsHover: true,
      autoplay: true,
      autoplaySpeed: 6000
    });
  }

  // scroll to
  $('.js-scroll-to').on('click', function(e) {
    e.preventDefault();

    var $this = $(this),
        whereTo = $this.data('to') || 'next',
        $elem = $('#' + whereTo);

    if (whereTo == 'next') {
      $elem = $this.closest('.section').next('.section');
    } else if (whereTo == 'self') {
      $elem = $this.closest('.section');
    }

    scrollToElem($elem);

    function scrollToElem($elem) {
      $('html, body').animate({
        scrollTop: ($elem.offset().top - 50) + 'px'
      }, 800);
    }
  });

  // faq
  $('.js-toggle-faq-item').on('click', function(e) {
    var $this = $(this),
        $parent = $this.parent(),
        $answer = $this.next();

    if (!$parent.hasClass('is-answer-visible')) {
      $answer.slideDown('fast', function() {
        $parent.addClass('is-answer-visible');
      });
    } else {
      $answer.slideUp('fast', function() {
        $parent.removeClass('is-answer-visible');
      });
    }
  });

  // get started button with email input
  $('.get-started-form').on('submit', function(e) {
    e.preventDefault();

    var signupUrl = 'https://b12.io/signup';
    var email = $(this).find('input').val();
    if (email) {
      signupUrl = signupUrl + '?email=' + encodeURIComponent(email);
    }
    window.location = signupUrl;
  });

  // support for closing tooltip on touch devices when clicking back on question mark
  mq('(max-width: 992px)', function (match) {
    $('.pricing').on('touchstart', '.pricing__feature-help', function(e) {
      e.stopImmediatePropagation();

      var $this = $(this);

      $this.parent().siblings().find('.pricing__feature-help').removeClass('is-tooltip-visible');

      if (!$this.hasClass('is-tooltip-visible')) {
        $this.addClass('is-tooltip-visible');
      } else {
        $this.removeClass('is-tooltip-visible');
      }
    });

    $('.pricing').on('touchstart', function() {
      $('.pricing__feature-help').removeClass('is-tooltip-visible');
    })
  });

  function mq(query, callback, usePolyfill) {
    var host = {};
    var isMatchMediaSupported = !!(window && window.matchMedia) && !usePolyfill;

    if (isMatchMediaSupported) {
      var res = window.matchMedia(query);

      callback.apply(host, [res.matches, res.media]);

      res.addListener(function (changed) {
        callback.apply(host, [changed.matches, changed.media]);
      });
    }
  }
});
