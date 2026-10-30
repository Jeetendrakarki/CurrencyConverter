import countryList from "./countryCodes.js";

const BaseURL = "https://api.frankfurter.dev/v2/rate/npr/inr";

// const URL =
//   "https://data.fixer.io/api/latest?access_key=25a6af44903a15bc2ddefd5164312bee&symbols=USD";

// This api is from fixture
// created an account and generated the api key

// for changing the names of ciuntry inside dropdown select

const dropDowns = document.querySelectorAll(".select-container select");
// console.log(dropDowns)

// we have country names and country codes in another file
// trying to access country code using for in loop as for in loop gives key or indices

// for (let codes in countryList) {
//   console.log(codes);
// }

// selecting button for conversion

let btn = document.querySelector("form button");

// excessing result div
let message = document.querySelector(".result");

// adding all the counrty codes in select using for of loop

for (let select of dropDowns) {
  for (let codes in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = codes;
    newOption.value = codes;
    // Making USD default selection

    select.append(newOption);
    if (select.name === "from" && codes === "USD") {
      newOption.selected = "selected";
    }

    if (select.name === "To" && codes === "NPR") {
      newOption.selected = "selected";
    }
  }

  // calling the updateflag method in change event or when the select change

  select.addEventListener("change", (event) => {
    updateFlags(event.target);
  });
}

// for updating the flag when the country is selected

const updateFlags = (element) => {
  // console.log(element);
  let currencyCode = element.value;
  // console.log(currencyCode)
  let countryCode = countryList[currencyCode];
  // console.log(countryCode)
  let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

// adding eventlistener to button
btn.addEventListener("click", async (event) => {
  event.preventDefault();
  // selecting the entered amount
  let amount = document.querySelector(".amount input");

  // console.log(amount);
  let amountValue = amount.value;
  if (amountValue === 0 || amountValue < 1) {
    amountValue = 1;
    amount.value = "1";
  }

  //selecting fromcurrency and tocurrency

  let fromCurrency = document.querySelector(".from select");

  let toCurrency = document.querySelector(".To select");
  console.log(fromCurrency.value, toCurrency.value);

  const modifiedURL = `https://api.frankfurter.dev/v2/rate/${fromCurrency.value}/${toCurrency.value}`;
  // making the function async just to use await
  const response = await fetch(modifiedURL);
  // console.log(response);
  let data = await response.json();
  console.log(data);
  let rate = data.rate;
  // console.log(rate);
  let finalAmount = Number(amountValue) * rate;
  message.innerText = `${amountValue} ${fromCurrency.value} is equal to ${finalAmount} ${toCurrency.value}`;
});
