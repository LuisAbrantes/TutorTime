let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    setPositionThumbnail();

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}
function setPositionThumbnail () {
    let thumbnailActive = document.querySelector('.thumbnail .item.active');
    let rect = thumbnailActive.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
        thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})

document.getElementById('newSubjectForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let subjectName = document.getElementById('subjectName').value;
    let subjectImageFile = document.getElementById('subjectImageFile').files[0];
    let subjectImageUrl = document.getElementById('subjectImageUrl').value;
    let subjectCourses = document.getElementById('subjectCourses').value;

    if (subjectImageFile) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let subjectImage = e.target.result;
            addNewSubject(subjectName, subjectImage, subjectCourses);
        };
        reader.readAsDataURL(subjectImageFile);
    } else if (subjectImageUrl) {
        addNewSubject(subjectName, subjectImageUrl, subjectCourses);
    } else {
        alert("Por favor, forneça uma imagem ou um link para a imagem.");
    }
});

function addNewSubject(name, image, courses) {
    // Adiciona novo item ao slider
    let newItem = document.createElement('div');
    newItem.classList.add('item');
    newItem.innerHTML = `
        <img src="${image}">
        <div class="content">
            <p>Encontre a sua monitoria</p>
            <a href="../${name.toLowerCase()}/${name.toLowerCase()}.html"> 
                <h2>${name}</h2>
            </a> 
            <p>
                Cursos sugeridos: ${courses}.
            </p>
        </div>
    `;
    document.querySelector('.slider .list').appendChild(newItem);

    // Adiciona novo item à thumbnail
    let newThumbnail = document.createElement('div');
    newThumbnail.classList.add('item');
    newThumbnail.innerHTML = `
        <img src="${image}">
        <div class="content">
            TutorTime - IFSP Jacareí
        </div>
    `;
    document.querySelector('.thumbnail').appendChild(newThumbnail);

    // Cria nova página HTML
    createNewSubjectPage(name, image, courses);

    // Atualiza contagem de itens
    items = document.querySelectorAll('.slider .list .item');
    thumbnails = document.querySelectorAll('.thumbnail .item');
    countItem = items.length;
}

function createNewSubjectPage(name, image, courses) {
    let newPageContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - TutorTime</title>
    <link rel="stylesheet" href="../style.css">
</head>
<body>
    <header>
        <div class="logo">TutorTime - IFSP</div>
        <ul class="menu">
            <a href="../index.html">
                <li>Home</li>
            </a>
            <a href="../about.html">
                <li>About</li>
            </a>
        </ul>
    </header>
    <div class="content">
        <h1>${name}</h1>
        <img src="${image}" alt="${name}">
        <p>Cursos sugeridos: ${courses}</p>
    </div>
</body>
</html>
    `;

    // Salva a nova página (simulação)
    console.log(`Nova página criada para ${name}:`, newPageContent);
}

document.getElementById('toggleFormButton').addEventListener('click', function() {
    let form = document.getElementById('newSubjectForm');
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
});
