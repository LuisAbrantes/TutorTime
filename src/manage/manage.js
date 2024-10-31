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
    let responsibleTeacher = document.getElementById('responsibleTeacher').value;
    let responsibleMonitor = document.getElementById('responsibleMonitor').value;
    let monitoringDaysTimes = document.getElementById('monitoringDaysTimes').value;
    let roomAccessLink = document.getElementById('roomAccessLink').value;

    if (subjectImageFile) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let subjectImage = e.target.result;
            addSubject(subjectName, subjectImage, subjectCourses, responsibleTeacher, responsibleMonitor, monitoringDaysTimes, roomAccessLink);
        };
        reader.readAsDataURL(subjectImageFile);
    } else if (subjectImageUrl) {
        addSubject(subjectName, subjectImageUrl, subjectCourses, responsibleTeacher, responsibleMonitor, monitoringDaysTimes, roomAccessLink);
    } else {
        alert("Por favor, forneça uma imagem ou um link para a imagem.");
    }
});

function addSubject(name, image, courses, teacher, monitor, daysTimes, roomLink) {
    let subjectList = document.getElementById('subjectList');
    let subjectItem = document.createElement('div');
    subjectItem.classList.add('subject-item');
    subjectItem.innerHTML = `
        <img src="${image}" alt="${name}">
        <h2>${name}</h2>
        <p>Cursos sugeridos: ${courses}</p>
        <p>Professor Responsável: ${teacher}</p>
        <p>Monitor Responsável: ${monitor}</p>
        <p>Dias e Horários da Monitoria: ${daysTimes}</p>
        <p>Sala/Link de Acesso: ${roomLink}</p>
        <button class="edit">Editar</button>
        <button class="delete">Remover</button>
    `;
    subjectList.appendChild(subjectItem);

    // Adiciona eventos de edição e remoção
    subjectItem.querySelector('.edit').addEventListener('click', () => editSubject(subjectItem));
    subjectItem.querySelector('.delete').addEventListener('click', () => removeSubject(subjectItem));
}

function editSubject(subjectItem) {
    let name = subjectItem.querySelector('h2').innerText;
    let courses = subjectItem.querySelector('p:nth-child(3)').innerText.replace('Cursos sugeridos: ', '');
    let teacher = subjectItem.querySelector('p:nth-child(4)').innerText.replace('Professor Responsável: ', '');
    let monitor = subjectItem.querySelector('p:nth-child(5)').innerText.replace('Monitor Responsável: ', '');
    let daysTimes = subjectItem.querySelector('p:nth-child(6)').innerText.replace('Dias e Horários da Monitoria: ', '');
    let roomLink = subjectItem.querySelector('p:nth-child(7)').innerText.replace('Sala/Link de Acesso: ', '');

    document.getElementById('subjectName').value = name;
    document.getElementById('subjectCourses').value = courses;
    document.getElementById('responsibleTeacher').value = teacher;
    document.getElementById('responsibleMonitor').value = monitor;
    document.getElementById('monitoringDaysTimes').value = daysTimes;
    document.getElementById('roomAccessLink').value = roomLink;

    let form = document.getElementById('newSubjectForm');
    form.style.display = 'block';

    subjectItem.remove();
}

function removeSubject(subjectItem) {
    subjectItem.remove();
}
