import axios from 'axios';

console.log('Ready for coding');
type TODO = {
  id: number;
  name: string;
  description: string;
}

function generateCards(res: TODO[]) {
  const cardContainer = document.querySelector<HTMLDivElement | null>('#card-container');
  res.forEach((task) => {
    const card = document.createElement('article');
    card.classList.add('taskCard__Wrapper');
    card.innerHTML = `
            <div class="card-wrapper">
                <div class="section image-section">
                    <figure class="image card__image">
                        <img  src="/assets/images/unsplash-o.jpg">
                    </figure>
                </div>
                <div class="task-content">
                    <div class="section heading-section">
                        <h2>${task.name}</h2>
                    </div>
                    <div class="section description-section">
                        <p>Description: ${task.description}</p>
                    </div>
                    <div class="section btn-section">
                        <div class="btn-section__edit action-btn">
                            <button class="edit-task" id= "edit-${task.id}">Edit task</button>
                        </div>
                        <div class="btn-section__delete action-btn">
                            <button class="delete-task" id= "${task.id}">Delete task</button>
                        </div> 
                    </div>
                    <div class="section edit-form-section-${task.id} d-none">
                            <input class="input" id="edit-task-name-${task.id}" type="text" placeholder="Edit task name" required>
                            <div class="validation-error" id="msg3"></div>
                            <textarea class="textarea" id="edit-task-description-${task.id}" placeholder="Edit task description" required></textarea>
                            <div class="validation-error" id="msg4"></div>
                            <input class="button edit-new-task" id="edit-task-submit-${task.id}" type="submit" value="Update task">
                            </div>
                    </div>
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

  res.forEach((task) => {
    const editTaskButton = document.getElementById(`edit-${task.id}`);
    const editTaskSubmitButton = document.getElementById(`edit-task-submit-${task.id}`);
    const editTaskName = document.querySelector<HTMLFormElement | null>(`#edit-task-name-${task.id}`);
    const editTaskDescription = document.querySelector<HTMLFormElement | null>(`#edit-task-description-${task.id}`);
    const editForm = document.querySelector<HTMLDivElement | null>(`.edit-form-section-${task.id}`);
    const msg3 = document.getElementById('msg3');
    const msg4 = document.getElementById('msg4');
    const showAndHide = () => {
      if (editForm.classList.contains('d-none')) {
        editForm.classList.remove('d-none');
      } else {
        editForm.classList.add('d-none');
      }
    };
    editTaskButton.addEventListener('click', () => {
      showAndHide();
    });
    editTaskSubmitButton.addEventListener('click', () => {
      console.log(editTaskName.value);
      console.log(editTaskDescription.value);
      if (editTaskName.value === '') {
        msg3.innerHTML = 'Task cannot be blank';
      } else if (editTaskDescription.value === '') {
        msg4.innerHTML = 'Task cannot be blank';
      } else {
        axios.put<TODO>(`http://localhost:3004/Funny_TO_DO/${task.id}`, {
          name: editTaskName.value,
          description: editTaskDescription.value,
        });
        window.location.reload();
      }
    });
  });
}

// šī koda daļa saņem DATA no API un tad nosūta to funkcijai, kas izveido kartiņas
axios.get<TODO[]>('http://localhost:3004/Funny_TO_DO')
  .then(({ data }) => {
    generateCards(data);
  });

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
