export const toggleDropdown = (e) => {
  const dropdownChildren = [...(e.target.closest(".dropdown")?.children || [])];
  dropdownChildren
    .filter((elem) => elem.classList.contains("dropdown-content"))
    .forEach((elem) => elem.classList.toggle("show"));
};
