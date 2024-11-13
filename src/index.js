import { toggleDropdown } from "./dropdown";
import "./styles.css";

const dropdowns = document.querySelectorAll(".dropdown-trigger");
dropdowns.forEach((elem) => elem.addEventListener("click", toggleDropdown));
