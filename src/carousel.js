export const createCarousel = (carouselContainer) => {
  const carouselSlides = [
    ...carouselContainer.querySelectorAll(".carousel-slide"),
  ];
  const dotContainer = carouselContainer.querySelector(".navigation-dots");
  const navigationDot = createNavigationDots();

  const init = () => {
    domLoader.toggleVisible(0, carouselSlides);
    attachEventListeners();
    navigationDot.populateDots(carouselSlides);
    domLoader.appendArray(navigationDot.getDotsArr(), dotContainer);
    domLoader.toggleVisible(0, navigationDot.getDotsArr());
  };

  const attachEventListeners = () => {
    carouselContainer.addEventListener("click", nextSlide);
  };

  const nextSlide = (e) => {
    const direction = parseInt(e.target.getAttribute("data-index"));
    const currentIndex = domLoader.getCurrentIndex(carouselSlides);
    if (direction === 1) {
      if (carouselSlides[currentIndex + 1]) {
        domLoader.toggleVisible(currentIndex + 1, carouselSlides);
        domLoader.toggleVisible(currentIndex + 1, navigationDot.getDotsArr());
      } else {
        domLoader.toggleVisible(0, carouselSlides);
        domLoader.toggleVisible(0, navigationDot.getDotsArr());
      }
    } else if (direction === -1) {
      if (carouselSlides[currentIndex - 1]) {
        domLoader.toggleVisible(currentIndex - 1, carouselSlides);
        domLoader.toggleVisible(currentIndex - 1, navigationDot.getDotsArr());
      } else {
        domLoader.toggleVisible(carouselSlides.length - 1, carouselSlides);
        domLoader.toggleVisible(
          carouselSlides.length - 1,
          navigationDot.getDotsArr(),
        );
      }
    } else if (e.target.classList.contains("navigation-dot")) {
      domLoader.toggleVisible(direction, carouselSlides);
      domLoader.toggleVisible(direction, navigationDot.getDotsArr());
    }
  };

  init();
};

const createNavigationDots = () => {
  const dots = [];

  const getDotsArr = () => dots;

  const populateDots = (array) => {
    if (!array) return;
    array.forEach((_, index) => {
      const navigationDot = createDot(index);
      dots.push(navigationDot);
    });
  };

  const createDot = (index) => {
    const navigationDot = document.createElement("div");
    navigationDot.setAttribute("class", "navigation-dot");
    navigationDot.setAttribute("data-index", index);
    return navigationDot;
  };

  return { getDotsArr, populateDots };
};

const domLoader = (() => {
  const toggleVisible = (activeElemIndex, elemArr) => {
    elemArr.forEach((elem) => elem.classList.remove("active"));
    elemArr[activeElemIndex].classList.add("active");
  };

  const append = (child, parent) => parent.append(child);

  const appendArray = (array, parent) => {
    if(Array.isArray(array) && parent instanceof HTMLElement){
      array.forEach(elem => append(elem, parent));
    }
  }

  const getCurrent = (arr) =>
    arr.find((elem) => elem.classList.contains("active"));

  const getCurrentIndex = (arr) => arr.indexOf(getCurrent(arr));

  return { toggleVisible, getCurrentIndex, appendArray };
})();
