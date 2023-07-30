// let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
// let transactions = [];
const balanceAmount = document.getElementById("balanceAmount");
const incomeAmount = document.getElementById("incomeAmount");
const expenseAmount = document.getElementById("expenseAmount");
const transactionForm = document.getElementById("transactionForm");
const descriptionInput = document.getElementById("descriptionInput");
const amountInput = document.getElementById("amountInput");
const typeSelect = document.getElementById("typeSelect");
const transactionList = document.getElementById("transactionList");
const noTransactionMessage = document.getElementById("noTransactionMessage");
let transactions = [];
let incomes=0;
let expenses=0;
let totalIncome = 0;
let totalExpense = 0;
// Check if transactions data exists in Local Storage
if (localStorage.getItem("transactions")) {
    transactions = JSON.parse(localStorage.getItem("transactions"));
}

// Function to update balance

function updateBalance() {
    const balance = transactions.reduce((acc, transaction) => {
      return transaction.type === "income" ? acc + transaction.amount : acc - transaction.amount;
    }, 0);

    totalIncome = transactions.reduce((acc, transaction) => {
      return transaction.type === "income" ? acc + transaction.amount : acc;
    }, 0);

    totalExpense = transactions.reduce((acc, transaction) => {
      return transaction.type === "expense" ? acc + transaction.amount : acc;
    }, 0);

    balanceAmount.textContent = balance.toFixed(2);
    incomeAmount.textContent = totalIncome.toFixed(2);
    expenseAmount.textContent = totalExpense.toFixed(2);

}

// Function to add a transaction
function addTransaction(event) {
    event.preventDefault();

    const description = descriptionInput.value;
    const amount = +amountInput.value;
    const type = typeSelect.value;

    const transaction = {
        description,
        amount,
        type
    };


    transactions.push(transaction);
    if(type==="income"){
        totalIncome+=amount;
    }
    else if(type==="expense"){
        totalExpense+=amount;
    }
    updateTransactions();
    updateBalance();
    saveTransactions();
    alert(`Transaction "${transaction.description}" added successfully!`);

    descriptionInput.value = "";
    amountInput.value = "";
    typeSelect.value = "income";
}

// Function to delete a transaction
function deleteTransaction(index) {
    const deletedTransaction = transactions.splice(index, 1);
    if (deletedTransaction.type === "income") {
        totalIncome -= deletedTransaction.amount;
      } else if (deletedTransaction.type === "expense") {
        totalExpense -= deletedTransaction.amount;
      }
      alert(`Transaction deleted successfully!`);
    updateTransactions();
    updateBalance();
    saveTransactions();
}

// Function to save transactions to Local Storage
function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    }

// Function to load transactions from Local Storage
function loadTransactions() {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
        transactions = JSON.parse(storedTransactions);
        updateTransactions();
        updateBalance();
    }
}

// Function to update the transaction list
function updateTransactions() {
    transactionList.innerHTML = "";

    if (transactions.length === 0) {
        noTransactionMessage.style.display = "block";
    } else {
        noTransactionMessage.style.display = "none";

        transactions.forEach((transaction, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${transaction.description}</span>
                <span class="amount ${transaction.type}">${transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}</span>
                <div class="transaction-actions">
                    <button onclick="editTransaction(${index})">Edit</button>
                    <button onclick="deleteTransaction(${index})">Delete</button>
                </div>
            `;
            transactionList.appendChild(listItem);
        });
    }
}
// Function to edit a transaction
function editTransaction(index) {
    const transaction = transactions[index];
    const updatedDescription = prompt("Enter the updated description:", transaction.description);
    const updatedAmount = parseFloat(prompt("Enter the updated amount:", transaction.amount));
    const updatedType = prompt("Enter the updated type (income or expense):", transaction.type);

    if (updatedDescription && !isNaN(updatedAmount) && (updatedType === "income" || updatedType === "expense")) {
        const updatedTransaction = {
            description: updatedDescription,
            amount: updatedAmount,
            type: updatedType
          };
          if (transaction.type === "income") {
            totalIncome -= transaction.amount;
            totalIncome += updatedAmount;
          } else if (transaction.type === "expense") {
            totalExpense -= transaction.amount;
            totalExpense += updatedAmount;
          }
        transactions[index] = updatedTransaction;
        alert(`Transaction "${updatedTransaction.description}" updated successfully!`);
        updateTransactions();
        updateBalance();
        saveTransactions();
    } else {
        alert("Invalid input! Please try again.");
    }
}

// Event listener for adding a transaction
transactionForm.addEventListener("submit", addTransaction);
function updateDateTime() {
  const currentDateTime = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const formattedDateTime = currentDateTime.toLocaleDateString('en-US', options);
  document.getElementById('currentDateTime').textContent = formattedDateTime;
}

// Update the date and time every second
setInterval(updateDateTime, 1000);

// Initial update
updateDateTime();


// Load transactions on page load
loadTransactions();