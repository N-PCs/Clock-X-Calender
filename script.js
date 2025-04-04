let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

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

function generateCalendar(month, year, direction = 'none') {
    const calendar = document.getElementById('calendar');
    const monthNames = ["January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November", "December"];
    
    // Update month-year display
    document.getElementById('month-year').textContent = `${monthNames[month]} ${year}`;
    
    // Animation classes
    if (direction === 'prev') {
        calendar.classList.add('slide-out-right');
    } else if (direction === 'next') {
        calendar.classList.add('slide-out-left');
    }
    
    setTimeout(() => {
        calendar.innerHTML = '';
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        const today = new Date();
        
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
            
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
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
        
        // Apply slide-in animation
        if (direction === 'prev') {
            calendar.classList.remove('slide-out-right');
            calendar.classList.add('slide-in-left');
        } else if (direction === 'next') {
            calendar.classList.remove('slide-out-left');
            calendar.classList.add('slide-in-right');
        }
        
        // Remove animation classes after animation completes
        setTimeout(() => {
            calendar.classList.remove('slide-in-left', 'slide-in-right');
        }, 500);
    }, 300);
}

// Navigation functions
function goToPrevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear, 'prev');
}

function goToNextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear, 'next');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    generateCalendar(currentMonth, currentYear);
    
    // Set up event listeners
    document.getElementById('prev-month').addEventListener('click', goToPrevMonth);
    document.getElementById('next-month').addEventListener('click', goToNextMonth);
    
    // Update every second
    setInterval(updateClock, 1000);
    
    // Regenerate calendar when month changes
    setInterval(() => {
        const now = new Date();
        if (now.getDate() === 1 && now.getHours() === 0 && now.getMinutes() === 0) {
            currentMonth = now.getMonth();
            currentYear = now.getFullYear();
            generateCalendar(currentMonth, currentYear);
        }
    }, 60000);
});
