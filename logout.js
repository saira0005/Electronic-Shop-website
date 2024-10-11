const isLoggedIn = localStorage.getItem("isLoggedIn");

        // Display the logout button if logged in
        if (isLoggedIn) {
            document.getElementById("logout-button").style.display = "block";
        }

        // Add functionality to the Logout button
        document.getElementById("logout-button").addEventListener("click", function() {
            localStorage.removeItem("isLoggedIn"); // Clear login state
            alert("You have been logged out.");
            window.location.href = "login.html"; // Redirect to login page after logout
        });