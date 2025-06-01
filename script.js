let tasks = [];

function addTask() {
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();

  if (!title || !description) {
    alert('Please fill out all fields');
    return;
  }

  const task = {
    id: Date.now(),
    title,
    description,
    completed: false,
    timestamp: new Date().toLocaleString()
  };

  tasks.push(task);
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  renderTasks();
}

function renderTasks() {
  const pendingContainer = document.getElementById('pendingTasks');
  const completedContainer = document.getElementById('completedTasks');
  pendingContainer.innerHTML = '';
  completedContainer.innerHTML = '';

  tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    taskDiv.innerHTML = `
      <div>
        <strong>${task.title}</strong><br/>
        ${task.description}<br/>
        <small>${task.timestamp}</small>
      </div>
      <div>
        <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="deleteTask(${task.id})" style="background:red; color:white;">X</button>
      </div>
    `;

    if (task.completed) {
      completedContainer.appendChild(taskDiv);
    } else {
      pendingContainer.appendChild(taskDiv);
    }
  });
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed, timestamp: new Date().toLocaleString() } : task
  );
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newTitle = prompt('Edit Title:', task.title);
  const newDesc = prompt('Edit Description:', task.description);
  if (newTitle && newDesc) {
    task.title = newTitle;
    task.description = newDesc;
    task.timestamp = new Date().toLocaleString();
    renderTasks();
  }
}