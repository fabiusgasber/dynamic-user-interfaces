import { createCarousel } from "./carousel";
import { toggleDropdown } from "./dropdown";
import "./styles.css";

const dropdowns = document.querySelectorAll(".dropdown-trigger");
dropdowns.forEach((elem) => elem.addEventListener("click", toggleDropdown));

const carouselContainer = document.querySelectorAll(".carousel-container");
carouselContainer.forEach((carousel) => createCarousel(carousel));
