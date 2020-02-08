const body = document.querySelector("body");

const IMG_NUMBER =3;

function handleImgLoad() {
    console.log("finished loading");
}

function paintImage(imgNumber) {
    const img= new Image();
    img.src = `images/${imgNumber}.jpg`;
    img.classList.add('bgImage');
    body.appendChild(img);
}

function genRandom() {
    const number = Math.ceil(Math.random()*3);
    return number;
}

function bgInit() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

bgInit();