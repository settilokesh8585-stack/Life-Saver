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
function aiEmergencyHelp() {
    const situation = prompt(
        "🤖 AI Emergency Help\n\n" +
        "మీకు ఏ emergency వచ్చింది?\n\n" +
        "ఉదాహరణ: Accident, Fire, Chest pain, Snake bite, etc."
    );

    if (!situation) {
        return;
    }

    const text = situation.toLowerCase();

    let advice = "";

    if (text.includes("fire") || text.includes("మంట") || text.includes("అగ్ని")) {
        advice =
            "🚒 Fire Emergency\n\n" +
            "1. వెంటనే సురక్షితమైన ప్రదేశానికి వెళ్లండి.\n" +
            "2. పొగ ఉన్న ప్రదేశంలో కిందికి వంగి బయటకు వెళ్లండి.\n" +
            "3. Fire service కోసం 101కి call చేయండి.";
    }
    else if (
        text.includes("accident") ||
        text.includes("అక్సిడెంట్") ||
        text.includes("రోడ్డు")
    ) {
        advice =
            "🚑 Accident Emergency\n\n" +
            "1. ముందుగా సురక్షితమైన ప్రదేశంలో ఉండండి.\n" +
            "2. తీవ్రమైన గాయం ఉన్న వ్యక్తిని అవసరం లేకుండా కదపవద్దు.\n" +
            "3. Ambulance కోసం 108కి call చేయండి.\n" +
            "4. అవసరమైతే SOS button ఉపయోగించండి.";
    }
    else if (
        text.includes("snake") ||
        text.includes("పాము")
    ) {
        advice =
            "🐍 Snake Bite Emergency\n\n" +
            "1. ప్రశాంతంగా ఉండండి.\n" +
            "2. కాటు వేసిన భాగాన్ని వీలైనంత స్థిరంగా ఉంచండి.\n" +
            "3. వెంటనే ఆసుపత్రికి వెళ్లండి.\n" +
            "4. గాయం కోయడం లేదా విషాన్ని నోటితో పీల్చడం చేయవద్దు.";
    }
    else {
        advice =
            "🆘 Emergency Help\n\n" +
            "మీరు ప్రస్తుతం ప్రమాదంలో ఉంటే ముందుగా సురక్షితమైన ప్రదేశానికి వెళ్లండి.\n\n" +
            "📞 Emergency: 112\n" +
            "🚑 Ambulance: 108\n" +
            "🚒 Fire: 101\n\n" +
            "📍 మీ location కోసం SOS button ఉపయోగించండి.";
    }

    alert(advice);
}
function voiceEmergencyHelp() {
    if (!("webkitSpeechRecognition" in window)) {
        alert("ఈ ఫోన్‌లో Voice Recognition support లేదు");
        return;
    }

    const recognition = new webkitSpeechRecognition();

    recognition.lang = "te-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    alert("🎤 ఇప్పుడు మీ Emergency గురించి మాట్లాడండి");

    recognition.start();

    recognition.onresult = function(event) {
        const text = event.results[0][0].transcript;

        alert("మీరు చెప్పారు:\n" + text);

        aiEmergencyHelpWithText(text);
    };

    recognition.onerror = function() {
        alert("❌ Voice వినలేకపోయాం. మళ్లీ ప్రయత్నించండి.");
    };
}


function aiEmergencyHelpWithText(situation) {
    const text = situation.toLowerCase();

    let advice = "";

    if (
        text.includes("fire") ||
        text.includes("మంట") ||
        text.includes("అగ్ని")
    ) {
        advice =
            "🚒 Fire Emergency\n\n" +
            "1. వెంటనే సురక్షితమైన ప్రదేశానికి వెళ్లండి.\n" +
            "2. పొగ ఉన్న ప్రదేశంలో కిందికి వంగి బయటకు వెళ్లండి.\n" +
            "3. Fire service కోసం 101కి call చేయండి.";
    }
    else if (
        text.includes("accident") ||
        text.includes("అక్సిడెంట్") ||
        text.includes("ప్రమాదం")
    ) {
        advice =
            "🚑 Accident Emergency\n\n" +
            "1. ముందుగా సురక్షితమైన ప్రదేశంలో ఉండండి.\n" +
            "2. తీవ్రమైన గాయం ఉన్న వ్యక్తిని అవసరం లేకుండా కదపవద్దు.\n" +
            "3. Ambulance కోసం 108కి call చేయండి.";
    }
    else {
        advice =
            "🆘 Emergency Help\n\n" +
            "దయచేసి సురక్షితమైన ప్రదేశానికి వెళ్లండి.\n\n" +
            "📞 Emergency: 112\n" +
            "🚑 Ambulance: 108\n" +
            "🚒 Fire: 101";
    }

    alert(advice);
}
