$(document).ready(function () {
    $('#pos').text('Hello everybody');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tableFlyDetail").innerHTML += this.responseText;
        }
    };
    xhttp.open("GET", "/DSChuyenBay", false);
    xhttp.send();
})