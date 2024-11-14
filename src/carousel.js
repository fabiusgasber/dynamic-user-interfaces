export const createCarousel = (carouselContainer) => {
  const carouselSlides = [
    ...(carouselContainer.querySelectorAll(".carousel-slide") || []),
  ];
  const previousBtn = carouselContainer.querySelector(".previous-btn");
  const nextBtn = carouselContainer.querySelector(".next-btn");

  const startCarousel = () => {
    if (carouselSlides.length <= 0) return;
    toggleVisible(carouselSlides[0]);
    nextBtn.addEventListener("click", nextSlide);
    previousBtn.addEventListener("click", previousSlide);
  };

  const toggleVisible = (slide) => {
    carouselSlides.forEach((slideElem) => {
      slideElem !== slide
        ? slideElem.classList.remove("active")
        : slide.classList.add("active");
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

  startCarousel();
};
