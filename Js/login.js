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
  } catch (error) {}
});
