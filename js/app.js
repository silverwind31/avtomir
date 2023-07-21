(function () {
  'use strict';

  // * ==========================================

  /**
   * * Splide Slider
   *
   * https://splidejs.com/
   */

  document.addEventListener("DOMContentLoaded", function () {
    const catalogTabs = document.querySelectorAll(".catalog__tabs-button");
    let catalogItems = [];
    if (document.querySelector("#catalog-carousel")) {
      var catalogSlider = new Splide("#catalog-carousel", {
        reducedMotion: {
          speed: 400
        },
        gap: "28px",
        autoHeight: false,
        breakpoints: {
          1200: {
            grid: {
              dimensions: [[3, 3]]
            }
          },
          992: {
            grid: {
              dimensions: [[3, 3]]
            }
          },
          768: {
            grid: {
              dimensions: [[3, 2]]
            }
          }
        },
        grid: {
          dimensions: [[2, 1]],
          gap: {
            row: "28px",
            col: "28px"
          }
        },
        mediaQuery: "min"
      });
      catalogSlider.mount({
        Grid
      });
      if (document.querySelectorAll(".catalog__item").length > 0) {
        catalogItems = [...document.querySelectorAll(".catalog__item")];
      }
      let updateHeight = newIndex => {
        let slide = catalogSlider.Components.Slides.getAt(typeof newIndex == "number" ? newIndex : catalogSlider.index).slide;
        slide.parentElement.parentElement.style.height = slide.offsetHeight + "px";
      };
      catalogSlider.on("move resize", updateHeight);
      updateHeight();
    }
    if (catalogTabs) {
      catalogTabs.forEach(item => {
        item.addEventListener("click", e => {
          e.preventDefault();
          if (!e.currentTarget.classList.contains("active")) {
            document.querySelector(".catalog__tabs-button.active").classList.remove("active");
            e.currentTarget.classList.add("active");
            const category = e.currentTarget.getAttribute("data-category");
            const newItems = catalogItems.filter((value, index) => {
              if (category == "all") {
                return value.getAttribute("data-category") == value.getAttribute("data-category");
              } else {
                return value.getAttribute("data-category") == category;
              }
            });
            catalogSlider.destroy(true);
            document.querySelector(".catalog__list").innerHTML = "";
            newItems.forEach(slide => {
              catalogSlider.add(slide);
            });
            catalogSlider.mount();
            catalogSlider.refresh();
          }
        });
      });
    }
    if (document.querySelector("#main-carousel") && document.querySelector("#thumbnail-carousel")) {
      var main = new Splide("#main-carousel", {
        perPage: 1,
        rewind: true,
        type: "loop",
        gap: 10,
        pagination: false,
        reduceMotion: {
          speed: 400
        }
      });
      var thumbnails = new Splide("#thumbnail-carousel", {
        perPage: 4,
        gap: 10,
        rewind: true,
        pagination: false,
        arrows: false,
        isNavigation: true
      });
      main.sync(thumbnails);
      main.mount();
      thumbnails.mount();
    }
  });

  // * ==========================================

  /**
   * * Modals
   */

  const modals = {
    modalSelector: "[data-modal]",
    options: {
      onShow: modal => {},
      onClose: modal => {},
      openTrigger: "data-modal-open",
      closeTrigger: "data-modal-close",
      openClass: "is-open",
      disableScroll: true,
      disableFocus: false,
      awaitOpenAnimation: false,
      awaitCloseAnimation: false,
      debugMode: false
    },
    init() {
      MicroModal.init(this.options);
    },
    open(modalId) {
      MicroModal.show(modalId, this.options);
    },
    close(modalId) {
      MicroModal.close(modalId);
    },
    closeActive() {
      var _document$querySelect;
      const modalId = (_document$querySelect = document.querySelector(`${this.modalSelector}.${this.options.openClass}`)) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getAttribute("id");
      if (modalId) {
        MicroModal.close(modalId);
      }
    }
  };
  modals.init();
  window.modals = modals;

  // * ==========================================

  /**
   * * Меню бургер
   */

  new CgBurger({
    burgerSelector: "[data-burger]",
    targetSelector: "[data-burger-target]",
    activeClass: "active",
    hasCloseButton: true,
    closeButtonSelector: "[data-burger-close]",
    lockBody: true
  });

  // * ==========================================

  /**
   * * Tabs
   *
   * https://github.com/cferdinandi/tabby
   */

  if (document.querySelector("[data-tabs")) {
    new tabbyMin("[data-tabs]");
  }

  // * ==========================================

  /**
   * * Accordions
   *
   * https://github.com/michu2k/Accordion
   */

  const accordions = Array.from(document.querySelectorAll(".accordion-container"));
  new Accordion(accordions, {});

  // * ==========================================

  /**
   * * LazyLoad
   *
   * https://github.com/verlok/vanilla-lazyload
   */
  new LazyLoad({});

  // * ==========================================

  /**
   * * Inputmask
   *
   * https://robinherbots.github.io/Inputmask/
   */
  var maskElements = document.querySelectorAll("[data-inputmask]");
  if (maskElements.length > 0) {
    maskElements.forEach(item => {
      var im = new Inputmask({
        clearIncomplete: true
      });
      im.mask(item);
    });
  }

  // * ==========================================

  /**
   * * Header
   */

  const header = document.querySelector(".header");
  if (header) {
    document.body.style.paddingTop = `${header.offsetHeight}px`;
    document.body.style.setProperty("--header-height", `${header.offsetHeight}px`);
    window.addEventListener("resize", () => {
      document.body.style.paddingTop = `${header.offsetHeight}px`;
      document.body.style.setProperty("--header-height", `${header.offsetHeight}px`);
    });
  }

  // * ==========================================

  /**
   * * Anchors
   */

  window.addEventListener("DOMContentLoaded", () => {
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (document.querySelector(".is-active")) {
            document.querySelector(".is-active").classList.remove("is-active");
          }
          const id = entry.target.getAttribute("id");
          const newLink = document.querySelector('[href*="#' + id + '"]');
          if (newLink) {
            newLink.classList.add("is-active");
          }
        }
      });
    };
    const options = {
      threshold: 0.5
    };
    const observer = new IntersectionObserver(observerCallback, options);
    const sections = document.querySelectorAll(".scroll-section");
    sections.forEach(section => observer.observe(section));
  });

  // * ==========================================

  /**
   * * Cookie
   */

  function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  const cookie = document.querySelector(".cookie");
  if (cookie) {
    const cookieBtn = cookie.querySelector(".cookie__button");
    let cookiecook = getCookie("cookiecook");
    if (cookiecook != "no") {
      setTimeout(() => {
        cookie.classList.add("active");
      }, 2000);
      cookieBtn.addEventListener("click", e => {
        cookie.classList.remove("active");
        let date = new Date();
        date.setDate(date.getDate() + 1);
        document.cookie = "cookiecook=no; path=/; expires=" + date.toUTCString();
      });
    }
  }

  // * ==========================================

  /**
   * * Datepicker
   *
   * https://www.npmjs.com/package/js-datepicker
   */
  const inputDates = document.querySelectorAll(".input--date input");
  if (inputDates.length > 0) {
    inputDates.forEach(item => {
      datepicker(item, {
        formatter: (input, date, instance) => {
          const value = date.toLocaleDateString();
          input.value = value;
        },
        customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        customMonths: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        overlayButton: "Выбрать",
        minDate: new Date(),
        overlayPlaceholder: "Год"
      });
    });
  }

  // * ==========================================

  /**
   * * JustValidate
   *
   * https://github.com/horprogs/Just-validate
   */

  const forms = document.querySelectorAll(".form");
  if (forms.length > 0) {
    forms.forEach(form => {
      const validation = new JustValidate(form, {
        validateBeforeSubmitting: true
      });
      const formInputs = form.querySelectorAll("input:not([type='checkbox']):required");
      const formCheckbox = form.querySelectorAll("input[type='checkbox']:required");
      if (formInputs.length > 0) {
        formInputs.forEach(input => {
          validation.addField(input, [{
            rule: "required",
            errorMessage: "* Обязательное поле"
          }], {
            errorFieldCssClass: "error",
            errorLabelCssClass: "error-text"
          });
        });
      }
      if (formCheckbox.length > 0) {
        formCheckbox.forEach(checkbox => {
          const checkboxContainer = checkbox.closest(".checkbox");
          const isGrouped = checkbox.closest(".checkbox-group");
          if (isGrouped) {
            validation.addRequiredGroup(isGrouped, "Вы должны выбрать по крайней мере один вариант", {
              errorFieldCssClass: "error",
              errorLabelCssClass: "error-text",
              errorsContainer: isGrouped
            });
          } else {
            validation.addField(checkbox, [{
              rule: "required",
              errorMessage: "* Обязательное поле"
            }], {
              errorFieldCssClass: "error",
              errorLabelCssClass: "error-text",
              errorsContainer: checkboxContainer
            });
          }
        });
      }
      validation.onSuccess(() => {
        form.submit();
      });
    });
  }

})();
