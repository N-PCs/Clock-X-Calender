function updateClock() {
    const now = new Date();
    
    // Update time
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    document.getElementById('time').textContent = `${hours}:${minutes}`;
    document.getElementById('seconds').textContent = seconds;
    
    // Update date
    document.getElementById('date').textContent = now.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    });
    document.getElementById('day').textContent = now.toLocaleDateString('en-US', { weekday: 'long' });
}

function generateCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const startingDay = firstDay.getDay();
    
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        calendar.appendChild(dayElement);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day', 'current-month');
        dayElement.textContent = day;
        
        if (day === today) {
            dayElement.classList.add('today');
        }
        
        // Randomly add some events (for demonstration)
        if (Math.random() > 0.8) {
            dayElement.classList.add('has-event');
        }
        
        calendar.appendChild(dayElement);
    }
    
    // Calculate total cells added so far
    const totalCells = startingDay + daysInMonth;
    const remainingCells = 7 - (totalCells % 7);
    
    // Add empty cells to complete the last week if needed
    if (remainingCells < 7) {
        for (let i = 0; i < remainingCells; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            calendar.appendChild(dayElement);
        }
    }
}

// Initialize
updateClock();
generateCalendar();

// Update every second
setInterval(updateClock, 1000);

// Regenerate calendar when month changes
setInterval(() => {
    const now = new Date();
    if (now.getDate() === 1 && now.getHours() === 0 && now.getMinutes() === 0) {
        generateCalendar();
    }
}, 60000);