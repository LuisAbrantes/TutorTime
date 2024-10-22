document.getElementById('toggleFormButton').addEventListener('click', function() {
    let form = document.getElementById('newSubjectForm');
    form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
});

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
            addSubject(subjectName, subjectImage, subjectCourses);
        };
        reader.readAsDataURL(subjectImageFile);
    } else if (subjectImageUrl) {
        addSubject(subjectName, subjectImageUrl, subjectCourses);
    } else {
        alert("Por favor, forneça uma imagem ou um link para a imagem.");
    }
});

function addSubject(name, image, courses) {
    let subjectList = document.getElementById('subjectList');
    let subjectItem = document.createElement('div');
    subjectItem.classList.add('subject-item');
    subjectItem.innerHTML = `
        <img src="${image}" alt="${name}">
        <h2>${name}</h2>
        <p>Cursos sugeridos: ${courses}</p>
        <button class="edit">Editar</button>
        <button class="delete">Remover</button>
    `;
    subjectList.appendChild(subjectItem);

    // Adiciona eventos de edição e remoção
    subjectItem.querySelector('.edit').addEventListener('click', () => editSubject(subjectItem));
    subjectItem.querySelector('.delete').addEventListener('click', () => removeSubject(subjectItem));
}

function editSubject(subjectItem) {
    // Implementar lógica de edição
    alert('Função de edição ainda não implementada.');
}

function removeSubject(subjectItem) {
    subjectItem.remove();
}
