const Expenses = [
    {
        key: "5b21ca3eeb7f6fbccd471815",
        name: "Sandip",
        category: { key: "5b21ca3eeb7f6fbccd471818", name: "Travel" },
        subCategory: ["ola", "zomato"],
        amount: 250,
        date: "2018-01-07",
        liked: true
    },
    {
        key: "5b21ca3eeb7f6fbccd471816",
        name: "Sandip",
        category: { key: "5b21ca3eeb7f6fbccd471818", name: "Food" },
        subCategory: ["ola", "zomato"],
        date: "2018-01-04",
        amount: 200
    },
    {
        key: "5b21ca3eeb7f6fbccd471817",
        name: "Subham",
        category: { key: "5b21ca3eeb7f6fbccd471820", name: "Hotel" },
        subCategory: ["ola", "zomato"],
        date: "2018-01-03",
        amount: 345
    },
    {
        key: "5b21ca3eeb7f6fbccd471819",
        name: "Soutrick",
        category: { key: "5b21ca3eeb7f6fbccd471814", name: "ViewPoint" },
        subCategory: ["ola", "zomato"],
        date: "2018-01-02",
        amount: 500
    },
    {
        key: "5b21ca3eeb7f6fbccd47181a",
        name: "Sanchayan",
        category: { key: "5b21ca3eeb7f6fbccd471814", name: "Tea" },
        subCategory: ["ola", "zomato"],
        date: "2018-01-09",
        amount: 335
    },
    {
        key: "5b21ca3eeb7f6fbccd47181b",
        name: "Sayantan",
        category: { key: "5b21ca3eeb7f6fbccd471814", name: "Snacks" },
        subCategory: ["ola", "zomato"],
        date: "2018-01-03",
        amount: 357
    },
    {
        key: "5b21ca3eeb7f6fbccd47181e",
        name: "Soutrick",
        category: { key: "5b21ca3eeb7f6fbccd471820", name: "Rent" },
        subCategory: ["ola", "zomato"],
        date: "2019-27-21",
        amount: 475
    },
    {
        key: "5b21ca3eeb7f6fbccd47181f",
        name: "Sanchayan",
        category: { key: "5b21ca3eeb7f6fbccd471821", name: "tickets" },
        subCategory: ["ola", "zomato"],
        date: "2018-01-03",
        amount: 457
    },
    {
        key: "5b21ca3eeb7f6fbccd471822",
        name: "Sanchayan",
        category: { key: "5b21ca3eeb7f6fbccd471822", name: "travel" },
        subCategory: ["ola", "zomato"],
        date: "2018-01-03",
        amount: 556
    },
    {
        key: "5b21ca3eeb7f6fbccd471823",
        name: "Subham",
        category: { key: "5b21ca3eeb7f6fbccd471823", name: "hotel" },
        subCategory: ["ola", "zomato"],
        date: "2018-01-03",
        amount: 380
    },
    {
        key: "5b21ca3eeb7f6fbccd471824",
        name: "Sayantan",
        category: { key: "5b21ca3eeb7f6fbccd4718124", name: "food" },
        subCategory: ["ola", "zomato"],
        date: "2018-01-03",
        amount: 300
    }
];

export function getExpenses() {
    return Expenses;
}

export function getMovie(id) {
    return Expenses.find(m => m.key === id);
}
