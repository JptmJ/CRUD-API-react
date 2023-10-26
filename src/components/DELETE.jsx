import deleteUrl from './Url'
const handleDelete = (id, data, setData) => {
    const userInput = window.prompt("Type YES or NO to delete goal number " + id);
    if (userInput !== null) {
        const userInputLower = userInput.toLowerCase();
        if (userInputLower === "no") {
            alert("Delete Goal Canceled");
        } else if (userInputLower === "yes") {
            alert("Goal number " + id + " deleted.");

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "id": id
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(deleteUrl().deleteUrl, requestOptions)
                .then(response => response.text())
                .then(result => {
                    // Remove the deleted goal from the state
                    setData(data.filter(goal => goal.id !== id));
                    console.log(result);
                })
                .catch(error => console.log('error', error));
        } else {
            alert("Invalid input. Please type YES or NO.");
        }
    } else {
        alert("Delete Goal Canceled");
    }
}

export default handleDelete;