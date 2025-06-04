let form = document.querySelector(".form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let user = {
    email: event.target.userEmail.value,
    password: event.target.password.value,
  };
  try {
    let postData = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
      body: JSON.stringify(user),
    });

    if (!postData.ok) throw new Error(postData.message);

    location = "./home.html";
  } catch (error) {
    let errorMessage = document.querySelector(".errorMessage");
    errorMessage.classList.remove("errorNone");
    setTimeout(() => {
      errorMessage.classList.add("errorNone");
    }, 5000);

    let errorBtn = document.querySelector(".errorMessage span");

    errorBtn.addEventListener("click", () => {
      errorMessage.classList.add("errorNone");
    });

    console.log(error.message);
  }
});
