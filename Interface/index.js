const passwordInput = document.getElementById('password');
        const showPasswordCheckbox = document.getElementById('showPassword');

        // Event listener for the checkbox
        showPasswordCheckbox.addEventListener('change', () => {
            if (showPasswordCheckbox.checked) {
                // Show the password
                passwordInput.type = 'text';
            } else {
                // Hide the password
                passwordInput.type = 'password';
            }
        });