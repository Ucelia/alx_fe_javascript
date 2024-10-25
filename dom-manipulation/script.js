document.addEventListener('DOMContentLoaded', function(){
    createAddQuoteForm();
    populateCategories();
    filterQuotes();
    const lastSelectedCategory = localStorage.getItem('categoryFilter');
    categoryFilter.value= lastSelectedCategory;
    filterQuotes();
});

let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    {text:"The way to get started is to quit talking and begin doing.", category:"Motivational Quotes"},
    {text:"The purpose of our lives is to be happy.", category:"Life Quotes"},
    {text:"Everything you can imagine is real.", category:"Success"},
    {text:"Life is trying things to see if they work.", category:"Life Quotes"},
]
const newQuoteBtn = document.getElementById('newQuote');
const quoteDisplay = document.getElementById('quoteDisplay');
let categoryFilter = document.getElementById('categoryFilter');

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
      
`;
    quoteDisplay.innerHTML += addQuoteDyn;
}


function addQuote(){
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (newQuoteText ==='' || newQuoteCategory === ''){
        alert ('Fill in all the fields')
        return;
    }
    quotes.push({text: newQuoteText,category: newQuoteCategory});
    const quoteList = document.createElement('li');
    quoteList.textContent = `${newQuoteText} - [${newQuoteCategory}]`;
    quoteDisplay.appendChild(quoteList);

    
    saveQuotes();

    newQuoteText ='';
    newQuoteCategory ='';
    
}

function saveQuotes(quotes) {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes(quotes);
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }

function exportToJsonFile(){
    const jsonString = JSON.stringify(quotes);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href =url;
    downloadLink.download = 'quotes.json';
    downloadLink.click();

    URL.revokeObjectURL(url);

}

function populateCategories(){
    const uniqueCategory = quotes.category;
    uniqueCategory.forEach(category => {
        let option = document.createElement('option');
        option.textContent= category;
        option.value = category;
        categoryFilter.appendChild('option');
    });
}

function filterQuotes(){
    const selectedCategory = categoryFilter.value;
    localStorage.setItem('categoryFilter', SelectedCategory);
    quoteDisplay.innerHTML ='';
    function filteredQuotes ()  {
    if (selectedCategory === 'All Categories'){
        return quotes;
    }
    else {
        return quotes.filter(function(quote) {
            return quote.category === SelectedCategory;
        });
    }
}
filteredQuotes.forEach(quote => {
    const quoteListItem = document.createElement('li');
    quoteListItem.textContent = `${quote.text} - [${quote.category}]`;
    quoteDisplay.appendChild(quoteListItem);
})
    
}
filterQuotes();

function saveLastCategory (){
    localStorage.setItem('categoryFilter', JSON.stringify(categoryFilter));
}


