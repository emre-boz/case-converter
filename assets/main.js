

const container = document.querySelector(".container");
const userInput = document.querySelector("#input");
const clearButton = document.querySelector("#clearButton");
const convertButton = document.querySelector("#convertButton");
const userSelect = document.querySelector("#caseSelection");
const resultOutput = document.querySelector("#result");
const caseOptions = document.querySelector(".case-options");
const checkBoxes = document.querySelectorAll(".checkBox");

userInput.addEventListener("input", () => {
  if (userInput.value.length > 0) {
    clearButton.classList.remove("nonvisible");
    clearButton.classList.add("visible");
  } else {
    clearButton.classList.add("nonvisible");
    clearButton.classList.remove("visible");
  }
});

clearButton.addEventListener("click", () => {
  userInput.value = "";
  clearButton.classList.add("nonvisible");
  clearButton.classList.remove("visible");
  userInput.focus();
});

function detectMobPc() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}

const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.target === container) {
      if (detectMobPc() == false && entry.contentRect.height > 556) {
        container.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    } else if (entry.target === resultOutput) {
      if (entry.contentRect.height > 175) {
        resultOutput.style.overflowY = "scroll";
      } else {
        resultOutput.style.overflowY = "hidden";
      }
    }
  }
});

observer.observe(container);
observer.observe(resultOutput);


// To prevent the container from extending and leaving the screen. Because this problem could not be solved with absolute and flex structures.
function marginTopMaker() {
  if (window.innerHeight > container.offsetHeight) {
    container.style.marginTop =
      (window.innerHeight - container.offsetHeight) / 2 + "px";
    container.style.marginBottom =
      (window.innerHeight - container.offsetHeight) / 2 + "px";
  } else {
    container.style.marginTop = "0";
    container.style.marginBottom = "0";
    userInput.style.marginTop = "1rem";
    btnCopy.style.marginBottom = "1rem";
  }
}

window.addEventListener("load", () => {
  marginTopMaker();
  const loader = document.querySelector(".loader");
  loader.style.display = "none";
});

window.addEventListener("resize", marginTopMaker);

userSelect.addEventListener("change", () => {
  if (
    ["camelCase", "pascalCase", "kebabCase", "SnakeCase"].includes(
      userSelect.value
    )
  ) {
    caseOptions.style.display = "block";
    checkBoxes[2].style.display = "block";
    checkBoxes[3].style.display = "block";
  } else if (userSelect.value == "screamingSnakeCase") {
    caseOptions.style.display = "block";
    checkBoxes[2].style.display = "none";
    checkBoxes[3].style.display = "none";
  } else {
    caseOptions.style.display = "none";
  }
});

//CASE SELECTION LOGIC

const removeNumbersCheckbox = document.querySelector("#removeNumbers");
const removeNumberStartCase = document.querySelector(
  "#removeNumberStartCase"
);
const reduceCapitalLetters = document.querySelector(
  "#reduceCapitalLetters"
);
const reduceCapitalLettersStartCase = document.querySelector(
  "#reduceCapitalLettersStartCase"
);

removeNumbersCheckbox.addEventListener("change", function () {
  if (this.checked) {
    removeNumberStartCase.checked = false;
  }
});

removeNumberStartCase.addEventListener("change", function () {
  if (this.checked) {
    removeNumbersCheckbox.checked = false;
  }
});

reduceCapitalLetters.addEventListener("change", function () {
  if (this.checked) {
    reduceCapitalLettersStartCase.checked = false;
  }
});

reduceCapitalLettersStartCase.addEventListener("change", function () {
  if (this.checked) {
    reduceCapitalLetters.checked = false;
  }
});

convertButton.addEventListener("click", () => {
  resultOutput.style.color = "black";
  let text = userInput.value;

  switch (userSelect.value) {
    case "upperCase":
      text = text.toUpperCase();
      break;
    case "lowerCase":
      text = text.toLowerCase();
      break;
    case "capitalizedCase":
      text = capitalizedCase(text);
      break;
    case "camelCase":
      text = camelCaseConverter(
        text,
        removeNumbersCheckbox.checked,
        removeNumberStartCase.checked,
        reduceCapitalLetters.checked,
        reduceCapitalLettersStartCase.checked
      );
      break;
    case "pascalCase":
      text = pascalCaseConverter(
        text,
        removeNumbersCheckbox.checked,
        removeNumberStartCase.checked,
        reduceCapitalLetters.checked,
        reduceCapitalLettersStartCase.checked
      );
      break;
    case "kebabCase":
      text = kebabCaseConverter(
        text,
        removeNumbersCheckbox.checked,
        removeNumberStartCase.checked,
        reduceCapitalLetters.checked,
        reduceCapitalLettersStartCase.checked
      );
      break;
    case "SnakeCase":
      text = snakeCaseConverter(
        text,
        removeNumbersCheckbox.checked,
        removeNumberStartCase.checked,
        reduceCapitalLetters.checked,
        reduceCapitalLettersStartCase.checked
      );
      break;
    case "screamingSnakeCase":
      text = screamingSnakeCaseConverter(
        text,
        removeNumbersCheckbox.checked,
        removeNumberStartCase.checked,
        reduceCapitalLetters.checked,
        reduceCapitalLettersStartCase.checked
      );
      break;

    default:
      text;
  }

  resultOutput.textContent = text;
});

function capitalizedCase(text) {
  text = text.toLowerCase();
  for (let i = 0; i < text.length; i++) {
    let current = text[i];
    if (i == text.length - 1) {
      break;
    }
    let after = text[i + 1];

    if (current === " " && /[a-zğüşıöçA-ZİĞÜŞÖÇ]/g.test(after)) {
      text =
        text.slice(0, i + 1) + after.toUpperCase() + text.slice(i + 2);
    }
  }
  text = text[0].toUpperCase() + text.slice(1);
  return text;
}

function camelCaseConverter(
  text,
  removeNumber = false,
  removeNumbersStartCase = false,
  reduceCapitalLetters = false,
  reduceCapitalLettersStartCase = false
) {
  text = replaceTurkishCharacters(text);
  if (removeNumber) {
    text = text.replace(/[0-9]/g, "");
  }

  if (reduceCapitalLetters) {
    text = text.toLowerCase();
  }

  text = text.replace(/[^a-zA-Z0-9]/g, " ");
  text = text.replace(/\s+/g, " ");
  text = text.trim();

  for (let i = 0; i < text.length; i++) {
    let current = text[i];
    let next = text[i + 1];
    if (current == " " && /[a-z]/.test(next)) {
      text = text.slice(0, i) + next.toUpperCase() + text.slice(i + 2);
    }
  }
  text = text.replace(/\s+/g, "");
  if (/[A-Z]/.test(text[0])) {
    text = text[0].toLowerCase() + text.slice(1);
  }

  if (removeNumbersStartCase) {
    text = text.replace(/[a-z0-9]/g, (item, index) => {
      if (/[0-9]/.test(item)) {
        return "";
      } else if (/[a-z]/.test(item) && /[0-9]/.test(text[index - 1])) {
        return item.toUpperCase();
      } else {
        return item;
      }
    });
  }
  if (reduceCapitalLettersStartCase) {
    text = text.replace(/[a-zA-Z]/g, (item, index) => {
      if (/[A-Z]/.test(item) && /[a-z]/.test(text[index - 1])) {
        return item;
      } else if (/[A-Z]/.test(item)) {
        return item.toLowerCase();
      } else {
        return item;
      }
    });
  }

  return text;
}

function pascalCaseConverter(
  text,
  removeNumber = false,
  removeNumbersStartCase = false,
  reduceCapitalLetters = false,
  reduceCapitalLettersStartCase = false
) {
  text = replaceTurkishCharacters(text);

  if (removeNumber) {
    text = text.replace(/[0-9]/g, "");
  }

  if (reduceCapitalLetters) {
    text = text.toLowerCase();
  }

  text = text.replace(/[^a-zA-Z0-9]/g, " ");
  text = text.replace(/\s+/g, " ");
  text = text.trim();

  for (let i = 0; i < text.length; i++) {
    let current = text[i];
    let next = text[i + 1];
    if (current == " " && /[a-z]/.test(next)) {
      text = text.slice(0, i) + next.toUpperCase() + text.slice(i + 2);
    }
  }
  text = text.replace(/\s+/g, "");
  if (/[a-z]/.test(text[0])) {
    text = text[0].toUpperCase() + text.slice(1);
  }

  if (removeNumbersStartCase) {
    text = text.replace(/[a-z0-9]/g, (item, index) => {
      if (/[0-9]/.test(item)) {
        return "";
      } else if (/[a-z]/.test(item) && /[0-9]/.test(text[index - 1])) {
        return item.toUpperCase();
      } else {
        return item;
      }
    });
  }
  if (reduceCapitalLettersStartCase) {
    text = text.replace(/[a-zA-Z]/g, (item, index) => {
      if (/[A-Z]/.test(item) && /[a-z]/.test(text[index - 1])) {
        return item;
      } else if (/[A-Z]/.test(item)) {
        return item.toLowerCase();
      } else {
        return item;
      }
    });
  }

  return text;
}

function kebabCaseConverter(
  text,
  removeNumber = false,
  removeNumbersStartCase = false,
  reduceCapitalLetters = false,
  reduceCapitalLettersStartCase = false
) {
  text = replaceTurkishCharacters(text);

  if (removeNumber) {
    text = text.replace(/[0-9]/g, "");
  }

  if (reduceCapitalLetters) {
    text = text.toLowerCase();
  }

  text = text.replace(/[^a-zA-Z0-9]/g, " ");
  text = text.replace(/\s+/g, " ");
  text = text.trim();

  text = text.replace(/\s/g, "-");

  if (removeNumbersStartCase) {
    text = text.replace(/[0-9]+/g, "-");
  }

  if (reduceCapitalLettersStartCase) {
    text = text.replace(/[A-Z]+/g, (item, index) => {
      return item.toLowerCase() + "-";
    });
  }
  text = text.replace(/-+/g, "-");
  text = text.replace(/^-|-$/g, "");

  return text;
}

function snakeCaseConverter(
  text,
  removeNumber = false,
  removeNumbersStartCase = false,
  reduceCapitalLetters = false,
  reduceCapitalLettersStartCase = false
) {
  text = replaceTurkishCharacters(text);

  if (removeNumber) {
    text = text.replace(/[0-9]/g, "");
  }

  if (reduceCapitalLetters) {
    text = text.toLowerCase();
  }

  text = text.replace(/[^a-zA-Z0-9]/g, " ");
  text = text.replace(/\s+/g, " ");
  text = text.trim();

  text = text.replace(/\s/g, "_");

  if (removeNumbersStartCase) {
    text = text.replace(/[0-9]+/g, "_");
  }

  if (reduceCapitalLettersStartCase) {
    text = text.replace(/[A-Z]+/g, (item, index) => {
      return item.toLowerCase() + "_";
    });
  }
  text = text.replace(/_+/g, "_");
  text = text.replace(/^_|_$/g, "");

  return text;
}

function screamingSnakeCaseConverter(
  text,
  removeNumber = false,
  removeNumbersStartCase = false,
  reduceCapitalLetters = false,
  reduceCapitalLettersStartCase = false
) {
  text = snakeCaseConverter(
    text,
    removeNumber,
    removeNumbersStartCase,
    reduceCapitalLetters,
    reduceCapitalLettersStartCase
  ).toUpperCase();
  return text;
}

function removeMultipleSpaces(text) {
  text = text.replace(/\s+/g, " ");
  return text;
}

function replaceTurkishCharacters(text) {
  const turkishCharacters = {
    ğ: "g",
    ü: "u",
    ş: "s",
    ı: "i",
    ö: "o",
    ç: "c",
    Ğ: "G",
    Ü: "U",
    Ş: "S",
    İ: "I",
    Ö: "O",
    Ç: "C",
  };

  return text.replace(
    /[ğüşıöçĞÜŞİÖÇ]/g,
    (match) => turkishCharacters[match]
  );
}

const btnCopy = document.querySelector("#btnCopy");

btnCopy.addEventListener("click", async (e) => {
  let result = resultOutput.textContent;

  if (result && resultOutput.style.color == "black") {
    await navigator.clipboard.writeText(result);
    resultOutput.textContent = `"${result}" Copied!`;
    resultOutput.style.color = "red";
  }
});

window.addEventListener("keydown", (e) => {
  if (e.code === "NumpadEnter" || e.code === "Enter") {
    convertButton.click();
  }
  if (e.code === "Escape") {
    clearButton.click();
  }
});