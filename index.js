const form = document.querySelector('#eventForm');
        const titleInput = document.querySelector('#eventTitle');
        const dateInput = document.querySelector('#eventDate');
        const categoryInput = document.querySelector('#eventCategory');
        const descInput = document.querySelector('#eventDescription');
        const eventList = document.querySelector('#event-list');
        const clearBtn = document.querySelector('#clear-btn');
        const sampleBtn = document.querySelector('#add-sample-btn');

        let events = JSON.parse(localStorage.getItem('myEvents')) || [];

        renderEvents();

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const newEvent = {
                id: Date.now(),
                title: titleInput.value,
                date: dateInput.value,
                category: categoryInput.value,
                description: descInput.value
            };

            events.unshift(newEvent); 
            saveAndRender();
            form.reset();

        });

        eventList.addEventListener('click', (e) => {
            if (e.target.closest('.delete-btn')) {
                const idToDelete = Number(e.target.closest('.delete-btn').dataset.id);
                events = events.filter(ev => ev.id !== idToDelete);
                saveAndRender();
            }
        });

        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete all events?')) {
                events = [];
                saveAndRender();
            }
        });

        sampleBtn.addEventListener('click', () => {
            const samples = [
                {
                    id: Date.now() + 1,
                    title: "Tech Summit 2026",
                    date: "2026-02-11",
                    category: "conference",
                    description: "Annual gathering of tech enthusiasts discussing AI and Future Tech."
                },
                {
                    id: Date.now() + 2,
                    title: "React Workshop",
                    date: "2026-02-02",
                    category: "workshop",
                    description: "Hands-on session building modern web apps with React."
                },
                {
                    id: Date.now() + 3,
                    title: "Team Lunch",
                    date: "2026-02-12",
                    category: "social",
                    description: "Monthly team bonding event at the downtown bistro."
                }
            ];
            events = [...samples, ...events];
            saveAndRender();
        });
        function addSample() {
    clearEvents();
    createSample("Tech Conference", "2026-03-10", "Conference");
    createSample("Web Development Workshop", "2026-04-05", "Workshop");
}
function saveAndRender() {
            localStorage.setItem('myEvents', JSON.stringify(events));
            renderEvents();
        }

        function renderEvents() {
            eventList.innerHTML = '';

            if (events.length === 0) {
                eventList.innerHTML = '<div class="empty-state">No events yet. Start by adding one!</div>';
                return;
            }

       

            events.forEach(ev => {
                const card = document.createElement('div');
                card.className = `event-item cat-${ev.category}`;

                const dateObj = new Date(ev.date);
                const dateStr = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

                card.innerHTML = `
                    <div class="event-header">
                        <span class="badge">${ev.category}</span>
                        <button class="delete-btn" data-id="${ev.id}" title="Delete">
                            &times;
                        </button>
                    </div>
                    <div class="event-title">${ev.title}</div>
                    <div class="event-date"> ${ev.date ? dateStr : 'No Date'}</div>
                    <p class="event-desc">${ev.description}</p>
                `;
                eventList.appendChild(card);
            });
        }
        
    document.addEventListener("keydown", function(e) {

        keyDisplay.textContent = "you Pressed: " + e.key;
    });