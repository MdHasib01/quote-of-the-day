const quote_text = document.getElementById("quote");
const author = document.getElementById("author");

const newQuoteBtn = document.getElementById("new_quote_button");
const copyToClipboardBtn = document.getElementById("copy_to_clipboard");
const exportBtn = document.getElementById("export_btn");
const twitterBtn = document.getElementById("share_on_twitter");

const bgInput = document.getElementById("select_bg");
const colorInput = document.getElementById("text_color");

let genetatedQuote, generatedAuthor;

function loadQuoteHandler() {
  fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random")
    .then((res) => res.json())
    .then((data) => {
      generatedAuthor = data.data.author;
      genetatedQuote = data.data.content;
      quote_text.innerText = data.data.content;
      author.innerText = `- ${data.data.author}`;
    });
}
window.onload = loadQuoteHandler;

newQuoteBtn.addEventListener("click", loadQuoteHandler);

copyToClipboardBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(
    `Quote: ${genetatedQuote} By: ${generatedAuthor}`
  );
});

twitterBtn.addEventListener("click", () => {
  const twitterShareUrl = `https://x.com/intent/post?text="${genetatedQuote}" -by ${generatedAuthor}`;

  window.open(twitterShareUrl, "_blank");
});
exportBtn.addEventListener("click", () => {
  const canvasDiv = document.getElementById("canvas");
  html2canvas(canvasDiv).then((canvas) => {
    let image = canvas.toDataURL("image/png");
    let link = document.createElement("a");
    link.href = image;
    link.setAttribute("download", `Quote of ${author.innerText}`);
    link.click();
  });
});

bgInput.addEventListener("change", () => {
  const file = bgInput.files[0];

  const url = URL.createObjectURL(file);
  canvas.style.backgroundImage = `url(${url})`;
});

colorInput.addEventListener("change", () => {
  const hexCode = colorInput.value;
  quote_text.classList.remove("text-white");
  author.classList.remove("text-white");
  quote_text.style.color = hexCode;
  author.style.color = hexCode;
});
