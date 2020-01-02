export const FetchData = (firebase, gid) => {
    let expenses = [];
    const unsubscribe = firebase.getExpenseByGroup(gid).onSnapshot(
        snapshot => {
            snapshot.forEach(doc => {
                expenses.push({
                    key: doc.id,
                    ...doc.data()
                });
            });
        },
        error => {
            console.log("Error Fetching Expenses", error.message);
        }
    );
    return [unsubscribe, expenses];
};
