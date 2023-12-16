// ! DOM Elements -- step 1
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numberEl = document.getElementById("numbers");
const symbolEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

//! Generate Event listen -- step 3 
generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  // const length = parseInt(lengthEl.value);
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numberEl.checked;
  const hasSymbol = symbolEl.checked;

  resultEl.textContent = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

//! Copy password to clipboard
clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});

const randomFunction = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

//! Generated Password
function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";

  const typesCount = lower + upper + number + symbol; // to checked value is checked is not

  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    // filter the 0 values
    (item) => Object.values(item)[0]
  );

  for (let i = 0; i < length; i += typesCount) {  // for create a 20 digit passoword
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunction[funcName]();
    });
  }



  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

//! Random Generator functions -- step 2 
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
