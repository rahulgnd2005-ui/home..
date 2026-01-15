// Loading Screen Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    
    // Simulate loading time (2-3 seconds)
    setTimeout(function() {
        // Hide loading screen
        loadingScreen.classList.add('hidden');
        
        // Show main content with fade in
        setTimeout(function() {
            loadingScreen.style.display = 'none';
            mainContent.classList.add('loaded');
        }, 500);
    }, 2500); // 2.5 second loading time
    
    // Language selector functionality
    const languageToggleBtn = document.getElementById('languageToggleBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentLanguage = document.getElementById('currentLanguage');
    const languageSearchInput = document.getElementById('languageSearchInput');
    const clearLanguageSearch = document.getElementById('clearLanguageSearch');
    const languageItems = document.querySelectorAll('.language-item');
    const languageList = document.getElementById('languageList');
    const noResults = document.getElementById('noResults');
    
    // Toggle language dropdown
    if (languageToggleBtn) {
        languageToggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            languageDropdown.classList.toggle('active');
            
            // Focus on search input when dropdown opens
            if (languageDropdown.classList.contains('active') && languageSearchInput) {
                setTimeout(() => {
                    languageSearchInput.focus();
                }, 100);
            }
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (languageDropdown && !languageDropdown.contains(e.target) && 
            languageToggleBtn && !languageToggleBtn.contains(e.target)) {
            languageDropdown.classList.remove('active');
            if (languageToggleBtn) {
                languageToggleBtn.classList.remove('active');
            }
        }
    });
    
    // Language search functionality
    if (languageSearchInput) {
        languageSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            let hasResults = false;
            
            // Show/hide clear search button
            if (searchTerm.length > 0) {
                clearLanguageSearch.classList.add('active');
            } else {
                clearLanguageSearch.classList.remove('active');
            }
            
            // Search through all language items
            languageItems.forEach(item => {
                const languageName = item.querySelector('.language-item-name').textContent.toLowerCase();
                const languageGroup = item.closest('.language-group');
                
                if (languageName.includes(searchTerm)) {
                    item.style.display = 'flex';
                    if (languageGroup) {
                        languageGroup.style.display = 'block';
                    }
                    hasResults = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show/hide language groups based on visible items
            document.querySelectorAll('.language-group').forEach(group => {
                const visibleItems = group.querySelectorAll('.language-item[style="display: flex"]');
                if (visibleItems.length === 0 && searchTerm.length > 0) {
                    group.style.display = 'none';
                } else {
                    group.style.display = 'block';
                }
            });
            
            // Show/hide no results message
            if (hasResults || searchTerm.length === 0) {
                noResults.classList.remove('active');
            } else {
                noResults.classList.add('active');
            }
        });
        
        // Clear search
        clearLanguageSearch.addEventListener('click', function() {
            languageSearchInput.value = '';
            languageSearchInput.focus();
            this.classList.remove('active');
            
            // Show all languages and groups
            languageItems.forEach(item => {
                item.style.display = 'flex';
            });
            
            document.querySelectorAll('.language-group').forEach(group => {
                group.style.display = 'block';
            });
            
            noResults.classList.remove('active');
        });
        
        // Prevent search input from closing dropdown
        languageSearchInput.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Select language
    languageItems.forEach(item => {
        item.addEventListener('click', function() {
            const languageValue = this.getAttribute('data-value');
            const languageName = this.querySelector('.language-item-name').textContent;
            const languageFlag = this.querySelector('.language-flag').textContent;
            
            // Update current language display
            if (currentLanguage) {
                currentLanguage.textContent = languageName.split(' (')[0];
            }
            
            // Update flag in display
            const currentFlag = document.querySelector('.current-language-display .language-flag');
            if (currentFlag) {
                currentFlag.textContent = languageFlag;
            }
            
            // Update selected state
            languageItems.forEach(item => {
                item.classList.remove('selected');
            });
            this.classList.add('selected');
            
            // Close dropdown
            if (languageDropdown) {
                languageDropdown.classList.remove('active');
            }
            if (languageToggleBtn) {
                languageToggleBtn.classList.remove('active');
            }
            
            // Clear search
            if (languageSearchInput) {
                languageSearchInput.value = '';
            }
            if (clearLanguageSearch) {
                clearLanguageSearch.classList.remove('active');
            }
            
            // Show all languages and groups
            languageItems.forEach(item => {
                item.style.display = 'flex';
            });
            
            document.querySelectorAll('.language-group').forEach(group => {
                group.style.display = 'block';
            });
            
            noResults.classList.remove('active');
            
            // Save to localStorage
            localStorage.setItem('preferredLanguage', languageValue);
            
            // Show notification
            showLanguageChangeMessage(languageValue);
        });
    });
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        const savedItem = document.querySelector(`.language-item[data-value="${savedLanguage}"]`);
        if (savedItem) {
            const languageName = savedItem.querySelector('.language-item-name').textContent;
            const languageFlag = savedItem.querySelector('.language-flag').textContent;
            
            if (currentLanguage) {
                currentLanguage.textContent = languageName.split(' (')[0];
            }
            
            const currentFlag = document.querySelector('.current-language-display .language-flag');
            if (currentFlag) {
                currentFlag.textContent = languageFlag;
            }
            
            savedItem.classList.add('selected');
        }
    }
    
    // Dropdown functionality - Only open About dropdown on hover
    const aboutDropdown = document.getElementById('aboutDropdown');
    const aboutLink = aboutDropdown.querySelector('.nav-link');
    const aboutMenu = aboutDropdown.querySelector('.dropdown-menu');
    
    if (aboutDropdown) {
        // Desktop hover functionality
        aboutDropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 992) {
                aboutMenu.style.opacity = '1';
                aboutMenu.style.visibility = 'visible';
                aboutMenu.style.transform = 'translateY(0)';
            }
        });
        
        aboutDropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 992) {
                aboutMenu.style.opacity = '0';
                aboutMenu.style.visibility = 'hidden';
                aboutMenu.style.transform = 'translateY(10px)';
            }
        });
        
        // Mobile touch functionality
        aboutLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const isActive = aboutMenu.style.display === 'block';
                aboutMenu.style.display = isActive ? 'none' : 'block';
            }
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-box i');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
        
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                performSearch(searchInput.value);
            });
        }
    }
    
    // Appointment button functionality
    const appointmentBtn = document.querySelector('.appointment-btn');
    if (appointmentBtn) {
        appointmentBtn.addEventListener('click', function() {
            window.location.href = '/appointment';
        });
    }
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', function() {
            navList.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !navList.contains(event.target)) {
                navList.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    }
    
    // Close all dropdowns when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            if (!e.target.closest('.dropdown')) {
                const dropdowns = document.querySelectorAll('.dropdown-menu');
                dropdowns.forEach(dropdown => {
                    dropdown.style.display = 'none';
                });
            }
        }
    });
    
    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Window resize handler
    window.addEventListener('resize', function() {
        // Reset mobile menu on desktop
        if (window.innerWidth > 992) {
            if (navList) navList.classList.remove('active');
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
            
            // Close language dropdown
            if (languageDropdown) {
                languageDropdown.classList.remove('active');
            }
            if (languageToggleBtn) {
                languageToggleBtn.classList.remove('active');
            }
        }
    });
    
    // Initialize appointment functionality
    initializeAppointmentCalendar();
    initializeTimeSlots();
});

// Show language change message
function showLanguageChangeMessage(language) {
    const message = document.createElement('div');
    message.className = 'notification';
    message.textContent = `Language changed to ${getLanguageName(language)}`;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

// Get language name from code
function getLanguageName(code) {
    const languages = {
        'en': 'English',
        'hi': 'हिन्दी',
        'es': 'Español',
        'fr': 'Français',
        'ar': 'العربية',
        'zh': '中文',
        'af': 'Afrikaans',
        'sq': 'Shqip',
        'am': 'አማርኛ',
        'hy': 'Հայերեն',
        'az': 'Azərbaycan',
        'bn': 'বাংলা',
        'bs': 'Bosanski',
        'bg': 'Български',
        'my': 'မြန်မာ',
        'ca': 'Català',
        'hr': 'Hrvatski',
        'cs': 'Čeština',
        'da': 'Dansk',
        'nl': 'Nederlands',
        'et': 'Eesti',
        'fi': 'Suomi',
        'de': 'Deutsch',
        'el': 'Ελληνικά',
        'gu': 'ગુજરાતી',
        'he': 'עברית',
        'hu': 'Magyar',
        'is': 'Íslenska',
        'id': 'Bahasa Indonesia',
        'ga': 'Gaeilge',
        'it': 'Italiano',
        'ja': '日本語',
        'kn': 'ಕನ್ನಡ',
        'kk': 'Қазақ',
        'ko': '한국어',
        'lv': 'Latviešu',
        'lt': 'Lietuvių',
        'mk': 'Македонски',
        'ms': 'Bahasa Melayu',
        'ml': 'മലയാളം',
        'mr': 'मराठी',
        'ne': 'नेपाली',
        'no': 'Norsk',
        'fa': 'فارسی',
        'pl': 'Polski',
        'pt': 'Português',
        'pa': 'ਪੰਜਾਬੀ',
        'ro': 'Română',
        'ru': 'Русский',
        'sr': 'Српски',
        'sk': 'Slovenčina',
        'sl': 'Slovenščina',
        'so': 'Soomaali',
        'sv': 'Svenska',
        'tl': 'Tagalog',
        'ta': 'தமிழ்',
        'te': 'తెలుగు',
        'th': 'ไทย',
        'tr': 'Türkçe',
        'uk': 'Українська',
        'ur': 'اردو',
        'uz': 'O\'zbek',
        'vi': 'Tiếng Việt',
        'cy': 'Cymraeg',
        'zu': 'isiZulu'
    };
    return languages[code] || code;
}

// Perform search
function performSearch(query) {
    if (query.trim()) {
        console.log('Searching for:', query);
        // Implement actual search logic
        // window.location.href = `/search?q=${encodeURIComponent(query)}`;
        
        // For demonstration
        showNotification(`Searching for: ${query}`, 'info');
    }
}

// Show search notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    const colors = {
        'success': '#4CAF50',
        'error': '#f44336',
        'info': '#2196F3',
        'warning': '#ff9800'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 12px 24px;
        border-radius: 6px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Appointment form functionality
let selectedDate = null;
let selectedTimeSlot = null;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Calendar functionality
function initializeAppointmentCalendar() {
    const appointmentDateInput = document.getElementById('appointmentDate');
    const calendarModal = document.getElementById('calendarModal');
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthYear = document.getElementById('currentMonthYear');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const todayBtn = document.getElementById('todayBtn');
    const cancelCalendarBtn = document.getElementById('cancelCalendar');
    const selectDateBtn = document.getElementById('selectDateBtn');
    const dateInputWrapper = document.querySelector('.date-input-wrapper');
    
    // Open calendar when clicking on date input
    if (appointmentDateInput && dateInputWrapper) {
        appointmentDateInput.addEventListener('click', openCalendar);
        dateInputWrapper.addEventListener('click', openCalendar);
    }
    
    // Calendar navigation
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', showPreviousMonth);
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', showNextMonth);
    }
    
    if (todayBtn) {
        todayBtn.addEventListener('click', goToToday);
    }
    
    if (cancelCalendarBtn) {
        cancelCalendarBtn.addEventListener('click', closeCalendar);
    }
    
    if (selectDateBtn) {
        selectDateBtn.addEventListener('click', selectDate);
    }
    
    // Close calendar when clicking outside
    document.addEventListener('click', function(e) {
        if (calendarModal && calendarModal.classList.contains('active')) {
            if (!e.target.closest('.calendar-container') && 
                !e.target.closest('.date-input-wrapper')) {
                closeCalendar();
            }
        }
    });
    
    // Initial calendar render
    renderCalendar();
}

function openCalendar() {
    const calendarModal = document.getElementById('calendarModal');
    if (calendarModal) {
        calendarModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        renderCalendar();
    }
}

function closeCalendar() {
    const calendarModal = document.getElementById('calendarModal');
    if (calendarModal) {
        calendarModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function showPreviousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

function showNextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

function goToToday() {
    const today = new Date();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    selectedDate = today;
    renderCalendar();
}

function renderCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthYear = document.getElementById('currentMonthYear');
    
    if (!calendarDays || !currentMonthYear) return;
    
    // Clear existing days
    calendarDays.innerHTML = '';
    
    // Set month and year in header
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    currentMonthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Get first day of month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const firstDayIndex = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Get last day of month
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const lastDate = lastDay.getDate();
    
    // Get previous month's last date
    const prevLastDay = new Date(currentYear, currentMonth, 0);
    const prevLastDate = prevLastDay.getDate();
    
    // Get today's date for comparison
    const today = new Date();
    
    // Create days from previous month
    for (let i = firstDayIndex; i > 0; i--) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day other-month';
        dayElement.textContent = prevLastDate - i + 1;
        calendarDays.appendChild(dayElement);
    }
    
    // Create days for current month
    for (let i = 1; i <= lastDate; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = i;
        
        const currentDate = new Date(currentYear, currentMonth, i);
        
        // Check if it's today
        if (currentDate.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        }
        
        // Check if it's selected
        if (selectedDate && currentDate.toDateString() === selectedDate.toDateString()) {
            dayElement.classList.add('selected');
        }
        
        // Check if date is in the past (disable it)
        if (currentDate < today.setHours(0, 0, 0, 0)) {
            dayElement.classList.add('disabled');
        } else {
            dayElement.addEventListener('click', () => selectCalendarDate(currentDate));
        }
        
        calendarDays.appendChild(dayElement);
    }
    
    // Calculate next month days to fill the grid
    const totalCells = 42; // 6 rows * 7 columns
    const nextMonthDays = totalCells - (firstDayIndex + lastDate);
    
    // Create days for next month
    for (let i = 1; i <= nextMonthDays; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day other-month';
        dayElement.textContent = i;
        calendarDays.appendChild(dayElement);
    }
}

function selectCalendarDate(date) {
    selectedDate = date;
    renderCalendar();
}

function selectDate() {
    if (selectedDate) {
        const appointmentDateInput = document.getElementById('appointmentDate');
        if (appointmentDateInput) {
            const formattedDate = formatDate(selectedDate);
            appointmentDateInput.value = formattedDate;
        }
    }
    closeCalendar();
}

function formatDate(date) {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

// Time slot functionality
function initializeTimeSlots() {
    const appointmentTimeInput = document.getElementById('appointmentTime');
    const timeInputWrapper = document.querySelector('.time-input-wrapper');
    const timeslotModal = document.getElementById('timeslotModal');
    const timeslotGrid = document.getElementById('timeslotGrid');
    const closeTimeslotBtn = document.getElementById('closeTimeslot');
    const customTimeBtn = document.getElementById('customTimeBtn');
    const customTimeModal = document.getElementById('customTimeModal');
    const closeCustomTimeBtn = document.getElementById('closeCustomTime');
    const cancelCustomTimeBtn = document.getElementById('cancelCustomTime');
    const saveCustomTimeBtn = document.getElementById('saveCustomTime');
    
    // Open time slot modal when clicking on time input
    if (appointmentTimeInput && timeInputWrapper) {
        appointmentTimeInput.addEventListener('click', openTimeSlotModal);
        timeInputWrapper.addEventListener('click', openTimeSlotModal);
    }
    
    // Close time slot modal
    if (closeTimeslotBtn) {
        closeTimeslotBtn.addEventListener('click', closeTimeSlotModal);
    }
    
    // Custom time button
    if (customTimeBtn) {
        customTimeBtn.addEventListener('click', openCustomTimeModal);
    }
    
    // Custom time modal buttons
    if (closeCustomTimeBtn) {
        closeCustomTimeBtn.addEventListener('click', closeCustomTimeModal);
    }
    
    if (cancelCustomTimeBtn) {
        cancelCustomTimeBtn.addEventListener('click', closeCustomTimeModal);
    }
    
    if (saveCustomTimeBtn) {
        saveCustomTimeBtn.addEventListener('click', saveCustomTime);
    }
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (timeslotModal && timeslotModal.classList.contains('active')) {
            if (!e.target.closest('.timeslot-container') && 
                !e.target.closest('.time-input-wrapper')) {
                closeTimeSlotModal();
            }
        }
        
        if (customTimeModal && customTimeModal.classList.contains('active')) {
            if (!e.target.closest('.custom-time-container')) {
                closeCustomTimeModal();
            }
        }
    });
    
    // Initialize time slots
    renderTimeSlots();
}

function renderTimeSlots() {
    const timeslotGrid = document.getElementById('timeslotGrid');
    if (!timeslotGrid) return;
    
    // Clear existing time slots
    timeslotGrid.innerHTML = '';
    
    // Define time slots as requested
    const timeSlots = [
        { start: '10:00', end: '11:00', period: 'AM' },
        { start: '11:00', end: '12:00', period: 'AM' },
        { start: '12:00', end: '01:00', period: 'PM' },
        { start: '03:00', end: '04:00', period: 'PM' },
        { start: '04:00', end: '05:00', period: 'PM' },
        { start: '05:00', end: '06:00', period: 'PM' }
    ];
    
    // Create time slot elements
    timeSlots.forEach(slot => {
        const timeSlotElement = document.createElement('div');
        timeSlotElement.className = 'timeslot';
        timeSlotElement.textContent = `${slot.start} ${slot.period} - ${slot.end} ${slot.period}`;
        timeSlotElement.dataset.time = `${slot.start} ${slot.period}-${slot.end} ${slot.period}`;
        
        // Check if this is the selected time slot
        if (selectedTimeSlot === timeSlotElement.dataset.time) {
            timeSlotElement.classList.add('selected');
        }
        
        timeSlotElement.addEventListener('click', () => selectTimeSlot(timeSlotElement));
        timeslotGrid.appendChild(timeSlotElement);
    });
}

function openTimeSlotModal() {
    const timeslotModal = document.getElementById('timeslotModal');
    if (timeslotModal) {
        timeslotModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        renderTimeSlots();
    }
}

function closeTimeSlotModal() {
    const timeslotModal = document.getElementById('timeslotModal');
    if (timeslotModal) {
        timeslotModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function selectTimeSlot(timeSlotElement) {
    // Remove selected class from all time slots
    document.querySelectorAll('.timeslot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    // Add selected class to clicked time slot
    timeSlotElement.classList.add('selected');
    selectedTimeSlot = timeSlotElement.dataset.time;
    
    // Update time input
    const appointmentTimeInput = document.getElementById('appointmentTime');
    if (appointmentTimeInput) {
        appointmentTimeInput.value = selectedTimeSlot.replace('-', '--');
    }
    
    // Close modal after a short delay
    setTimeout(() => {
        closeTimeSlotModal();
    }, 500);
}

function openCustomTimeModal() {
    const customTimeModal = document.getElementById('customTimeModal');
    if (customTimeModal) {
        customTimeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Set current time as default
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        
        document.getElementById('customHour').value = displayHour.toString().padStart(2, '0');
        document.getElementById('customMinute').value = minute.toString().padStart(2, '0');
        document.getElementById('customPeriod').value = period;
    }
}

function closeCustomTimeModal() {
    const customTimeModal = document.getElementById('customTimeModal');
    if (customTimeModal) {
        customTimeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function saveCustomTime() {
    const hour = document.getElementById('customHour').value;
    const minute = document.getElementById('customMinute').value;
    const period = document.getElementById('customPeriod').value;
    
    // Validate input
    if (!hour || !minute) {
        showNotification('Please enter a valid time', 'error');
        return;
    }
    
    const hourNum = parseInt(hour);
    const minuteNum = parseInt(minute);
    
    if (hourNum < 1 || hourNum > 12 || minuteNum < 0 || minuteNum > 59) {
        showNotification('Please enter a valid time (HH:MM)', 'error');
        return;
    }
    
    // Format time
    const formattedHour = hourNum.toString().padStart(2, '0');
    const formattedMinute = minuteNum.toString().padStart(2, '0');
    
    // Update selected time slot
    selectedTimeSlot = `${formattedHour}:${formattedMinute} ${period}`;
    
    // Update time input
    const appointmentTimeInput = document.getElementById('appointmentTime');
    if (appointmentTimeInput) {
        appointmentTimeInput.value = selectedTimeSlot;
    }
    
    closeCustomTimeModal();
    closeTimeSlotModal();
    
    showNotification('Custom time set successfully', 'success');
}

// Appointment form submission
const appointmentForm = document.getElementById('appointmentForm');
const appointmentLoadingModal = document.getElementById('appointmentLoadingModal');
const loadingMessage = document.getElementById('loadingMessage');
const submitAppointmentBtn = document.getElementById('submitAppointmentBtn');
const headerAppointmentBtn = document.getElementById('headerAppointmentBtn');

// Scroll to appointment section when header button is clicked
if (headerAppointmentBtn) {
    headerAppointmentBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const appointmentSection = document.querySelector('.appointment-section');
        if (appointmentSection) {
            appointmentSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Appointment form submission
if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const patientName = document.getElementById('patientName').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const appointmentDate = document.getElementById('appointmentDate').value;
        const appointmentTime = document.getElementById('appointmentTime').value;
        const department = document.getElementById('department').value;
        const hospital = document.getElementById('hospital').value;
        
        // Validate form
        if (!patientName || !phoneNumber || !appointmentDate || !appointmentTime || !department || !hospital) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate date
        if (!selectedDate) {
            showNotification('Please select a valid date.', 'error');
            return;
        }
        
        // Validate time
        if (!selectedTimeSlot) {
            showNotification('Please select a valid time slot.', 'error');
            return;
        }
        
        // Show loading modal
        showAppointmentLoading();
        
        // Simulate API call
        setTimeout(() => {
            completeAppointmentLoading();
            
            // Show success message
            setTimeout(() => {
                hideAppointmentLoading();
                showNotification('Appointment booked successfully! We will contact you shortly.', 'success');
                
                // Reset form
                appointmentForm.reset();
                selectedDate = null;
                selectedTimeSlot = null;
                
                // Reset calendar to current month
                const today = new Date();
                currentMonth = today.getMonth();
                currentYear = today.getFullYear();
                renderCalendar();
                renderTimeSlots();
            }, 1500);
        }, 3000);
    });
}

// Function to show appointment loading
function showAppointmentLoading() {
    const appointmentLoadingModal = document.getElementById('appointmentLoadingModal');
    if (appointmentLoadingModal) {
        appointmentLoadingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Function to complete loading animation
function completeAppointmentLoading() {
    const loaderPath = document.querySelector('.loader-path');
    const loaderCheckmark = document.querySelector('.loader-checkmark');
    
    if (loaderPath && loaderCheckmark) {
        loaderPath.style.animation = 'none';
        loaderPath.style.strokeDashoffset = '0';
        loaderPath.style.stroke = '#4CAF50';
        
        setTimeout(() => {
            loaderCheckmark.classList.add('show');
            if (loadingMessage) {
                loadingMessage.textContent = 'Appointment Confirmed!';
            }
        }, 500);
    }
}

// Function to hide appointment loading
function hideAppointmentLoading() {
    const appointmentLoadingModal = document.getElementById('appointmentLoadingModal');
    if (appointmentLoadingModal) {
        appointmentLoadingModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Reset loader
        const loaderPath = document.querySelector('.loader-path');
        const loaderCheckmark = document.querySelector('.loader-checkmark');
        
        if (loaderPath) {
            loaderPath.style.animation = 'dash 1.5s ease-in-out infinite';
            loaderPath.style.strokeDashoffset = '126';
            loaderPath.style.stroke = 'var(--secondary-color)';
        }
        
        if (loaderCheckmark) {
            loaderCheckmark.classList.remove('show');
        }
        
        if (loadingMessage) {
            loadingMessage.textContent = 'Scheduling your appointment...';
        }
    }
}

// Hospital search functionality
const hospitalInput = document.getElementById('hospital');
const searchIcon = document.querySelector('.search-wrapper i');
if (hospitalInput && searchIcon) {
    searchIcon.addEventListener('click', function() {
        if (hospitalInput.value.trim()) {
            performHospitalSearch(hospitalInput.value);
        }
    });
    
    hospitalInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && hospitalInput.value.trim()) {
            performHospitalSearch(hospitalInput.value);
        }
    });
}

// Hospital search function
function performHospitalSearch(query) {
    console.log('Searching for hospital:', query);
    showNotification(`Searching for: ${query}`, 'info');
    
    // Simulate search results
    setTimeout(() => {
        const hospitals = [
            "Apollo Hospital, Delhi",
            "Fortis Hospital, Mumbai",
            "Max Super Specialty Hospital, Delhi",
            "Manipal Hospital, Bangalore",
            "Artemis Hospital, Gurgaon"
        ];
        
        showHospitalResults(hospitals);
    }, 1000);
}

// Show hospital search results
function showHospitalResults(hospitals) {
    const hospitalInput = document.getElementById('hospital');
    const searchWrapper = document.querySelector('.search-wrapper');
    
    // Create results container
    let resultsContainer = document.querySelector('.hospital-results');
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'hospital-results';
        resultsContainer.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            margin-top: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 100;
            max-height: 200px;
            overflow-y: auto;
        `;
        searchWrapper.appendChild(resultsContainer);
    }
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    // Add hospitals to results
    hospitals.forEach(hospital => {
        const resultItem = document.createElement('div');
        resultItem.className = 'hospital-result-item';
        resultItem.textContent = hospital;
        resultItem.style.cssText = `
            padding: 10px 15px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            border-bottom: 1px solid var(--border-color);
        `;
        
        resultItem.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--dropdown-hover)';
        });
        
        resultItem.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
        
        resultItem.addEventListener('click', function() {
            hospitalInput.value = hospital;
            resultsContainer.remove();
        });
        
        resultsContainer.appendChild(resultItem);
    });
    
    // Remove results when clicking outside
    document.addEventListener('click', function removeResults(e) {
        if (!searchWrapper.contains(e.target)) {
            if (resultsContainer) {
                resultsContainer.remove();
            }
            document.removeEventListener('click', removeResults);
        }
    });
}

// Show loading screen on refresh
window.addEventListener('beforeunload', function() {
    // Optionally save current scroll position
    sessionStorage.setItem('scrollPosition', window.pageYOffset);
});

// Restore scroll position after load
window.addEventListener('load', function() {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
    }
});