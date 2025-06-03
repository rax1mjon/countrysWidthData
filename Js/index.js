let cardList = document.querySelector(".search--menu");
let PaginationMenu = document.querySelector(".search--pagination ul");
function getCard(i, { flags, name, population, region, capital }, cardList) {
  let template = document.createElement("template");
  template.innerHTML = `    
  <li class="card" onclick="cardLocation('${population}')">
    <div class="card--img"><img src="${flags.png}" alt="${flags.alt}"></div>
    <div class="card--body">
      <h3>${name.common}</h3>
      <div>
        <p><span>Population:</span> ${population}</p>
        <p><span>Region:</span> ${region}</p>
        <p><span>Capital:</span>${capital}</p>
      </div>
    </div>
  </li>`;

  let card = template.content.firstElementChild;
  cardList.append(card);
}

const getData = async (url, cardList) => {
  loading.classList.remove("loadingNone");
  try {
    let fetchData = await fetch(url);

    if (!fetchData.ok) {
      throw new Error(`HTTP error! => "${data.status}"`);
    }

    let data = await fetchData.json();

    pagination(data.total);

    data = data.data;

    cardList.innerHTML = "";
    data.forEach((country, i) => {
      getCard(i, country, cardList);
    });
  } catch (error) {
    console.log(error);
  } finally {
    loading.classList.add("loadingNone");
  }
};

let activePage = 1;

getData(
  `https://ap-countries-api.vercel.app/all?page=${activePage}&limit=8`,
  cardList
);

function pagination(count) {
  PaginationMenu.innerHTML = "";
  let page = count ? Math.round(count / 8) : activePage;
  let template = document.createElement("template");

  for (let i = 1; i <= page; i++) {
    template.innerHTML = `<li class="${
      activePage === i ? "active" : ""
    }" onclick="clickPage(${i})">${i}</li>`;

    let card = template.content.firstElementChild;

    PaginationMenu.appendChild(card);
  }
}

function clickPage(id) {
  activePage = +id;
  pagination(undefined);
  getData(
    `https://ap-countries-api.vercel.app/all?page=${activePage}&limit=8`,
    cardList
  );
}

function backNextPagination(value) {
  value == "back" ? activePage != 1 && --activePage : ++activePage;
  pagination(undefined);
  getData(
    `https://ap-countries-api.vercel.app/all?page=${activePage}&limit=8`,
    cardList
  );
}

async function searchFunction() {
  let searchInput = document.querySelector("[type='search']");

  let allCountries = await allData();

  searchInput.addEventListener("keyup", function (event) {
    let searchText = event.target.value.toLocaleLowerCase().trim();

    let newSearchData = allCountries.filter((country) =>
      country.name.common.toLocaleLowerCase().trim().includes(searchText)
    );

    cardList.innerHTML = "";
    newSearchData.length
      ? newSearchData.forEach((country, i) => getCard(i, country, cardList))
      : (cardList.innerHTML = "<p>Country not found</p>");

    PaginationMenu.innerHTML = "__________________________________";
  });

  let searchSelect = document.querySelector(".search--form select");

  searchSelect.addEventListener("change", (event) => {
    let searchText = event.target.value.toLocaleLowerCase().trim();

    let newSearchData = allCountries.filter((country) =>
      country["region"].toLocaleLowerCase().trim().includes(searchText)
    );

    cardList.innerHTML = "";
    newSearchData.length
      ? newSearchData.forEach((country, i) => getCard(i, country, cardList))
      : (cardList.innerHTML = "<p>Country not found</p>");

    PaginationMenu.innerHTML = "________________________________";
  });
}

searchFunction();

function cardLocation(index) {
  location.href = `./about.html?index=${index}`;
}
