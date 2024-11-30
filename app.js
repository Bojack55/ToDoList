// Initialize an empty array to store projects
let projects = [];

// Function to render projects and their todos
function renderProjects() {
  const projectListContainer = document.getElementById('project-list');
  projectListContainer.innerHTML = ''; // Clear the list first

  projects.forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.classList.add('project-item');
    projectElement.textContent = project.name;

    // Add click event to show todos of the clicked project
    projectElement.addEventListener('click', () => {
      renderTodos(project.id);
    });

    projectListContainer.appendChild(projectElement);
  });
}

// Function to render todos of a specific project
function renderTodos(projectId) {
  const project = projects.find(p => p.id === projectId);
  const projectElement = document.getElementById('project-list');
  
  if (!project) return;

  const todosHtml = project.todos.map(todo => {
    return `
      <div class="todo-item ${todo.completed ? 'checked' : ''}" data-id="${todo.id}">
        <span>${todo.title}</span>
        <span>${todo.dueDate}</span>
        <button onclick="toggleTodoCompletion(${todo.id})">Complete</button>
      </div>
    `;
  }).join('');

  projectElement.innerHTML = `
    <h2>Todos for ${project.name}</h2>
    ${todosHtml}
  `;
}

// Add new project
document.getElementById('add-project').addEventListener('click', () => {
  const projectInput = document.getElementById('new-project');
  const projectName = projectInput.value.trim();

  if (projectName) {
    const newProject = {
      id: Date.now(),
      name: projectName,
      todos: []
    };

    projects.push(newProject);
    renderProjects();
    projectInput.value = ''; // Clear the input
  }
});

// Add new todo
document.getElementById('add-todo').addEventListener('click', () => {
  const title = document.getElementById('todo-title').value.trim();
  const description = document.getElementById('todo-description').value.trim();
  const dueDate = document.getElementById('todo-due-date').value;
  const projectId = projects[0]?.id; // Assuming the first project is selected for now

  if (title && projectId) {
    const newTodo = {
      id: Date.now(),
      title: title,
      description: description,
      dueDate: dueDate,
      completed: false
    };

    const project = projects.find(p => p.id === projectId);
    if (project) {
      project.todos.push(newTodo);
      renderTodos(project.id);
    }

    // Clear todo form inputs
    document.getElementById('todo-title').value = '';
    document.getElementById('todo-description').value = '';
    document.getElementById('todo-due-date').value = '';
  }
});

// Toggle todo completion
function toggleTodoCompletion(todoId) {
  const todo = projects.flatMap(project => project.todos).find(t => t.id === todoId);
  
  if (todo) {
    todo.completed = !todo.completed;
    renderProjects(); // Re-render the projects
  }
}

// Initial render of projects
renderProjects();
