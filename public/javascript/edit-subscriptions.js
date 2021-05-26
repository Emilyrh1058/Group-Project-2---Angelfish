// Get the modal
var modal = document.getElementById("subModal");

// Get the button that opens the modal
var btn = document.getElementById("modalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    console.log("click");
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var submitBtn = document.getElementById("submitModal");
submitBtn.onclick = async function() {
    console.log("function");
    var checkedSubs = document.querySelectorAll('.manage-subs');
    var updateSubArray = [];
    for (i=0; i < checkedSubs.length; i++) {
        if (checkedSubs[i].checked) {
            updateSubArray.push(+checkedSubs[i].value);
        }
    }
    console.log(updateSubArray);
    var userStr = localStorage.getItem("userInfo");
    var userObj = JSON.parse(userStr);
    const updateUser = await fetch(`/api/users/${userObj.id}`, {
        method: 'put',
        body: JSON.stringify({
            email: userObj.email,
            password: userObj.password,
            subscriptionIds: updateSubArray
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if (updateUser.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }

    modal.style.display = "none";

}