//post route for posts
$("#submitNewPost").click(
    function post(event) {
        event.preventDefault();

        fetch("/posts", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: $("#postTitle").val(),
                content: $("#postContent").val(),
            })
        }).then(res => res.json()).then((data) => {
            console.log(data)
            location.reload()
        })
    });

$("#postDeleter").click(
    function del(event) {
        console.log($("#postDeleter").parent().attr("data-postId"))
        event.preventDefault()
        fetch(`/posts`, {
            method: 'DELETE',
            body:{
               id: $("#postDeleter").parent().attr("data-postId")
            },
        }).then(res => res.json()).then((data) => {
            console.log(data)
            location.reload()
        })
    });

//post route for comments based on post id
