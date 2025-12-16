const courses = [
  "HTML Fundamentals",
  "CSS Fundamentals",
  "JavaScript Basics",
  "Advanced JavaScript",
  "React JS",
  "Core Java",
  "Advanced Java",
  "Python Programming",
  "C Programming",
  "C++ Programming",
  "SQL & Database Fundamentals",
  "MySQL",
  "Data Structures & Algorithms",
  "Git & GitHub",
  "Web Development Bootcamp",
  "Django Basics",
  "Node.js Fundamentals",
  "REST API Development",
  "Software Testing Basics",
  "Cloud Computing Fundamentals",
];

const eventsList = [
  "HTML Basics Quiz (HTML Fundamentals)",
  "CSS Styling Quiz",
  "JavaScript Beginner Quiz",
  "JS Advanced Concepts Quiz",
  "Java Fundamentals Quiz",
  "Python Basics Quiz",
  "SQL Queries Quiz (SQL & Database Fundamentals)",
  "DSA Logic Quiz (Data Structures & Algorithms)",
  "React Components Quiz (React JS)",
  "Version Control Quiz (Git & GitHub)",
];

const liveClasses = [
  { title: "UI/UX Live Jam", time: "Today · 10:00 AM", instructor: "Ava Lee" },
  { title: "React Components Deep Dive", time: "Today · 1:00 PM", instructor: "Noah Kim" },
  { title: "SQL Query Lab", time: "Tomorrow · 9:30 AM", instructor: "Ethan Cruz" },
];

const recordedClasses = [
  { title: "HTML & CSS Essentials Replay", duration: "42m", instructor: "Maya Patel" },
  { title: "JavaScript Async Patterns", duration: "55m", instructor: "Rahul Sharma" },
  { title: "DSA: Arrays & Hashing", duration: "48m", instructor: "Liam Wong" },
  { title: "Git Branching Workshop", duration: "36m", instructor: "Chloe Diaz" },
];

const courseColors = [
  "linear-gradient(135deg, #8ec5fc 0%, #e0c3fc 100%)",
  "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
  "linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
  "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
  "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
];

const eventColors = [
  "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
  "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #8ec5fc 0%, #e0c3fc 100%)",
];

const sections = {
  dashboard: document.querySelectorAll("#dashboard-section, .stats, .continue"),
  courses: document.querySelectorAll("#courses-section"),
  events: document.querySelectorAll("#events-section"),
  class: document.querySelectorAll("#class-section"),
  explore: document.querySelectorAll("#explore-section"),
  reports: document.querySelectorAll("#reports-section"),
};

function animateCount(el, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();
  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 2); // ease-out for visible steps
    const value = Math.floor(eased * (target - start) + start);
    el.textContent = value;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function showSection(key) {
  Object.values(sections).forEach((nodeList) =>
    nodeList.forEach((node) => node.classList.add("hidden"))
  );

  const targets = sections[key];
  if (targets) {
    targets.forEach((node) => node.classList.remove("hidden"));
  }
}

document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".menu-item").forEach((btn) => btn.classList.remove("active"));
    item.classList.add("active");

    const target = item.getAttribute("data-section");
    showSection(target || "dashboard");
  });
});

document.querySelectorAll(".calendar-day").forEach((day) => {
  day.addEventListener("click", () => {
    document.querySelectorAll(".calendar-day").forEach((d) => d.classList.remove("active"));
    day.classList.add("active");
  });
});

document.querySelectorAll("[data-quest]").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.textContent = "Claimed";
    btn.disabled = true;
    btn.classList.add("neutral");
  });
});

// Render feather icons once DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("course-list");
  if (list) {
    list.innerHTML = courses
      .map(
        (name, idx) => {
          const color = courseColors[idx % courseColors.length];
          return `<li class="course-card" style="background:${color}"><span class="title">${idx + 1}. ${name}</span><span class="tag">Course</span></li>`;
        }
      )
      .join("");
  }

  const eventListEl = document.getElementById("event-list");
  if (eventListEl) {
    eventListEl.innerHTML = eventsList
      .map((name, idx) => {
        const color = eventColors[idx % eventColors.length];
        return `<li class="event-card" style="background:${color}"><div class="icon"><i data-feather="calendar"></i></div><div><div class="title">${name}</div><div class="tag">Quiz</div></div></li>`;
      })
      .join("");
  }

  const liveList = document.getElementById("live-class-list");
  if (liveList) {
    liveList.innerHTML = liveClasses
      .map(
        (item) =>
          `<li><div><div class="title">${item.title}</div><div class="meta">${item.time} · ${item.instructor}</div></div><span class="pill success">Live</span></li>`
      )
      .join("");
  }

  const recordedList = document.getElementById("recorded-class-list");
  if (recordedList) {
    recordedList.innerHTML = recordedClasses
      .map(
        (item) =>
          `<li><div><div class="title">${item.title}</div><div class="meta">${item.duration} · ${item.instructor}</div></div><span class="pill neutral">Replay</span></li>`
      )
      .join("");
  }

  const pointsEl = document.getElementById("points-earned");
  if (pointsEl) {
    const target = Number(pointsEl.dataset.target || 0);
    animateCount(pointsEl, target, 1400);
  }

  // Reports animations
  const reportProgressBar = document.getElementById("report-progress-bar");
  const reportProgressLabel = document.getElementById("report-progress-label");
  const reportProgressMeta = document.getElementById("report-progress-meta");
  const weeklyBars = document.getElementById("weekly-bars");
  const donut = document.getElementById("donut-chart");

  if (reportProgressBar && reportProgressLabel && reportProgressMeta) {
    const completed = 7;
    const total = 10;
    const percent = Math.round((completed / total) * 100);
    reportProgressMeta.textContent = `${completed}/${total}`;
    reportProgressBar.style.width = `${percent}%`;
    reportProgressLabel.textContent = `${percent}%`;
  }

  if (weeklyBars) {
    const hours = [2, 3, 1.5, 4, 2.5, 3.5, 5];
    weeklyBars.innerHTML = hours
      .map((h) => `<div class="mini-bar" style="height:${h * 16}px"></div>`)
      .join("");
  }

  if (donut) {
    const segments = [
      { selector: ".seg-a", start: 0, value: 40 },
      { selector: ".seg-b", start: 40, value: 35 },
      { selector: ".seg-c", start: 75, value: 25 },
    ];
    segments.forEach(({ selector, start, value }) => {
      const el = donut.querySelector(selector);
      if (!el) return;
      const dash = `${value} ${100 - value}`;
      el.style.strokeDasharray = dash;
      el.style.strokeDashoffset = -start;
    });
  }

  if (window.feather) {
    window.feather.replace({ width: 18, height: 18 });
  }
});

