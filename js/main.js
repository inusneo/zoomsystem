document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.gnav_list > li');

  navItems.forEach((item) => {
    const submenu = item.querySelector('.gnav_sublist');
    const link = item.querySelector('a');

    const activate = () => {
      item.classList.add('is-active');
      if (submenu) submenu.classList.add('is-active');
    };

    const deactivate = () => {
      item.classList.remove('is-active');
      if (submenu) {
        submenu.classList.remove('is-active');
      }
    };

    item.addEventListener('mouseenter', activate);
    item.addEventListener('mouseleave', deactivate);
    link.addEventListener('focus', activate);
    link.addEventListener('blur', () => {
      // 메뉴 밖으로 나가는 blur인지 submenu로 들어가는 것인지 판단
      setTimeout(() => {
        if (!item.contains(document.activeElement)) {
          deactivate();
        }
      }, 100);
    });

    if (submenu) {
      // submenu 전체에서 focusout 감지
      submenu.addEventListener('focusout', () => {
        setTimeout(() => {
          if (!item.contains(document.activeElement)) {
            deactivate();
          }
        }, 100);
      });
    }
  });
});

