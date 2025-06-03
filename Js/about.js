let countryList = document.querySelector(".about");

function getCountry(
  {
    flags,
    name,
    population,
    region,
    capital,
    languages,
    subregion,
    tld,
    currencies,
    borders = [],
  },
  countryList
) {
  let bordersCount = borders.length
    ? borders.map((el) => `<li>${el}</li>`).join(" ")
    : "";
  let nativeName = Object.values(name.nativeName || {})[0]?.common || "";
  let currency = Object.values(currencies || {})[0];
  let currencyStr = currency ? `${currency.name} (${currency.symbol})` : "";
  let languageStr = languages ? Object.values(languages).join(", ") : "";
  let tldStr = tld?.join(", ") || "";

  let template = document.createElement("template");
  template.innerHTML = `
  <div class="container about--wrapper">
    <div class="lastPage">
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <g id="call-made">
          <path id="Shape" fill-rule="evenodd" clip-rule="evenodd"
            d="M6.46447 4.10744L7.64298 5.28596L3.75389 9.17504L18.6031 9.17504L18.6031 10.825L3.75389 10.825L7.64298 14.714L6.46447 15.8926L0.57191 10L6.46447 4.10744Z" />
        </g>
      </svg>

      <span>Back</span>
    </div>
    <div class="about--body">
      <div class="about--img">
        <img src="${flags.png}" alt='${flags.alt || "Flag"}'>
      </div>
      <div class="about--body__main">
        <h3>${name.common}</h3>
        <div class="about--body__info">
          <ul>
            <li><span>Native Name: </span>${nativeName}</li>
            <li><span>Population: </span>${population.toLocaleString()}</li>
            <li><span>Region: </span>${region}</li>
            <li><span>Sub Region: </span>${subregion}</li>
            <li><span>Capital: </span>${capital?.join(", ") || "N/A"}</li>
          </ul>

          <ul>
            <li><span>Top Level Domain: </span> ${tldStr}</li>
            <li><span>Currencies: </span>${currencyStr}</li>
            <li><span>Languages: </span>${languageStr}</li>
          </ul>

        </div>
        <div class="about--main__bottom">
          <span>Border Countries:</span>
          <ul>${bordersCount}</ul>
        </div>
      </div>
    </div>
  </div>`;

  let card = template.content.firstElementChild;
  countryList.append(card);

  let lastPageBtn = document.querySelector(".lastPage");

  lastPageBtn.addEventListener("click", () => {
    history.go(-1);
  });
}

async function loadCountryPage() {
  loading.classList.remove("loadingNone");
  try {
    let params = new URLSearchParams(location.search);
    let population = params.get("index");

    let dataAll = await allData();
    let country = dataAll.filter((el) => el.population == population);

    getCountry(country[0], countryList);
  } catch (error) {
    countryList.innerHTML = "<p>Country not found</p>";
  } finally {
    loading.classList.add("loadingNone");
  }
}

loadCountryPage();
