document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded!");

    const roleSelect = document.getElementById("roleSelect");
    const branchSelect = document.getElementById("branchCampus");
    const form = document.getElementById("signupForm");

    if (!roleSelect || !branchSelect || !form) {
        console.error("Error: One or more elements are missing.");
        return;
    }

    // Options for Role and Branch/Campus
    const roleOptions = ["Admin", "OSFA"];
    const branchOptions = ["Sta. Mesa, Manila", "Taguig City", "Quezon City", "San Juan City", "Parañaque City"];

    // Function to populate select options
    function populateSelect(selectElement, options) {
        options.forEach(option => {
            const opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            selectElement.appendChild(opt);
        });
    }

    populateSelect(roleSelect, roleOptions);
    populateSelect(branchSelect, branchOptions);

    // Handle form submission
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = {
            firstname: document.querySelector("input[name='firstname']").value,
            email: document.querySelector("input[name='email']").value,
            role: roleSelect.value,
            branchCampus: branchSelect.value,
            password: document.querySelector("input[name='password']").value,
            confirmPassword: document.querySelector("input[name='confirmPassword']").value
        };

        console.log("Form Data:", formData);

        // Validate data
        if (Object.values(formData).includes("") || formData.password !== formData.confirmPassword) {
            alert("Please fill in all fields and make sure passwords match.");
            return;
        }

        fetch("http://127.0.0.1/Isko/api/signup.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.text())  // Use response.text() to see the actual content
        .then(data => {
            console.log("Raw Response:", data); // This will log the raw HTML or error message
            try {
                const parsedData = JSON.parse(data);  // Try parsing JSON if the response is valid JSON
                console.log("Server Response:", parsedData);
                if (parsedData.success) {
                    alert("Sign Up Successful!");
                    window.location.href = "login.html"; // Redirect to login page
                } else {
                    alert("Error: " + parsedData.message);
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
                alert("There was an error processing your request.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("There was an error processing your request.");
        });        
    });
});
