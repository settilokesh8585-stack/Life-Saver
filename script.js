function saveEmergencyContact() {
    const phone = document.getElementById("phone").value.trim();
    const status = document.getElementById("contactStatus");

    if (phone === "") {
        status.innerHTML = "ముందుగా ఫోన్ నంబర్ ఎంటర్ చేయండి";
        return;
    }

    localStorage.setItem("emergencyPhone", phone);

    status.innerHTML = "✅ Emergency Number సేవ్ అయింది";
}


function loadEmergencyContact() {
    const savedPhone = localStorage.getItem("emergencyPhone");

    if (savedPhone) {
        const phoneInput = document.getElementById("phone");

        if (phoneInput) {
            phoneInput.value = savedPhone;
        }

        const status = document.getElementById("contactStatus");

        if (status) {
            status.innerHTML = "✅ Emergency Number సేవ్ అయి ఉంది";
        }
    }
}


function getLocation() {
    const status = document.getElementById("status");

    if (!navigator.geolocation) {
        status.innerHTML = "ఈ బ్రౌజర్‌లో Location సపోర్ట్ లేదు";
        return;
    }

    status.innerHTML = "Location తీసుకుంటున్నాం...";

    navigator.geolocation.getCurrentPosition(
        function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const locationLink =
                "https://www.google.com/maps?q=" + lat + "," + lon;

            status.innerHTML = "✅ Location దొరికింది";

            window.open(locationLink, "_blank");
        },
        function () {
            status.innerHTML = "❌ Location తీసుకోలేకపోయాం";
        }
    );
}


function openMaps(query) {
    const status = document.getElementById("status");

    if (!navigator.geolocation) {
        const url =
            "https://www.google.com/maps/search/" +
            encodeURIComponent(query);

        window.open(url, "_blank");
        return;
    }

    status.innerHTML = query + " వెతుకుతున్నాం...";

    navigator.geolocation.getCurrentPosition(
        function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url =
                "https://www.google.com/maps/search/" +
                encodeURIComponent(query) +
                "/@" +
                lat +
                "," +
                lon +
                ",15z";

            status.innerHTML = "✅ " + query + " Location చూపిస్తున్నాం";

            window.open(url, "_blank");
        },
        function () {
            const url =
                "https://www.google.com/maps/search/" +
                encodeURIComponent(query);

            window.open(url, "_blank");
        }
    );
}


async function shareSOS() {
    if (!navigator.geolocation) {
        alert("ఈ బ్రౌజర్‌లో Location సపోర్ట్ లేదు");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const locationLink =
                "https://www.google.com/maps?q=" + lat + "," + lon;

            const message =
                "🚨 SOS Emergency!\n" +
                "నా Location:\n" +
                locationLink;

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: "Life Saver SOS",
                        text: message
                    });
                } catch (error) {
                    console.log("Share cancelled");
                }
            } else {
                alert(message);
            }
        },
        function () {
            alert("Location తీసుకోలేకపోయాం");
        }
    );
}


function makeEmergencyCall() {
    const phone = localStorage.getItem("emergencyPhone");

    if (!phone) {
        alert("ముందుగా Emergency Number సేవ్ చేయండి");
        return;
    }

    window.location.href = "tel:" + phone;
}


window.onload = function () {
    loadEmergencyContact();
};
function sendSOS() {
    const emergencyPhone = localStorage.getItem("emergencyPhone");
    const myPhone = localStorage.getItem("myPhone");

    if (!emergencyPhone) {
        alert("ముందుగా Emergency Number సేవ్ చేయండి");
        return;
    }

    if (!myPhone) {
        alert("ముందుగా My Phone Number సేవ్ చేయండి");
        return;
    }

    if (!navigator.geolocation) {
        alert("ఈ బ్రౌజర్‌లో Location సపోర్ట్ లేదు");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const locationLink =
                "https://www.google.com/maps?q=" + lat + "," + lon;

            const message =
                "🚨 SOS EMERGENCY!\n" +
                "నాకు సహాయం కావాలి.\n\n" +
                "📞 నా ఫోన్ నంబర్: " + myPhone + "\n" +
                "📍 నా Location:\n" +
                locationLink;

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: "🚨 Life Saver SOS",
                        text: message
                    });
                } catch (error) {
                    console.log("Share cancelled");
                }
            } else {
                alert(message);
            }
        },
        function () {
            alert("Location తీసుకోలేకపోయాం");
        }
    );
}


function callEmergency() {
    const phone = localStorage.getItem("emergencyPhone");

    if (!phone) {
        alert("ముందుగా Emergency Number సేవ్ చేయండి");
        return;
    }

    window.location.href = "tel:" + phone;
}
function callNumber(number) {
    window.location.href = "tel:" + number;
}
function saveMyPhone() {
    const phone = document.getElementById("myPhone").value.trim();
    const status = document.getElementById("myPhoneStatus");

    if (phone === "") {
        status.innerHTML = "ముందుగా మీ ఫోన్ నంబర్ ఎంటర్ చేయండి";
        return;
    }

    localStorage.setItem("myPhone", phone);

    status.innerHTML = "✅ నా ఫోన్ నంబర్ సేవ్ అయింది";
}