const box = document.querySelector(".box");
const size = document.getElementById("size");
const start = document.getElementById("start");
const animationDelay = document.getElementById("delay");
const selection = document.getElementById("selection");
let arr = [];
document.addEventListener("DOMContentLoaded", () => {
  generateArray(+size.value);
  generateBars();
  size.addEventListener("input", () => generateArray(+size.value));
  start.addEventListener("click", startSorting);
  if (selection.value === "") start.disabled = true;
  selection.addEventListener("input", () => {
    if (selection.value === " ") start.disabled = true;
    else start.disabled = false;
  });
});
const generateArray = (val) => {
  deleteOldNodes();
  let initalValue = 60 + val;
  start.disabled = false;
  for (let i = 0; i < initalValue; i++) {
    arr[i] = Math.floor(Math.random() * 400 + 100);
  }
  generateBars();
};
const deleteOldNodes = () => {
  arr = [];
  box.innerHTML = "";
};
const generateBars = () => {
  let html = arr
    .map((val) => {
      return `
        <div style="height: ${val}px; width: 2px" class="bar "></div>
        `;
    })
    .join("");
  box.innerHTML = html;
};
const bubbleSort = async () => {
  let bar = document.querySelectorAll(".bar");
  start.disabled = true;
  let flag = true;
  while (flag) {
    flag = false;
    for (let i = 0; i < arr.length - 1; i++) {
      bar[i].style.background = "red";
      bar[i + 1].style.background = "red";
      if (arr[i] > arr[i + 1]) {
        await delay(+animationDelay.value);
        swap(bar, i);
        flag = true;
      }
      bar[i].style.background = "white";
      bar[i + 1].style.background = "white";
    }
  }
  start.disabled = false;
};
const insertionSort = async () => {
  let bar = document.querySelectorAll(".bar");
  start.disabled = true;
  for (let i = 1; i < arr.length; i++) {
    let temp = bar[i].style.height;
    let temp1 = arr[i];
    let j = i - 1;
    while (temp1 < arr[j] && j >= 0) {
      bar[j].style.background = "red";
      bar[j + 1].style.background = "red";
      await delay(+animationDelay.value);
      arr[j + 1] = arr[j];
      bar[j + 1].style.height = bar[j].style.height;
      bar[j].style.background = "white";
      bar[j + 1].style.background = "white";
      j--;
    }

    arr[j + 1] = temp1;
    bar[j + 1].style.height = temp;
  }
  start.disabled = false;
};
const selectionSort = async () => {
  let bar = document.querySelectorAll(".bar");
  start.disabled = true;
  for (let i = 0; i < arr.length - 1; i++) {
    let small = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[small]) small = j;
    }
    bar[small].style.background = "red";
    bar[i].style.background = "red";
    await delay(+animationDelay.value);
    let temp1 = bar[small].style.height;
    let temp = arr[small];
    bar[small].style.height = bar[i].style.height;
    bar[i].style.height = temp1;
    arr[small] = arr[i];
    arr[i] = temp;
    bar[small].style.background = "white";
    bar[i].style.background = "white";
  }
  start.disabled = false;
};
const startSorting = () => {
  if (selection.value === "bubble") bubbleSort();
  else if (selection.value === "insertion") insertionSort();
  else if (selection.value === "selection") selectionSort();
};

const swap = (bar, i) => {
  let temp = bar[i].style.height;
  let temp1 = arr[i];
  arr[i] = arr[i + 1];
  arr[i + 1] = temp1;
  bar[i].style.height = bar[i + 1].style.height;
  bar[i + 1].style.height = temp;
};
const delay = (delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, delay);
  });
};
