const lessonsList = [{
        name: 'Волейбол',
        start: '12:30',
        maxNumOfParticipant: 12,
        currentNumOfParticipant: 8
    },
    {
        name: 'Футбол',
        start: '14:00',
        maxNumOfParticipant: 12,
        currentNumOfParticipant: 10
    },
    {
        name: 'Большой теннис',
        start: '16:30',
        maxNumOfParticipant: 2,
        currentNumOfParticipant: 1
    },
    {
        name: 'Плавание',
        start: '19:00',
        maxNumOfParticipant: 10,
        currentNumOfParticipant: 8
    }
]


lessonsList.forEach(lesson =>{
    const lessonItem = createLesson(lesson.name, lesson.start, lesson.maxNumOfParticipant, lesson.currentNumOfParticipant);
    document.getElementById('lessons').append(lessonItem);
})


function createLesson(name, start, maxNumOfParticipant, currentNumOfParticipant) {
    const lessonItem = document.createElement('div');
    lessonItem.className='lessonsItem card col-sm-6';

    const lessonTitle = document.createElement('h2');
    lessonTitle.className='lessonTitle';
    lessonTitle.textContent = name;

    const lessonStart = document.createElement('p');
    lessonStart.className='lessonStart';
    lessonStart.textContent = `Начало занятия: ${start}`;

    const lessonMaxNumOfParticipant = document.createElement('p');
    lessonMaxNumOfParticipant.className='lessonMaxNumOfParticipant';
    lessonMaxNumOfParticipant.textContent = `Максимальное количество участников: ${maxNumOfParticipant}`;
    lessonMaxNumOfParticipant.value=maxNumOfParticipant;


    const lessonCurrentNumOfParticipant = document.createElement('p');
    lessonCurrentNumOfParticipant.className='lessonCurrentNumOfParticipant';
    lessonCurrentNumOfParticipant.textContent = `Записалось: ${currentNumOfParticipant}`;
    lessonCurrentNumOfParticipant.value=currentNumOfParticipant;

    const signButton = document.createElement('button');
    signButton.className='signButton btn btn-primary';
    signButton.textContent = 'Записаться';

    const cancelButton = document.createElement('button');
    cancelButton.className='cancelButton btn btn-danger';
    cancelButton.textContent = 'Отменить запись';

    lessonItem.append(lessonTitle);
    lessonItem.append(lessonStart);
    lessonItem.append(lessonMaxNumOfParticipant);
    lessonItem.append(lessonCurrentNumOfParticipant);
    lessonItem.append(signButton);
    lessonItem.append(cancelButton);

    return lessonItem;
}

document.getElementById('lessons').addEventListener('click', function (e) {
    const lessonItem = e.target.closest('div');
    const name = lessonItem.querySelector('.lessonTitle').value; //записываем название занятия
    const maxNumOfParticipant = lessonItem.querySelector('.lessonMaxNumOfParticipant');
    let currentNumOfParticipant = lessonItem.querySelector('.lessonCurrentNumOfParticipant');
    const signButton = lessonItem.querySelector('.signButton');
    const cancelButton = lessonItem.querySelector('.cancelButton');
    
    if (e.target.textContent==='Записаться'){
        currentNumOfParticipant.value++;
        currentNumOfParticipant.textContent = `Записалось: ${currentNumOfParticipant.value}`;
        if (cancelButton.getAttribute('disabled')=='true'){
             cancelButton.removeAttribute('disabled');       
        }
        if (currentNumOfParticipant.value===maxNumOfParticipant.value){
            e.target.setAttribute('disabled', true);
        }
    }

    if (e.target.textContent==='Отменить запись'){
        currentNumOfParticipant.value--;
        currentNumOfParticipant.textContent = `Записалось: ${currentNumOfParticipant.value}`;
        e.target.removeAttribute('disabled');
        if (signButton.getAttribute('disabled')=='true'){
             signButton.removeAttribute('disabled');       
        }
        if (currentNumOfParticipant.value==0){
            e.target.setAttribute('disabled', true);
        }
    }

})

