const form = document.getElementById("generate");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearQR();

    const urlLink = document.getElementById("linkUrl").value;
    const size = document.getElementById("size").value;

    if (urlLink === '') {
        alert("Please enter a URL")
    } else {
        displaySpinner();  

        setTimeout(() => {
            hideSpinner();

            generateQRCode(urlLink, size);

            setTimeout(() => {
                const saveUrl = qr.querySelector("img").src;
                saveBtn(saveUrl);
            }, 50 )
        }, 1000);
    }
};

const generateQRCode = (urlLink, size) => {
    const qrcode = new QRCode("qrcode", {
        text: urlLink,
        width: size,
        height: size,
    })
}

const displaySpinner = () => {
    document.getElementById("spinner").style.display= 'block';
}

const hideSpinner = () => {
    document.getElementById("spinner").style.display= 'none';
}

const clearQR = () => {
    qr.innerHTML = '';
    const saveLink = document.getElementById("save-link");
    if (saveLink) {
        saveLink.remove();
    }
}

const saveBtn = (saveUrl) => {
    const link = document.createElement("a");
    link.id = "save-link";
    link.classList = "bg-bluedark hover:bg-gray-600 text-white font-bold py-2 rounded w-1/3 m-auto my-4"
    link.href= saveUrl;
    link.download = "qrcode";
    link.innerHTML = "Save Image";
    document.getElementById("generated").appendChild(link);;
}

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);

