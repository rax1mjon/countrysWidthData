let darkMode = document.querySelector(".darkMode");
let loading = document.querySelector(".loading");

if (localStorage.getItem("darkLight") == "dark")
  document.body.classList.add("dark");

darkMode.addEventListener("click", () => {
  if (localStorage.getItem("darkLight") == "dark") {
    document.body.className = "";
    localStorage.setItem("darkLight", "light");
  } else {
    document.body.classList.add("dark");
    localStorage.setItem("darkLight", "dark");
  }
});

async function allData() {
  try {
    let fetchData = await fetch("https://ap-countries-api.vercel.app/all");

    let data = await fetchData.json();
    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
