document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("login-form").addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent default form submission
    
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const errorMessage = document.getElementById("error-message");
    
        // Reset error message
        errorMessage.textContent = "";

        try {
            const response = await fetch("http://localhost:9748/login", { // Update this if deployed
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
    
            const data = await response.json();
            if (response.ok) {
                alert("Login successful!");
                window.location.href = "/homepage"; // Redirect to login page
            } else {
                errorMessage.textContent = data.message;
            }
        } catch (error) {
            errorMessage.textContent = "Username or password was incorrect. Please try again.";
            console.error("Login error:", error);
        }
    });
});