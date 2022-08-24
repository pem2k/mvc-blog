//login fetch - post

$("#userLogin").click(
    function login(event) {
        event.preventDefault();

        fetch("/users/login", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: $("#userEmail").val(),
                password: $("#userPassword").val()
            })
        })
        .then((res) => res.json())
        .then((data)=>{
            console.log(data)
            location.reload()
        })
        });
    

$("#signUpButton").click(function signUp(event) {
    event.preventDefault()
    fetch("/users/signup", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            first_name: $("#first-name").val(),
            last_name: $("#last-name").val(),
            email: $("#sign-up-email").val(),
            password: $("#sign-up-password").val(),

        })
    })
        .then((res) => res.json())
        .then((data)=>{
            console.log(data)
            location.reload()
        }
            
        )

})
