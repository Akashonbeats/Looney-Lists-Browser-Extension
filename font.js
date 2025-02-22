document.addEventListener("DOMContentLoaded", function () {
  const fontSelector = document.getElementById("font-selector");
  const input = document.getElementById("input-field");

  // Load the selected font from local storage
  const savedFont = localStorage.getItem("selectedFont");
  if (savedFont) {
    fontSelector.value = savedFont;
    document.documentElement.style.setProperty("--list-font", savedFont);
    updateFontFamily();
  }

  fontSelector.addEventListener("change", function () {
    const selectedFont = fontSelector.value;
    document.documentElement.style.setProperty("--list-font", selectedFont);
    localStorage.setItem("selectedFont", selectedFont); // Save the selected font to local storage
    updateFontFamily();
  });

  function updateFontFamily() {
    const selectedFont = fontSelector.value;
    document.querySelectorAll("li").forEach(function (li) {
      li.style.fontFamily = selectedFont;
      if (selectedFont.includes("Henny Penny")) {
        li.style.fontSize = "1rem";
      } else {
        li.style.fontSize = ""; // Reset to default if not Henny Penny
      }
    });
    input.style.fontFamily = selectedFont;
  }
});
