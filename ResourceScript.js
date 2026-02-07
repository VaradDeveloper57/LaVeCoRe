const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const groups = document.querySelectorAll(".group");

function applyFilters() {
  const query = searchInput.value.toLowerCase();
  const selectedFilter = filterSelect.value; 

  groups.forEach(group => {
    const categoryList = group.dataset.category.toLowerCase().split(" ");

    const items = group.querySelectorAll("li");
    let matchFound = false;

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      const matchesSearch = text.includes(query);
      const matchesFilter =
        selectedFilter === "all" || categoryList.includes(selectedFilter);

      const shouldShow = matchesSearch && matchesFilter;
      item.style.display = shouldShow ? "" : "none";

      if (shouldShow) matchFound = true;
    });

    group.style.display = matchFound ? "" : "none";
  });
}

searchInput.addEventListener("input", applyFilters);
filterSelect.addEventListener("change", applyFilters);

const slides = document.querySelector('.slides');
  const slideCount = document.querySelectorAll('.slide').length;
  let currentIndex = 0;
  let interval;

  function updateSlidePosition() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlidePosition();
  }

  function startSlideshow() {
    interval = setInterval(nextSlide, 4000);
  }

  function stopSlideshow() {
    clearInterval(interval);
  }

  slides.parentElement.addEventListener('mouseenter', stopSlideshow);
  slides.parentElement.addEventListener('mouseleave', startSlideshow);

  startSlideshow();

document.addEventListener("DOMContentLoaded", () => {

  const elements = Array.from(
    document.querySelectorAll("section, article, div, img, h1, h2, h3, p, li")
  ).filter(el => {
    const parent = el.parentElement;
    if (!parent) return true;

    const style = getComputedStyle(parent);
    return !(style.display === "flex" && style.overflow === "hidden");
  });

  elements.forEach(el => el.classList.add("fade"));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  }, {
    threshold: 0.2
  });

  elements.forEach(el => observer.observe(el));

});