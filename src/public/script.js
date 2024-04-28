// elements
const posts = document.querySelector(".posts");
const usernameInput = document.querySelector(".username-input");
const textInput = document.querySelector(".text-input");
const submitButton = document.querySelector(".submit-btn");

// event listeners
submitButton.addEventListener("click", sendPost);
textInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendPost;
});

// username control
usernameInput.value = localStorage.getItem("username");
usernameInput.addEventListener("input", () => {
    localStorage.setItem("username", usernameInput.value);
});

// initial fetch for posts
fetch("/posts")
    .then((res) => res.json())
    .then((data) => {
        if (data.success) {
            data.posts.forEach((post) => {
                insertPost(post);
            });
        }
    })
    .catch((err) => {
        console.log(err);
    });

// send posts function
async function sendPost() {
    const response = await fetch(`/post`, {
        method: "POST",
        body: JSON.stringify({
            username: usernameInput.value,
            text: textInput.value,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (data.success) {
        insertPost(data.post);
    }

    textInput.value = "";
}

// insert posts function
function insertPost(post) {
    posts.insertAdjacentHTML(
        "beforeend",
        `
        <div class="post">
            <p class="username">${post.username}:</p>
            <pre class="text">${post.text}</pre>
        </div>
    `
    );
}
