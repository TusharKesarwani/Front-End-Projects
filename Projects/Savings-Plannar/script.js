document.addEventListener('DOMContentLoaded', () => {
    const currentMonth = document.getElementById('current-month');
    const calendarGrid = document.getElementById('calendar-grid');
    const viewSelect = document.getElementById('view-select');
    const prevButton = document.getElementById('prev-month');
    const nextButton = document.getElementById('next-month');
    const datePickerButton = document.getElementById('date-picker-button'); // Date Picker Button
    const datePicker = document.getElementById('date-picker'); // Hidden Date Input
    const clearDateButton = document.createElement('button'); // Clear Date Button
    const deleteAmountButton = document.getElementById('delete-amount'); // Reference to the delete button
    document.getElementById('saving-modal').style.display = 'none';
    const today = new Date();

    let displayedMonth = today.getMonth();
    let displayedYear = today.getFullYear();
    let displayedDay = today.getDate();
    let savings = JSON.parse(localStorage.getItem('savings')) || {};  // Store savings in local storage

    // Add "Clear Date" button
    clearDateButton.style.display = "none";
    clearDateButton.id = 'clear-date-button';
    clearDateButton.innerHTML = '<i class="fa-solid fa-square-xmark"></i>';
    clearDateButton.style.marginRight = '10px';
    clearDateButton.style.padding = '5px 10px';
    clearDateButton.style.fontSize = '16px';
    clearDateButton.style.cursor = 'pointer';
    clearDateButton.style.backgroundColor = '#dc3545';
    clearDateButton.style.color = 'white';
    clearDateButton.style.border = 'none';
    clearDateButton.style.borderRadius = '5px';

    // Append the clear date button to the view selector
    datePickerButton.after(clearDateButton);

    const renderCalendar = (view) => {
        calendarGrid.innerHTML = '';

        switch (view) {
            case 'day':
                currentMonth.textContent = new Date(displayedYear, displayedMonth, displayedDay).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
                showDayView();
                break;
            case 'week':
                const firstDayOfWeek = new Date(displayedYear, displayedMonth, displayedDay - (today.getDay() - 1));
                currentMonth.textContent = `Week of ${firstDayOfWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
                showWeekView();
                break;
            case 'year':
                currentMonth.textContent = `${displayedYear}`;
                showYearView();
                break;
            default:
                currentMonth.textContent = new Date(displayedYear, displayedMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                showMonthView();
                break;
        }
    };

    const showDayView = () => {
        const dayCell = document.createElement('div');
        const dayOfWeek = new Date(displayedYear, displayedMonth, displayedDay).getDay();
        dayCell.textContent = displayedDay;
        dayCell.style.gridColumnStart = dayOfWeek + 1;
        dayCell.classList.add('current-day');
        appendSaving(dayCell, displayedYear, displayedMonth, displayedDay);
        dayCell.addEventListener('click', () => {
            openSavingModal(displayedDay);
        });
        calendarGrid.appendChild(dayCell);
    };

    const showWeekView = () => {
        const startOfWeek = new Date(displayedYear, displayedMonth, displayedDay);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Move to the previous Sunday

        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            weekDates.push(new Date(startOfWeek));
            startOfWeek.setDate(startOfWeek.getDate() + 1);
        }

        weekDates.forEach((date, index) => {
            const dayCell = document.createElement('div');
            dayCell.textContent = date.getDate();

            if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
                dayCell.classList.add('current-day');
            }

            appendSaving(dayCell, date.getFullYear(), date.getMonth(), date.getDate());

            // Ensure the day appears under the correct column
            dayCell.style.gridColumnStart = index + 1;

            dayCell.addEventListener('click', () => {
                openSavingModal(date.getDate(), date.getMonth());
            });
            calendarGrid.appendChild(dayCell);
        });

        // Update header to show the week date range
        const firstDay = weekDates[0];
        const lastDay = weekDates[6];
        currentMonth.textContent = `Week of ${firstDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    };

    const showMonthView = () => {
        const daysInMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();
        const startDay = new Date(displayedYear, displayedMonth, 1).getDay();

        for (let i = 0; i < startDay; i++) {
            const emptyCell = document.createElement('div');
            calendarGrid.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.textContent = day;

            if (day === today.getDate() && displayedMonth === today.getMonth() && displayedYear === today.getFullYear()) {
                dayCell.classList.add('current-day');
            }

            appendSaving(dayCell, displayedYear, displayedMonth, day);

            dayCell.addEventListener('click', () => {
                openSavingModal(day);
            });

            calendarGrid.appendChild(dayCell);
        }
    };

    const showYearView = () => {
        for (let month = 0; month < 12; month++) {
            const monthLabel = document.createElement('div');
            monthLabel.textContent = new Date(displayedYear, month).toLocaleDateString('en-US', { month: 'short' });
            monthLabel.style.gridColumn = `span 7`; // span across the entire row
            calendarGrid.appendChild(monthLabel);

            const daysInMonth = new Date(displayedYear, month + 1, 0).getDate();
            const startDay = new Date(displayedYear, month, 1).getDay();

            for (let i = 0; i < startDay; i++) {
                const emptyCell = document.createElement('div');
                calendarGrid.appendChild(emptyCell);
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const dayCell = document.createElement('div');
                dayCell.textContent = day;

                if (day === today.getDate() && month === today.getMonth() && displayedYear === today.getFullYear()) {
                    dayCell.classList.add('current-day');
                }

                appendSaving(dayCell, displayedYear, month, day);

                dayCell.addEventListener('click', () => {
                    openSavingModal(day, month);
                });

                calendarGrid.appendChild(dayCell);
            }
        }
    };

    const appendSaving = (dayCell, year, month, day) => {
        const savingKey = `${year}-${month + 1}-${day}`;
        if (savings[savingKey]) {
            const savingElem = document.createElement('div');
            savingElem.textContent = `Rs. ${savings[savingKey]}`;
            savingElem.classList.add('saving');
            savingElem.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevents the modal from opening when clicking on the saving amount
                alert(`Saving: Rs. ${savings[savingKey]}`);
            });
            dayCell.appendChild(savingElem);
        }
    };

    const openSavingModal = (day, month = displayedMonth) => {
        const savingModal = document.getElementById('saving-modal');
        const savingDateInput = document.getElementById('saving-date');
        const savingAmountInput = document.getElementById('saving-amount');

        const savingDate = new Date(displayedYear, month, day).toLocaleDateString('en-US');
        savingDateInput.value = savingDate;

        const savingKey = `${displayedYear}-${month + 1}-${day}`;

        if (savings[savingKey]) {
            savingAmountInput.value = savings[savingKey];
            deleteAmountButton.style.display = 'inline-block'; // Show the delete button if there's an amount saved
        } else {
            savingAmountInput.value = '';
            deleteAmountButton.style.display = 'none'; // Hide the delete button if no amount is saved
        }

        // Show the modal
        savingModal.style.display = 'flex';
    };

    deleteAmountButton.addEventListener('click', () => {
        const savingDate = document.getElementById('saving-date').value;
        const [month, day, year] = savingDate.split('/').map(Number);
        const savingKey = `${year}-${month}-${day}`;

        if (savings[savingKey]) {
            delete savings[savingKey]; // Remove the amount from the savings object
            localStorage.setItem('savings', JSON.stringify(savings)); // Update local storage
            renderCalendar(viewSelect.value); // Re-render the calendar to update the view
            closeSavingModal(); // Close the modal after deletion
        }
    });

    const closeSavingModal = () => {
        document.getElementById('saving-modal').style.display = 'none';
    };

    // Additional functionality: close modal if clicking outside of it
    window.addEventListener('click', (event) => {
        const savingModal = document.getElementById('saving-modal');
        if (event.target === savingModal) {
            closeSavingModal();
        }
    });

    document.getElementById('close-modal').addEventListener('click', closeSavingModal);

    document.getElementById('saving-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const savingDate = document.getElementById('saving-date').value;
        const savingAmount = document.getElementById('saving-amount').value;

        const [month, day, year] = savingDate.split('/').map(Number);
        const savingKey = `${year}-${month}-${day}`;

        savings[savingKey] = savingAmount;
        localStorage.setItem('savings', JSON.stringify(savings));

        closeSavingModal();
        renderCalendar(viewSelect.value);
    });

    document.getElementById('analyze-button').addEventListener('click', () => {
        window.location.href = 'analysis.html';
    });

    prevButton.addEventListener('click', () => {
        switch (viewSelect.value) {
            case 'day':
                displayedDay--;
                if (displayedDay < 1) {
                    displayedMonth--;
                    if (displayedMonth < 0) {
                        displayedMonth = 11;
                        displayedYear--;
                    }
                    displayedDay = new Date(displayedYear, displayedMonth + 1, 0).getDate();
                }
                break;
            case 'week':
                displayedDay -= 7;
                if (displayedDay < 1) {
                    displayedMonth--;
                    if (displayedMonth < 0) {
                        displayedMonth = 11;
                        displayedYear--;
                    }
                    const daysInPrevMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();
                    displayedDay = daysInPrevMonth + displayedDay;
                }
                break;
            case 'year':
                displayedYear--;
                break;
            default:
                displayedMonth--;
                if (displayedMonth < 0) {
                    displayedMonth = 11;
                    displayedYear--;
                }
                break;
        }
        renderCalendar(viewSelect.value);
    });

    nextButton.addEventListener('click', () => {
        switch (viewSelect.value) {
            case 'day':
                displayedDay++;
                const daysInCurrentMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();
                if (displayedDay > daysInCurrentMonth) {
                    displayedDay = 1;
                    displayedMonth++;
                    if (displayedMonth > 11) {
                        displayedMonth = 0;
                        displayedYear++;
                    }
                }
                break;
            case 'week':
                displayedDay += 7;
                const daysInCurrentWeekMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();
                if (displayedDay > daysInCurrentWeekMonth) {
                    displayedDay -= daysInCurrentWeekMonth;
                    displayedMonth++;
                    if (displayedMonth > 11) {
                        displayedMonth = 0;
                        displayedYear++;
                    }
                }
                break;
            case 'year':
                displayedYear++;
                break;
            default:
                displayedMonth++;
                if (displayedMonth > 11) {
                    displayedMonth = 0;
                    displayedYear++;
                }
                break;
        }
        renderCalendar(viewSelect.value);
    });

    viewSelect.addEventListener('change', () => {
        renderCalendar(viewSelect.value);
    });

    datePickerButton.addEventListener('click', () => {
        datePicker.style.display = "block";
        datePicker.click();
    });

    datePicker.addEventListener('change', (e) => {
        const selectedDate = new Date(e.target.value);
        displayedDay = selectedDate.getDate();
        displayedMonth = selectedDate.getMonth();
        displayedYear = selectedDate.getFullYear();
        datePicker.style.display = "none"; // Hide the date picker after selecting a date
        
        // Show the clear date button after a date is selected
        clearDateButton.style.display = "inline-block";
    
        renderCalendar(viewSelect.value);
    });

    clearDateButton.addEventListener('click', () => {
        displayedDay = today.getDate();
        displayedMonth = today.getMonth();
        displayedYear = today.getFullYear();
        datePicker.style.display = "none"; // Hide the date picker when clearing the date
        
        // Hide the clear date button when the date is cleared
        clearDateButton.style.display = "none";
    
        renderCalendar(viewSelect.value);
    });

    renderCalendar(viewSelect.value);
});


