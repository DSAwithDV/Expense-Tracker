let titleInput = document.getElementById("titleInput");
let amountInput = document.getElementById("amountInput");
let addBtn = document.getElementById("addBtn");
let expenseList = document.getElementById("expenseList");
let totalElement = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

renderExpenses();

addBtn.addEventListener("click", function () {

    let title = titleInput.value.trim();
    let amount = Number(amountInput.value);

    if (title === "" || amount <= 0) {
        return;
    }

    let expense = {
        id: Date.now(),
        title: title,
        amount: amount
    };

    expenses.push(expense);

    saveExpenses();
    renderExpenses();

    titleInput.value = "";
    amountInput.value = "";
});

function getEmoji(title) {

    title = title.toLowerCase();

    if (title.includes("pizza")) return "🍕";
    if (title.includes("burger")) return "🍔";
    if (title.includes("coffee")) return "☕";
    if (title.includes("tea")) return "🍵";
    if (title.includes("cake")) return "🎂";
    if (title.includes("movie")) return "🎬";
    if (title.includes("petrol")) return "⛽";
    if (title.includes("bus")) return "🚌";
    if (title.includes("book")) return "📚";
    if (title.includes("phone")) return "📱";
    if (title.includes("laptop")) return "💻";
    if (title.includes("medicine")) return "💊";

    return "💰";
}

function renderExpenses() {

    expenseList.innerHTML = "";

    expenses.forEach(function (expense) {

        let li = document.createElement("li");

        li.innerHTML = `
            <span>
                ${getEmoji(expense.title)}
                ${expense.title} - ₹${expense.amount}
            </span>

            <button onclick="deleteExpense(${expense.id})">
                Delete
            </button>
        `;

        expenseList.appendChild(li);
    });

    updateTotal();
}

function updateTotal() {

    let total = expenses.reduce(function (sum, expense) {
        return sum + expense.amount;
    }, 0);

    totalElement.textContent = total;
}

function deleteExpense(id) {

    expenses = expenses.filter(function (expense) {
        return expense.id !== id;
    });

    saveExpenses();
    renderExpenses();
}

function saveExpenses() {

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );
}