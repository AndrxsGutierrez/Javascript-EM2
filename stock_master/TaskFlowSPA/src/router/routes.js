import { renderHome, setupHome } from "../views/home.js";
import { renderLogin, setupLogin } from "../views/auth/login.js";
import { renderNotFound } from "../views/auth/not-found.js";
import { renderRegister, setupRegister } from "../views/auth/register.js";
import { renderTaskForm, setupTaskForm } from "../views/tasks/task-form.js";
import { renderTasks, setupTasks } from "../views/tasks/tasks.js";
import { renderAdmin, setupAdmin } from "../views/users/admin.js";
import { renderDashboard, setupDashboard } from "../views/users/dashboard.js";
import { renderProfile, setupProfile } from "../views/users/profile.js";

// Cada ruta puede declarar flags que el router interpreta como guards:
// requiresAuth, redirectIfAuthenticated, allowedRoles.
// render devuelve HTML; setup enlaza eventos después de insertarlo en el DOM.
export const routes = {
  "/": {
    render: renderHome,
    setup: setupHome,
  },
  "/login": {   
    render: renderLogin,
    setup: setupLogin,
    requiresAuth: false,
    redirectIfAuthenticated: true,
  },
  "/register": {
    render: renderRegister,
    setup: setupRegister,
    requiresAuth: false,
    redirectIfAuthenticated: true
  },
  "/task-form": {
    render: renderTaskForm,
    setup: setupTaskForm,
    requiresAuth: true,
  },
  "/tasks": {
    render: renderTasks,
    setup: setupTasks,
    requiresAuth: true,
  },
  "/dashboard": {
    render: renderDashboard,
    setup: setupDashboard,
    requiresAuth: true,
  },
  "/profile": {
    render: renderProfile,
    setup: setupProfile,
    requiresAuth: true,
  },
  "/admin": {
    render: renderAdmin,
    setup: setupAdmin,
    requiresAuth: true,
    allowedRoles: ["ADMIN"]
  },
};

export const notFoundView = renderNotFound
