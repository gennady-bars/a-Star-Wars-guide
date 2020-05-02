$(function () {
  let includes = $("[data-include]");
  //document.querySelector("[data-include]").innerText;
  jQuery.each(includes, function () {
    let file = "../components/" + $(this).data("include") + ".html";

    $(this).load(file);
  });
});

let theme = {
  themeType: "indigo-theme",
  secondaryColor: "#4ebdd4",
  update: function () {
    document.getElementById("edit").style.backgroundColor = this.secondaryColor;
    $(
      ".content-wrapper"
    )[0].classList.value = `content-wrapper ${this.themeType}`;
    document.getElementById(
      "nav"
    ).classList.value = `nav-wrapper navbar-fixed ${this.themeType}`;
    $(".menu-btn")[0].childNodes.forEach((el) => {
      if (el.nodeType !== 3) {
        el.style.backgroundColor = this.secondaryColor;
      }
    });
    localStorage.setItem("secondaryColor", this.secondaryColor);
    localStorage.setItem("themeType", this.themeType);
  },
  coolUpdate: function () {
    let secondaryColor =
      localStorage.getItem("secondaryColor") || this.secondaryColor;
    let themeType = localStorage.getItem("themeType") || this.themeType;

    if (document.getElementById("edit") !== null) {
      document.getElementById("edit").style.backgroundColor = secondaryColor;
    }
    $(".content-wrapper")[0].classList.value = `content-wrapper ${themeType}`;
    document.getElementById(
      "nav"
    ).classList.value = `nav-wrapper navbar-fixed ${themeType}`;

    $(".menu-btn")[0].childNodes.forEach((el) => {
      if (el.nodeType !== 3) {
        el.style.backgroundColor = secondaryColor;
      }
    });
  },
};
theme.coolUpdate();

window.addEventListener("storage", function (event) {
  theme.coolUpdate();
});

let people = [];
let cupPeople = [];
let nextPeoplePage = "";
let prevPeoplePage = "";

function Personage(pers) {
  let pic =
    pers.name === "Luke Skywalker"
      ? `<img src="../pics/Luke.gif">`
      : pers.name === "C-3PO"
      ? `<img src="../pics/C-3PO.gif">`
      : pers.name === "R2-D2"
      ? `<img src="../pics/R2-D2.gif">`
      : "";
  return `<div class="personage-item_container" id="pers_${pers.i}" style="flex: 1;transform: translateY(70%)">
        <h5 style="margin: 0 auto">${pers.name}</h5>
        <p>Родился ${pers.birth_year}</p>
        ${pic}
    </div>`;
}

function drawPersonages(startIndex = 0, endIndex = 3) {
  cupPeople = people.slice(startIndex, endIndex);

  let HTMLPeople = cupPeople.map((el) => Personage(el));

  $(".personages_container")[0].innerHTML = HTMLPeople.join("");

  $(".personage-item_container").on("click", function () {

    if (
      this.style.transform === "translate(0%, 10%) matrix(1, 0, 0, 1, 0, 0)"
    ) {
      TweenMax.to(this, 0.6, { y: "70%", ease: Power4.easeOut });
    } else {
      TweenMax.to(this, 0.6, { y: "10%", ease: Back.easeOut });
    }
  });
}

window.onload = async function () {
  let res = await fetch("https://swapi.dev/api/people/")
    .then((res) => res.json())
    .catch((e) => console.log(e));

  people = res.results.map((el, i) => {
    el.i = i;
    return el;
  });

  nextPeoplePage = res.next;
  prevPeoplePage = res.previous;

  drawPersonages();
};

let load = async function loadNewPeoplePage(url) {
  let { next, previous, results } = await fetch(url).then((res) => res.json());

  nextPeoplePage = next;
  prevPeoplePage = previous;

  people = results.map((el, i) => {
    el.i = i;
    return el;
  });

  drawPersonages();
};

document.getElementById("next").addEventListener("click", () => {
  let lastInCurrentCup = cupPeople[cupPeople.length - 1].i;

  if (lastInCurrentCup !== people.length - 1) {
    drawPersonages(lastInCurrentCup + 1, lastInCurrentCup + 4);
  } else {
    if (nextPeoplePage !== null) {
      load(nextPeoplePage);
    }
  }
});

document.getElementById("prev").addEventListener("click", () => {
  let firstInCurrentCup = cupPeople[0].i;

  if (firstInCurrentCup !== 0) {
    drawPersonages(firstInCurrentCup - 3, firstInCurrentCup);
  } else {
    if (prevPeoplePage !== null) {
      load(prevPeoplePage);
    }
  }
});
