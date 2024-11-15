export const createCarousel = (carouselContainer) => {
  const carouselSlides = [
    ...(carouselContainer.querySelectorAll(".carousel-slide") || []),
  ];
  const previousBtn = carouselContainer.querySelector(".previous-btn");
  const nextBtn = carouselContainer.querySelector(".next-btn");
  const navDots = carouselContainer.querySelector(".navigation-dots") || null;

  const startCarousel = () => {
    if (carouselSlides.length <= 0) return;
    toggleVisible(carouselSlides[0]);
    nextBtn.addEventListener("click", nextSlide);
    previousBtn.addEventListener("click", previousSlide);
    if (navDots) {
      addNavigationDots();
      updateDot();
      nextBtn.addEventListener("click", updateDot);
      previousBtn.addEventListener("click", updateDot);
      navDots.addEventListener("click", changeSlide);
    }
  };

  const toggleVisible = (slide) => {
    carouselSlides.forEach((slideElem) => {
      slideElem !== slide
        ? slideElem.classList.remove("active")
        : slide.classList.add("active");
    });
  };

  const toggleDotVisible = (activeDot, dots) => {
    dots.forEach((dot) => {
      dot !== activeDot
        ? dot.classList.remove("active")
        : dot.classList.add("active");
    });
  };

  const currentSlide = () =>
    carouselSlides.find((slide) => slide.classList.contains("active"));

  const currentSlideIndex = () => carouselSlides.indexOf(currentSlide());

  const nextSlide = () => {
    const currentIndex = currentSlideIndex();
    carouselSlides[currentIndex + 1]
      ? toggleVisible(carouselSlides[currentIndex + 1])
      : toggleVisible(carouselSlides[0]);
  };

  const previousSlide = () => {
    const currentIndex = currentSlideIndex();
    carouselSlides[currentIndex - 1]
      ? toggleVisible(carouselSlides[currentIndex - 1])
      : toggleVisible(carouselSlides[carouselSlides.length - 1]);
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
    toggleDotVisible(activeDot, dots);
  };

  const changeSlide = (e) => {
    if (e.target.classList.contains("navigation-dot")) {
      const index = e.target.getAttribute("id");
      const slide = carouselSlides[index];
      if (slide) {
        toggleVisible(carouselSlides[index]);
        updateDot();
      }
    }
  };

  startCarousel();
};
