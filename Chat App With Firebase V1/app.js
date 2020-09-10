
let name;
swal({
    text: "Enter your name.",
    content: "input",
    button: {
        text: "Submit",
        closeModal: true,
    },
    closeOnClickOutside: false,
    closeOnEsc: false,
}).then((res) => {
    if (res) {
        name = res;
        localStorage.setItem("name", res);
    }
    else {
        swal("Please Enter Your name.")
        location.href = location.href
    }
})
let message = document.getElementById("message");
sendMessage = () => {
    let date = new Date();
    let hours = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    let time = "";
    if (mins > 12) {
        time = `${hours}:${mins}:${secs} AM`;
    }
    else {
        time = `${hours}:${mins}:${secs} PM`;
    }

    firebase.database().ref('messages').push().set({
        "sender": name,
        "message": message.value,
        "time": time,
    });
    message.value = "";
}

// Display Messages

firebase.database().ref('messages').on('child_added', (data) => {

    let li = "";
    let nameDb = localStorage.getItem("name")
    // let r = Math.floor(Math.random() * 255);
    // let g = Math.floor(Math.random() * 255);
    // let b = Math.floor(Math.random() * 255);

    if (data.val().sender === nameDb) {
        console.log("Condition is true")
        li += `
            <li class="align-right" id="message-${data.key}">
                <span class="single-message" id="message-info" onclick="deleteMessage(this)" data-id=${data.key} >
                    <span class="sender-name">${data.val().sender}:</span>
                    <span class="sender-message">${data.val().message}</span>
                    <small class="sent-time">${data.val().time}</small>
                </span>
            </li>
        `;
    }
       else{
        li += `
        <li class="align-left" id="message-${data.key}">
            <span class="single-message">
                <span class="sender-name">${data.val().sender}:</span>
                <span class="sender-message">${data.val().message}</span>
                <small class="sent-time">${data.val().time}</small>
            </span>
        </li>
    `;
       }
    document.getElementById("messages").innerHTML += li;
});

// let messageInfo = document.getElementById("message-info");
// messageInfo.addEventListener('long-press',(self) => {
//     console.log(self.getAttribute("data-id"))
// })
function deleteMessage(self) {
    var messageId = self.getAttribute("data-id")
    console.log(messageId)
    swal({
        title: "Message Delete!",
        text: "Are you sure?!",
        icon: "warning",
        buttons: ["Nope", "Yes"],
    })
        .then((res) => {
            if (res) {
                firebase.database().ref("messages").child(messageId).remove();
                swal({
                    title: "Success",
                    icon: "success",
                    button: "Okay"
                })
            }
        });
}

firebase.database().ref("messages").on("child_removed",(data) => {
    document.getElementById("message-"+data.key).innerHTML = "message has been removed";
})
