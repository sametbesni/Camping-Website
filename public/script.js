function openNav() {
    document.getElementById("mobile-nav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mobile-nav").style.width = "0";
}

function validateForm() {
    const destination = document.getElementById("destination").value;
    const date = document.getElementById("date").value;
    const people = document.getElementById("people").value;

    if (!destination || !date || !people) {
        alert("please fill in all the fields.");
    } else {
        showModal();
    }

    fetch('http://yourserver.com/api/book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ destination, date, people })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('myModal').style.display = 'block';
        }
    })
    .catch(error => console.error('Error:', error));
}

function showModal() {
    document.getElementById("myModal").style.display = "block";
}
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

