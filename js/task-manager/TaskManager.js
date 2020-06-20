import { addTaskFormComponent } from "./addTaskFormComponent.js";
import { todayActivityComponent } from "./todayActivityComponent.js";
import { getDateTime, getDate, formatMinutes } from "./utils.js";
import { Task } from "./Task_module.js";
import { TaskPage } from "./TaskPage_module.js";

export function TaskManager(username) {
  this.username = username;

  this.init();
}
TaskManager.prototype = (function () {
  let tasks = [];
  let currentTask;
  let taskPage;
  let username;

  const DOM = {
    taskForm: document.getElementById("js-task-add"),
    taskList: document.getElementById("js-task-list"),
    taskPageContainer: document.getElementById("js-taskpage"),
    btnActivity: document.getElementById("js-btn-activity"),
    todayActivity: document.getElementById("js-today-activity"),
  };

  function getAllTaks() {
    tasks = JSON.parse(localStorage.getItem(username)) || [];
    tasks = tasks.map((item) => {
      return new Task(item);
    });
    tasks = tasks.sort((a, b) => {
      return a.id * 1 < b.id * 1 ? 1 : -1;
    });
    return tasks;
  }

  function addTask(task) {
    tasks.unshift(task);
    localStorage.setItem(username, JSON.stringify(tasks));
  }

  function getTask(id) {
    return tasks.find((item) => {
      return item.id === id;
    });
  }

  function updateTask(task) {
    for (let index in tasks) {
      if (tasks[index].id === task.id) {
        tasks[index] = task;
        break;
      }
    }
    localStorage.setItem(username, JSON.stringify(tasks));
  }

  function deleteTask(id) {
    tasks = tasks.filter((item) => {
      return item.id !== id;
    });
    localStorage.setItem(username, JSON.stringify(tasks));
  }

  function getCurrentTask() {
    return currentTask;
  }

  function getTodayActivity() {
    return tasks
      .map((task) => {
        let task_total_today = task.sessions.reduce((acc, curr) => {
          if (getDate(curr.date) === getDate(Date.now())) {
            return acc + curr.time;
          } else {
            return acc;
          }
        }, 0);

        task.task_total_today = task_total_today;

        return task;
      })
      .filter((task) => {
        return task.task_total_today !== 0;
      });
  }

  function addTaskHandler(formEl) {
    if (!formEl["task-title"].value) {
      return false;
    }

    let newTask = new Task({ title: formEl["task-title"].value });

    addTask(newTask);

    DOM.taskList.insertBefore(
      newTask.render(openTaskPageHandler),
      DOM.taskList.firstChild
    );

    formEl.reset();
  }

  function openTaskPageHandler(task) {
    currentTask = task;
    taskPage = new TaskPage();

    DOM.taskPageContainer.innerHTML = "";
    DOM.taskPageContainer.appendChild(
      taskPage.render(
        currentTask,
        completeHandler,
        deleteHandler,
        closeHandler,
        updateTitleHandler,
        updateDescHandler,
        setTimeLimitHandler,
        addSessionHandler,
        deleteSessionHandler,
        openPanelOnMobile
      )
    );
    DOM.taskPageContainer.classList.add("modal--visible");
    DOM.taskPageContainer.focus();

    document.getElementsByTagName("body")[0].classList.add("js-modal");
  }

  function completeHandler() {
    if (!currentTask.isCompleted()) {
      currentTask.status = "completed";
      currentTask.date_completed = getDateTime();
    } else {
      currentTask.status = "in progress";
      currentTask.date_completed = "";
    }

    updateTask(currentTask);

    currentTask.updateDOM(openTaskPageHandler);

    taskPage.updateDOMpage(
      currentTask,
      completeHandler,
      deleteHandler,
      closeHandler,
      updateTitleHandler,
      updateDescHandler,
      setTimeLimitHandler,
      addSessionHandler,
      deleteSessionHandler,
      openPanelOnMobile
    );
  }

  function deleteHandler() {
    let confirmation = confirm("Are you sure you want to delete this task?");
    if (confirmation) {
      DOM.taskPageContainer.innerHTML = "";
      document.getElementsByTagName("body")[0].classList.remove("js-modal");
      DOM.taskPageContainer.classList.remove("modal--visible");

      if (currentTask.DOMNode.nextElementSibling) {
        currentTask.DOMNode.nextElementSibling.focus();
      } else if (currentTask.DOMNode.previousElementSibling) {
        currentTask.DOMNode.previousElementSibling.focus();
      }

      currentTask.DOMNode.outerHTML = "";
      deleteTask(currentTask.id);
      currentTask = null;
    }
  }

  function closeHandler() {
    DOM.taskPageContainer.innerHTML = "";
    DOM.taskPageContainer.classList.remove("modal--visible");
    document.getElementsByTagName("body")[0].classList.remove("js-modal");
    currentTask.DOMNode.focus();
  }

  function updateTitleHandler(formEl) {
    let val = formEl["editValue"].value;

    if (!val) {
      val = currentTask.title;
    }

    currentTask.title = val;
    updateTask(currentTask);

    currentTask.updateDOM(openTaskPageHandler);
    taskPage.updateDOMtitle(currentTask, updateTitleHandler);
  }

  function updateDescHandler(formEl) {
    let val = formEl["editValue"].value;

    currentTask.description = formEl["editValue"].value;

    updateTask(currentTask);

    taskPage.updateDOMdesc(currentTask, updateDescHandler);
  }

  function setTimeLimitHandler(formEl) {
    let minutes = formEl["hours"].value * 60 + formEl["minutes"].value * 1;

    if (!minutes || minutes > 59999 || minutes <= 0) {
      formEl.reset();
      return false;
    }

    currentTask.time_limit = minutes;
    updateTask(currentTask);

    currentTask.updateDOM(openTaskPageHandler);
    taskPage.updateDOMsetTimeLimit(currentTask);
    taskPage.updateDOMtimeTotal(currentTask);
  }

  function addSessionHandler(formEl) {
    let minutes = formEl["hours"].value * 60 + formEl["minutes"].value * 1;

    if (minutes <= 0) {
      return;
    }

    let session = {
      id: Date.now() + Math.random(),
      time: minutes,
      date: getDateTime(),
    };

    currentTask.sessions.push(session);
    updateTask(currentTask);

    currentTask.updateDOM(openTaskPageHandler);

    taskPage.updateDOMsessions(currentTask, deleteSessionHandler);
    taskPage.updateDOMtimeTotal(currentTask);

    formEl.reset();
  }

  function deleteSessionHandler(sessionEl) {
    let newSessions = currentTask.sessions.filter((item) => {
      return item.id !== sessionEl.id * 1;
    });

    currentTask.sessions = newSessions;

    updateTask(currentTask);
    currentTask.updateDOM(openTaskPageHandler);

    taskPage.updateDOMsessions(currentTask, deleteSessionHandler);
    taskPage.updateDOMtimeTotal(currentTask);
  }

  function openPanelOnMobile(btn) {
    if (btn.parentNode.querySelector(".mobile-tab-nav__btn--active")) {
      btn.parentNode
        .querySelector(".mobile-tab-nav__btn--active")
        .classList.remove("mobile-tab-nav__btn--active");
    }

    let panelToShow = btn.getAttribute("data-panel");
    btn.classList.add("mobile-tab-nav__btn--active");

    document
      .querySelector(".mobile-panel--visible")
      .classList.remove("mobile-panel--visible");
    document.getElementById(panelToShow).classList.add("mobile-panel--visible");
  }

  function init() {
    username = this.username;

    DOM.taskForm.appendChild(addTaskFormComponent(addTaskHandler));

    getAllTaks();

    let allTasksElem = tasks.reduce((acc, curr) => {
      acc.appendChild(curr.render(openTaskPageHandler));
      return acc;
    }, document.createDocumentFragment());

    DOM.taskList.appendChild(allTasksElem);

    DOM.btnActivity.addEventListener("click", function () {
      DOM.todayActivity.innerHTML = "";
      DOM.todayActivity.appendChild(
        todayActivityComponent(getTodayActivity(), openTaskPageHandler)
      );
    });
  }

  return {
    init: init,
  };
})();
