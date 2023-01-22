import axios from 'axios';

console.log('Ready for coding');
type TODO = {
  id: number;
  name: string;
  description: string;
}
// function, that generates cards for things to do
function generateCards(res: TODO[]) {
  const cardContainer = document.querySelector<HTMLDivElement | null>('#card-container');
  res.forEach((task) => {
    const card = document.createElement('article');
    card.classList.add('taskCard__Wrapper');
    card.innerHTML = `
            <div class="characterCard__ContentWrapper card-wrapper">
            <div class="section image-section">
                <figure class="image is-128x128">
                    <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
                </figure>
            </div>
            <div class="section heading-section">
              <h2>${task.name}</h2>
            </div>
            <div class="section description-section">
              <p>Description: ${task.description}</p>
            </div>
            <div class="section btn-section">
                <div class="btn-section__edit action-btn">
                    <button class="edit-task">Edit task</button>
                    </div>
                <div class="btn-section__delete action-btn">
                    <button class="delete-task" id= "${task.id}">Delete task</button>
                </div>
            </div>
            <div class="section form-section">
          </div>
          </article>`;
    ///
    cardContainer.appendChild(card);
  });

  

  res.forEach((task) => {
    const deleteTaskButton = document.getElementById(`${task.id}`);
    deleteTaskButton.addEventListener('click', () => {
      console.log(task.id);
      axios.delete<TODO>(`http://localhost:3004/Funny_TO_DO/${task.id}`);
      window.location.reload();
    });
  });

//   const editTaskButtons = document.querySelectorAll<HTMLButtonElement | null>('.edit-task');
//   const TaskHeaders = document.querySelectorAll<HTMLHeadingElement | null>('h2');
//   res.forEach((task) => {
//     editTaskButtons[task.id].addEventListener('click', () => {
//       TaskHeaders[task.id].innerHTML = 'book';
//       axios.put<TODO>(`http://localhost:3004/Funny_TO_DO/${task.id}`, {
//         name: 'Elephant',
//         description: 'Hello',
//       });
//       window.location.reload();
//     });
//   });
}

// šī koda daļa saņem DATA no API un tad nosūta to funkcijai, kas izveido kartiņas
axios.get<TODO[]>('http://localhost:3004/Funny_TO_DO')
  .then(({ data }) => {
    generateCards(data);
  });

// šī koda daļa saņem informāciju no form un tad  izveido kartiņas
const addNewTaskHeading = document.querySelector<HTMLFormElement | null>('.input');
const addNewTaskDescription = document.querySelector<HTMLFormElement | null>('.textarea');
const addNewTaskButton = document.querySelector<HTMLButtonElement | null>('.add-new-task');
const msg1 = document.getElementById('msg1');
const msg2 = document.getElementById('msg2');

addNewTaskButton.addEventListener('click', () => {
  // formValidation();
  if (addNewTaskHeading.value === '') {
    msg1.innerHTML = 'Task cannot be blank';
  } else if (addNewTaskDescription.value === '') {
    msg2.innerHTML = 'Task cannot be blank';
  } else {
    console.log('success');
    msg1.innerHTML = '';
    msg2.innerHTML = '';
    axios.post<TODO>('http://localhost:3004/Funny_TO_DO', {
      name: addNewTaskHeading.value,
      description: addNewTaskDescription.value,
    });
    window.location.reload();
  }
});
// const addAnimalsWrapper = document.querySelector('.js-add-to-do-task');
// const addAnimalsButton = addAnimalsWrapper.querySelector('button');
// const addAnimalsPre = addAnimalsWrapper.querySelector('pre');

// addAnimalsButton.addEventListener('click', () => {
//   axios.post<TODO>('http://localhost:3004/Funny_TO_DO', {
//     name: 'Elephantos',
//     description: 'kiss an elephant',
//   }).then(({ data }) => {
//     addAnimalsPre.innerHTML = JSON.stringify(data);
//   });
// });
