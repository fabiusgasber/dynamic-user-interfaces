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
  };

  const attachEventListeners = () => {
    nextBtn.addEventListener("click", nextSlide);
    previousBtn.addEventListener("click", previousSlide);
  };

  const nextSlide = () => {
    const currentIndex = domLoader.getCurrentIndex(carouselSlides);
    if (carouselSlides[currentIndex + 1]){
      domLoader.toggleVisible(currentIndex + 1, carouselSlides);
      domLoader.toggleVisible(currentIndex + 1, navigationDot.getDotsArr());
    }
    else {
      domLoader.toggleVisible(0, carouselSlides);
      domLoader.toggleVisible(0, navigationDot.getDotsArr());
    }
  };

  const previousSlide = () => {
    const currentIndex = domLoader.getCurrentIndex(carouselSlides);
    if(carouselSlides[currentIndex - 1]){
      domLoader.toggleVisible(currentIndex - 1, carouselSlides)
      domLoader.toggleVisible(currentIndex - 1, navigationDot.getDotsArr());
    }
    else {
      domLoader.toggleVisible(carouselSlides.length - 1, carouselSlides);
      domLoader.toggleVisible(carouselSlides.length - 1, navigationDot.getDotsArr());
    }
  };

  init();
};

const createNavigationDots = (carouselContainer) => {
  const navDots = carouselContainer.querySelector(".navigation-dots");
  const dots = [];

  const getDot = (index) => (dots[index] ? dots[index] : null);
  const getDotsArr = () => dots;

  const populateDots = (carouselSlides) => {
    if (!navDots) return;
    carouselSlides.forEach((_, index) => {
      const navigationDot = document.createElement("div");
      navigationDot.setAttribute("class", "navigation-dot");
      navigationDot.setAttribute("id", index);
      navDots.append(navigationDot);
      dots.push(navigationDot);
    });
    domLoader.toggleVisible(0, dots);
  };

  return { getDot, getDotsArr, populateDots };
};

const domLoader = (() => {
  const toggleVisible = (activeElemIndex, elemArr) => {
    elemArr.forEach((elem) => elem.classList.remove("active"));
    elemArr[activeElemIndex].classList.add("active");
  };

  const getCurrent = (arr) => arr.find((elem) => elem.classList.contains("active"));

  const getCurrentIndex = (arr) => arr.indexOf(getCurrent(arr));


  return { toggleVisible, getCurrentIndex };
})();
