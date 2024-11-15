export const createCarousel = (carouselContainer) => {
  const carouselSlides = [
    ...(carouselContainer.querySelectorAll(".carousel-slide") || []),
  ];
  const previousBtn = carouselContainer.querySelector(".previous-btn");
  const nextBtn = carouselContainer.querySelector(".next-btn");
  const navDots = carouselContainer.querySelector(".navigation-dots") || null;

  const startCarousel = () => {
    if (carouselSlides.length <= 0) return;
    toggleVisible(carouselSlides[0], carouselSlides);
    nextBtn.addEventListener("click", nextSlide);
    previousBtn.addEventListener("click", previousSlide);
    setInterval(nextSlide, 5000);
    if (navDots) {
      addNavigationDots();
      updateDot();
      nextBtn.addEventListener("click", updateDot);
      previousBtn.addEventListener("click", updateDot);
      navDots.addEventListener("click", changeSlide);
    }
  };

  const toggleVisible = (activeElem, elemArr) => {
    elemArr.forEach((elem) => {
      elem !== activeElem
        ? elem.classList.remove("active")
        : elem.classList.add("active");
    });
  };

  const currentSlide = () =>
    carouselSlides.find((slide) => slide.classList.contains("active"));

  const currentSlideIndex = () => carouselSlides.indexOf(currentSlide());

  const nextSlide = () => {
    const currentIndex = currentSlideIndex();
    carouselSlides[currentIndex + 1]
      ? toggleVisible(carouselSlides[currentIndex + 1], carouselSlides)
      : toggleVisible(carouselSlides[0], carouselSlides);
    updateDot();
  };

  const previousSlide = () => {
    const currentIndex = currentSlideIndex();
    carouselSlides[currentIndex - 1]
      ? toggleVisible(carouselSlides[currentIndex - 1], carouselSlides)
      : toggleVisible(
          carouselSlides[carouselSlides.length - 1],
          carouselSlides,
        );
    updateDot();
  };

  const addNavigationDots = () => {
    carouselSlides.forEach((slide, index) => {
      const navigationDot = document.createElement("div");
      navigationDot.setAttribute("class", "navigation-dot");
      navigationDot.setAttribute("id", index);
      navDots.append(navigationDot);
    });
  };

  const updateDot = () => {
    const dots = [
      ...(carouselContainer.querySelectorAll(".navigation-dot") || []),
    ];
    const activeDot = dots[currentSlideIndex()];
    toggleVisible(activeDot, dots);
  };

  const changeSlide = (e) => {
    if (e.target.classList.contains("navigation-dot")) {
      const index = e.target.getAttribute("id");
      const slide = carouselSlides[index];
      if (slide) {
        toggleVisible(carouselSlides[index], carouselSlides);
        updateDot();
      }
    }
  };

  startCarousel();
};
