console.log("Script loaded!");

// === DOM references ===
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// === Transactions state ===
let transactions = [];

// === Add transaction ===
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add text and amount");
    return;
  }

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value,
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();

  text.value = "";
  amount.value = "";
}

// === Add to DOM ===
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `
    ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  init();
}


// === Update totals ===
function updateValues() {
  const amounts = transactions.map(t => t.amount);

  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `+$${income}`;
  money_minus.innerText = `-$${expense}`;
}

// === Init ===
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

// === Event listeners ===
form.addEventListener("submit", addTransaction);

// === Start ===
init();