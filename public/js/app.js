/*==================== typed js ====================*/
const typed = new Typed(".title-fruit", {
  strings: ["Frutas", "フルーツ", "ፍሬ"],
  startDelay: 1000,
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

const mTyped = new Typed(".title-meats", {
  strings: ["Carnes", "肉", "ስጋዎች"],
  startDelay: 1000,
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

const vTyped = new Typed(".title-veggies", {
  strings: ["Verduras", "野菜", "አትክልቶች"],
  startDelay: 1000,
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

/*==================== scroll reveal ====================*/
ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});
