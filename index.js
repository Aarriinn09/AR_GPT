// const { response } = require("express");

const key = "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";

const submitbutton = document.querySelector("#submit");
const outputEl = document.querySelector("#output");
const inputEl = document.querySelector("input");
const historyEl = document.querySelector(".history");
const button = document.querySelector("button");

function changeInput(value) {
  const inputEl = document.querySelector("input");
  inputEl.value = value;
}

async function getData() {
  // console.log(`clicked`);
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      // max-tokens = 100;
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // text-davinci-003
      messages: [{ role: "user", content: inputEl.value }],
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    console.log(data);
    outputEl.textContent = data.choices[0].message.content;
    if (data.choices[0].message.content && inputEl.value) {
      const pElement = document.createElement("p");
      pElement.textContent = inputEl.value;
      pElement.addEventListener("click", () =>
        changeInput(pElement.textContent)
      );
      historyEl.append(pElement);
      inputEl.value = "";
    }
  } catch (error) {
    console.error(error);
  }
}

submitbutton.addEventListener("click", getData);

inputEl.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("submit").click();
  }
});

function clearinput() {
  inputEl.value = "";
}

button.addEventListener("click", clearinput);
