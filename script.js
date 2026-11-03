* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

body {
    background: #f1f4f9;
    color: #263238;
}

header {
    background: #243b55;
    color: white;
    text-align: center;
    padding: 30px;
}

header h1 {
    margin-bottom: 10px;
}

.container {
    width: 90%;
    max-width: 1100px;
    margin: 30px auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
}

.card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.card h2 {
    color: #243b55;
    margin-bottom: 20px;
}

input, textarea {
    width: 100%;
    padding: 12px;
    margin-bottom: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
}

textarea {
    resize: vertical;
    min-height: 75px;
}

button {
    background: #243b55;
    color: white;
    border: none;
    padding: 11px 16px;
    border-radius: 6px;
    cursor: pointer;
    margin: 5px 3px 5px 0;
}

button:hover {
    background: #3c6382;
}

#searchResult, #contactList {
    margin-top: 15px;
    line-height: 1.8;
    overflow-wrap: anywhere;
}

.contact {
    border-bottom: 1px solid #ddd;
    padding: 12px 0;
}

footer {
    background: #243b55;
    color: white;
    text-align: center;
    padding: 18px;
    margin-top: 30px;
}

@media(max-width: 600px) {
    .container {
        width: 95%;
    }
}
