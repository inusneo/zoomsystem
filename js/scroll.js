$(document).ready(function () {
  const $window = $(window);
  const $header = $('#header');
  const $sectionBiz = $('.content_buisness');

  function checkHeaderOverlap() {
    const scrollTop = $window.scrollTop();
    const headerHeight = $header.outerHeight();

    const sectionBizTop = $sectionBiz.offset().top;
    const sectionBizBottom = sectionBizTop + $sectionBiz.outerHeight();

    const headerBottom = scrollTop + headerHeight;
    const headerTop = scrollTop;

    const isOverlapping = headerBottom > sectionBizTop && headerTop < sectionBizBottom;

    if (isOverlapping) {
      $header.addClass('is-active');
    } else {
      $header.removeClass('is-active');
    }
  }

  // 초기 실행 + 이벤트 등록
  checkHeaderOverlap();
  $window.on('scroll resize', checkHeaderOverlap);
});