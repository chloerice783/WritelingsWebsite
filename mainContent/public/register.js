document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("register-form").addEventListener("submit", async function(event) {
        event.preventDefault(); //Prevent default form submission
    
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const errorMessage = document.getElementById("error-message");
    
        errorMessage.textContent = "";
    
        if (password !== confirmPassword) {
            errorMessage.textContent = "Passwords do not match!";
            return;
        }

        try {
            const response = await fetch("http://localhost:9748/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
    
            const data = await response.json();
            if (response.ok) {
                alert("Registration successful! You can now log in.");
                window.location.href = "/"; //return to login
            } else {
                errorMessage.textContent = data.message;
            }
        } catch (error) {
            errorMessage.textContent = "Error registering. Please try again.";
            console.error("Registration error:", error);
        }
    });

});