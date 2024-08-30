// *Var*
let slideList = document.querySelectorAll(".slide");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let slider = document.querySelector(".slider");
let dot = document.querySelectorAll(".dot");

let ArraySlide = Array.from(slideList);

let dotLenth = 0;
let autoSlider = true;
let timerSlider = setInterval(nextBtnFunc, 3000);
let startX,
  isDragging = false;
// *Functions*
function stopAutoSlider() {
  clearInterval(timerSlider);
  autoSlider = false;
}

function startAutoSlider() {
  if (!autoSlider) {
    timerSlider = setInterval(nextBtnFunc, 3000);
    autoSlider = true;
  }
}

function hoverSlider() {
  slider.addEventListener("mouseover", () => {
    stopAutoSlider();
    console.log("Mouse in slider");
  });

  slider.addEventListener("mouseout", () => {
    startAutoSlider();
    console.log("Mouse out slider");
  });

  prevBtn.addEventListener("mouseover", stopAutoSlider);
  prevBtn.addEventListener("mouseout", startAutoSlider);
  nextBtn.addEventListener("mouseover", stopAutoSlider);
  nextBtn.addEventListener("mouseout", startAutoSlider);
}
hoverSlider();

function activeDot() {
  dot.forEach((element) => {
    element.addEventListener("click", () => {
      dot.forEach((ele) => {
        if (ele.classList.contains("active")) {
          ele.classList.remove("active");
        }
      });
      dotLenth = parseInt(element.getAttribute("data-num"), 10);
      element.classList.add("active");
      pagination();
    });
  });
}

function pagination() {
  removeClassFromElement();
  const totalSlides = ArraySlide.length;
  const activeIndex = dotLenth - 1;
  const comingIndex = (dotLenth - 2 + totalSlides) % totalSlides;
  const pastIndex = dotLenth % totalSlides;

  ArraySlide[activeIndex].classList.add("active");
  ArraySlide[comingIndex].classList.add("coming");
  ArraySlide[pastIndex].classList.add("past");
}

function addClassToElement() {
  removeClassFromElement();
  ArraySlide[ArraySlide.length - 1].classList.add("active");
  ArraySlide[ArraySlide.length - 2].classList.add("coming");
  ArraySlide[0].classList.add("past");
}

function removeClassFromElement() {
  ArraySlide.forEach((element) => {
    element.classList.remove("active", "coming", "past");
  });
}

addClassToElement();

function nextBtnFunc() {
  removeClassFromElement();
  let lastIndex = ArraySlide.shift();
  ArraySlide.push(lastIndex);
  addClassToElement();
}

function PrevBtnFunc() {
  removeClassFromElement();
  let firtIndex = ArraySlide.pop();
  ArraySlide.unshift(firtIndex);
  addClassToElement();
}

// *Event*
nextBtn.addEventListener("click", nextBtnFunc);
prevBtn.addEventListener("click", PrevBtnFunc);
activeDot();

// *Drag Functionality*
function handleDragStart(event) {
  startX = event.clientX || event.touches[0].clientX;
  isDragging = true;
}

function handleDragMove(event) {
  if (!isDragging) return;

  let x = event.clientX || event.touches[0].clientX;
  let diffX = startX - x;

  if (Math.abs(diffX) > 50) {
    // Adjust threshold as needed
    if (diffX > 0) {
      nextBtnFunc();
    } else {
      PrevBtnFunc();
    }
    isDragging = false;
  }
}

function handleDragEnd() {
  isDragging = false;
}

slider.addEventListener("mousedown", handleDragStart);
slider.addEventListener("mousemove", handleDragMove);
slider.addEventListener("mouseup", handleDragEnd);

slider.addEventListener("touchstart", handleDragStart);
slider.addEventListener("touchmove", handleDragMove);
slider.addEventListener("touchend", handleDragEnd);
