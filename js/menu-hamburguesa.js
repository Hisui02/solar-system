function toggleMenu() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("active");
  document.querySelector("nav div").addEventListener("click", function () {
    document.querySelector("nav").classList.remove("active");
  });
}
