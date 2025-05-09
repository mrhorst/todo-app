# 📝 Todo App

A clean and minimal Todo app for managing projects and tasks. Built with modular JavaScript and styled with Tailwind CSS.

## ✨ Features

- Create, edit, and delete projects
- Add, edit, and remove todos per project
- Edit todo details (title, description, due date)
- Mark todos as complete/incomplete
- Persistent data via `localStorage`
- ~~Support for subtasks within todos~~ (coming soon)

## 🧩 Project Structure

```
/js/
├── app.js # Entry point, initializes app
├── ui.js # UI rendering and event wiring
├── projectsController.js # Project logic and state
├── todosController.js # Todo logic and actions
├── projectsListeners.js # Project-related listeners
├── todosListeners.js # Todo-related listeners
├── DOMhelpers.js # Element creation & rendering helpers
├── modal.js # Edit modal logic
└── state.js # Active project state manager
```

## 🚀 Getting Started

1. Clone this repository
2. Open `index.html` in your browser

No build step needed — just pure HTML, JS, and Tailwind via CDN.

## 🔗 Live Demo

[Check out the live app here](https://your-username.github.io/todo-app/)

## 🛠️ Technologies Used

- JavaScript (ES6+)
- Tailwind CSS (via CDN)
- HTML5

## 📄 License

Licensed under the MIT License.
