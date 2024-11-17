const menu = document.getElementById("nav-menu");
const menu_icon = document.getElementById("menu-icon");
const close_icon = document.getElementById("close-menu_icon");

let ToggleMenu = () => {
  menu.style.top = "80px";
  menu_icon.style.display = "none";
  close_icon.style.display = "block";
};
let closeMenu = () => {
  menu.style.top = "-100vh";
  menu_icon.style.display = "block";
  close_icon.style.display = "none";
};

menu_icon.addEventListener("click", ToggleMenu);
close_icon.addEventListener("click", closeMenu);
