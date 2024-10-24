document.addEventListener('DOMContentLoaded', createAddQuoteForm);

let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    {text:"The way to get started is to quit talking and begin doing.", category:"Motivational Quotes"},
    {text:"The purpose of our lives is to be happy.", category:"Life Quotes"},
    {text:"Everything you can imagine is real.", category:"Success"},
    {text:"Life is trying things to see if they work.", category:"Life Quotes"},
]
const newQuoteBtn = document.getElementById('newQuote');
const quoteDisplay = document.getElementById('quoteDisplay');

function showRandomQuote(){
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.textContent = `${quote.text} - [${quote.category}]`;

};

newQuoteBtn.addEventListener('click', showRandomQuote);

function createAddQuoteForm(){
    const addQuoteDyn = `
<div>
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
      </div> 
      <input type="file" id="importFile" accept=".json" onchange="importFromJsonFile(event)" />
`;
    quoteDisplay.innerHTML += addQuoteDyn;
}


function addQuote(){
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
    // const importFromJsonBtn = `
    // <input type="file" id="importFile" accept=".json" onchange="importFromJsonFile(event)" />
    // `;
    // quoteDisplay.innerHTML += importFromJsonBtn;

    if (newQuoteText ==='' || newQuoteCategory === ''){
        alert ('Fill in all the fields')
        return;
    }
    quotes.push({text: newQuoteText,category: newQuoteCategory});
    const quoteList = document.createElement('li');
    quoteList.textContent = `${newQuoteText} - [${newQuoteCategory}]`;
    quoteDisplay.appendChild(quoteList);

    
    saveQuotes();

    //localStorage.setItem();
    newQuoteText ='';
    newQuoteCategory ='';
}

function saveQuotes(quotes) {
        const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
        storedQuotes.push(quotes);
        localStorage.setItem('quotes', JSON.stringify(storedQuotes));
    }

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }

const jsonString = JSON.stringify(quotes);
