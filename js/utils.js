$(document).ready(function () {
  const $window = $(window);
  const $header = $('#header');
  const $sectionBiz = $('.content_business');
  const $contentSub = $('.content-sub');

  function checkHeaderOverlap() {
    const scrollTop = $window.scrollTop();
    const headerHeight = $header.outerHeight();

    let isPastTopVisual = false;
    let isOverlappingBiz = false;

    if ($contentSub.length > 0) {
      const visualTop = $contentSub.offset().top;
      isPastTopVisual = scrollTop >= visualTop;
    }

    if ($sectionBiz.length > 0) {
      const sectionBizTop = $sectionBiz.offset().top;
      const sectionBizBottom = sectionBizTop + $sectionBiz.outerHeight();

      const headerTop = scrollTop;
      const headerBottom = scrollTop + headerHeight;

      isOverlappingBiz = headerBottom > sectionBizTop && headerTop < sectionBizBottom;
    }

    if (isPastTopVisual || isOverlappingBiz) {
      $header.addClass('is-active');
    } else {
      $header.removeClass('is-active');
    }
  }

  // Sub menu active
  $('.gnav-sub_list > li').click(function () {
    const $subMenu = $(this);
    const isActive = $subMenu.hasClass('is-active');

    if (!isActive) {
      $subMenu.addClass('is-active');
      $subMenu.siblings().removeClass('is-active');
    } 
  });

  // Hamburger menu
  $('.btn_hamburger').click(function () {
    const $menu = $('#drawer');
    const $dim = $('#dimmed');

    const isActive = $menu.hasClass('is-active');

    if (!isActive) {
      $menu.removeClass('is-out').addClass('is-active');
      $dim.fadeIn(200);
    }
  });

  $('#dimmed, #drawer .btn_close').click(function () {
    $('#drawer').removeClass('is-active').addClass('is-out');
    $('#dimmed').fadeOut(200);

    setTimeout(() => {
      $('#drawer').removeClass('is-out');
    }, 200);
  });

  checkHeaderOverlap();
  $window.on('scroll resize', checkHeaderOverlap);
});