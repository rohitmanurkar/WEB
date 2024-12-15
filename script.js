document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        updateChart();
    });

    // Activity Chart
    let activityChart;

    function updateChart() {
        const ctx = document.getElementById('activityChart').getContext('2d');
        const isDarkTheme = body.classList.contains('dark-theme');

        if (activityChart) {
            activityChart.destroy();
        }

        activityChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Steps',
                    data: [7000, 8000, 7500, 9000, 8500, 10000, 8745],
                    borderColor: '#4cc9f0',
                    tension: 0.4
                }, {
                    label: 'Calories',
                    data: [500, 600, 550, 700, 650, 800, 700],
                    borderColor: '#4ade80',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            color: isDarkTheme ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
                        }
                    },
                    x: {
                        grid: {
                            color: isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            color: isDarkTheme ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
                        }
                    }
                }
            }
        });
    }

    updateChart();

    // Animate count-up for steps and calories
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const stepsElement = document.getElementById('steps');
    const caloriesElement = document.getElementById('calories');
    animateValue(stepsElement, 0, 8745, 2000);
    animateValue(caloriesElement, 0, 700, 2000);

    // Calendar
    const calendar = document.getElementById('calendar');
    const daysInMonth = 30; // Assuming November

    function getRandomActivityLevel() {
        const levels = ['inactive', 'low', 'medium', 'high'];
        return levels[Math.floor(Math.random() * levels.length)];
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.classList.add('calendar-day');
        day.textContent = i;

        const activityLevel = getRandomActivityLevel();
        day.classList.add(activityLevel);

        day.addEventListener('mouseenter', () => {
            day.style.transform = 'scale(1.1)';
            day.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
        });

        day.addEventListener('mouseleave', () => {
            day.style.transform = 'scale(1)';
            day.style.boxShadow = 'none';
        });

        calendar.appendChild(day);
    }

    // Animate calendar days
    const calendarDays = document.querySelectorAll('.calendar-day');
    calendarDays.forEach((day, index) => {
        setTimeout(() => {
            day.classList.add('show');
        }, index * 20);
    });

    // Sleep progress ring
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    const sleepPercentage = (7.45 / 8) * 100;
    const offset = circumference - (sleepPercentage / 100 * circumference);

    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 500);

    // Animate sleep stats
    const sleepStats = document.querySelectorAll('.sleep-stat');
    sleepStats.forEach((stat, index) => {
        setTimeout(() => {
            stat.classList.add('show');
        }, 500 + index * 200);
    });

    // Animate weight loss progress bar
    const progressBar = document.querySelector('.progress');
    setTimeout(() => {
        progressBar.style.width = '80%';
    }, 500);

    // Animate diet items
    const dietItems = document.querySelectorAll('.diet-item');
    dietItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('show');
        }, 500 + index * 200);
    });

    // Activity list
    const activities = [
        { name: 'Running', time: '7:00 AM', participants: 2, type: 'friends' },
        { name: 'Gym', time: '8:00 PM', participants: 3, type: 'friends' },
        { name: 'Meditation', time: '10:30 PM', participants: 1, type: 'alone' },
        { name: 'Yoga', time: '6:00 AM', participants: 1, type: 'alone' },
        { name: 'Basketball', time: '4:00 PM', participants: 5, type: 'friends' },
        { name: 'Cycling', time: '5:30 PM', participants: 2, type: 'friends' }
    ];

    const activityList = document.getElementById('activityList');

    function renderActivities(filter = 'all') {
        activityList.innerHTML = '';
        activities.forEach((activity, index) => {
            if (filter === 'all' || activity.type === filter) {
                const activityItem = document.createElement('div');
                activityItem.classList.add('activity-item');
                activityItem.innerHTML = `
                    <h3>${activity.name}</h3>
                    <p>${activity.time}</p>
                    <p>${activity.type === 'friends' ? 'With friends' : 'Alone'}</p>
                    <div class="activity-participants">
                        ${Array(activity.participants).fill('👤').join('')}
                    </div>
                `;
                activityList.appendChild(activityItem);
                setTimeout(() => {
                    activityItem.classList.add('show');
                }, index * 100);
            }
        });
    }

    renderActivities();

    // Add "Add Activity" button
    const addActivityBtn = document.createElement('div');
    addActivityBtn.classList.add('activity-item', 'add-activity');
    addActivityBtn.innerHTML = `
        <span class="add-icon">+</span>
        <p>Add Activity</p>
    `;
    activityList.appendChild(addActivityBtn);
    setTimeout(() => {
        addActivityBtn.classList.add('show');
    }, activities.length * 100);

    // Filter buttons functionality
    const filterButtons = document.querySelectorAll('.btn-filter');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderActivities(button.dataset.filter);
        });
    });

    // Animate elements on load
    const animateElements = document.querySelectorAll('.animate-in');
    animateElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

