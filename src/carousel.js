export const createCarousel = (carouselContainer) => {
  const carouselSlides = [
    ...carouselContainer.querySelectorAll(".carousel-slide"),
  ];
  const previousBtn = carouselContainer.querySelector(".previous-btn");
  const nextBtn = carouselContainer.querySelector(".next-btn");

  const navigationDot = createNavigationDots(carouselContainer);

  const init = () => {
    domLoader.toggleVisible(0, carouselSlides);
    attachEventListeners();
    navigationDot.populateDots(carouselSlides);
    domLoader.toggleVisible(0, navigationDot.getDotsArr());
  };

  const attachEventListeners = () => {
    nextBtn.addEventListener("click", nextSlide);
    previousBtn.addEventListener("click", previousSlide);
    navigationDot.getDotsContainer().addEventListener("click", updateSlide);
  };

  const updateSlide = (e) => {
    if (e.target.classList.contains("navigation-dot")) {
      const index = e.target.getAttribute("id");
      domLoader.toggleVisible(index, carouselSlides);
      domLoader.toggleVisible(index, navigationDot.getDotsArr());
    }
  };

  const nextSlide = () => {
    const currentIndex = domLoader.getCurrentIndex(carouselSlides);
    if (carouselSlides[currentIndex + 1]) {
      domLoader.toggleVisible(currentIndex + 1, carouselSlides);
      domLoader.toggleVisible(currentIndex + 1, navigationDot.getDotsArr());
    } else {
      domLoader.toggleVisible(0, carouselSlides);
      domLoader.toggleVisible(0, navigationDot.getDotsArr());
    }
  };

  const previousSlide = () => {
    const currentIndex = domLoader.getCurrentIndex(carouselSlides);
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
  };

  init();
};

const createNavigationDots = (carouselContainer) => {
  const navDots = carouselContainer.querySelector(".navigation-dots");
  const dots = [];

  const getDotsArr = () => dots;
  const getDotsContainer = () => navDots;

  const populateDots = (carouselSlides) => {
    if (!navDots || !carouselSlides) return;
    carouselSlides.forEach((_, index) => {
      const navigationDot = createDot(index);
      navDots.append(navigationDot);
      dots.push(navigationDot);
    });
  };

  const createDot = (index) => {
    const navigationDot = document.createElement("div");
    navigationDot.setAttribute("class", "navigation-dot");
    navigationDot.setAttribute("id", index);
    return navigationDot;
  };

  return { getDotsArr, populateDots, getDotsContainer };
};

const domLoader = (() => {
  const toggleVisible = (activeElemIndex, elemArr) => {
    elemArr.forEach((elem) => elem.classList.remove("active"));
    elemArr[activeElemIndex].classList.add("active");
  };

  const getCurrent = (arr) =>
    arr.find((elem) => elem.classList.contains("active"));

  const getCurrentIndex = (arr) => arr.indexOf(getCurrent(arr));

  return { toggleVisible, getCurrentIndex };
})();
