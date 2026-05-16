// Sample Room Data
const roomsDatabase = [
    {
        id: 1,
        name: 'Luxurious Deluxe Room',
        type: 'deluxe',
        price: 250,
        rating: 4.5,
        reviews: 128,
        image: 'https://via.placeholder.com/300x200?text=Deluxe+Room',
        amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Gym Access'],
        description: 'Spacious deluxe room with modern amenities and city view. Perfect for business or leisure travelers.'
    },
    {
        id: 2,
        name: 'Comfortable Standard Room',
        type: 'standard',
        price: 120,
        rating: 4.0,
        reviews: 95,
        image: 'https://via.placeholder.com/300x200?text=Standard+Room',
        amenities: ['WiFi', 'AC', 'TV', 'Private Bathroom'],
        description: 'Cozy and comfortable standard room ideal for budget-conscious travelers.'
    },
    {
        id: 3,
        name: 'Presidential Suite',
        type: 'suite',
        price: 500,
        rating: 5.0,
        reviews: 76,
        image: 'https://via.placeholder.com/300x200?text=Suite',
        amenities: ['WiFi', 'AC', 'Jacuzzi', 'Sauna', 'Gym', 'Restaurant', 'Room Service'],
        description: 'Exclusive presidential suite with premium amenities and personalized service.'
    },
    {
        id: 4,
        name: 'Elegant Premium Suite',
        type: 'suite',
        price: 350,
        rating: 4.8,
        reviews: 112,
        image: 'https://via.placeholder.com/300x200?text=Premium+Suite',
        amenities: ['WiFi', 'AC', 'Hot Tub', 'Wine Bar', 'Business Center'],
        description: 'Premium suite with elegant decor and top-notch facilities.'
    },
    {
        id: 5,
        name: 'Modern Deluxe Plus',
        type: 'deluxe',
        price: 300,
        rating: 4.6,
        reviews: 89,
        image: 'https://via.placeholder.com/300x200?text=Deluxe+Plus',
        amenities: ['WiFi', 'AC', 'Balcony', 'Smart TV', 'Work Desk'],
        description: 'Modern deluxe room with smart technology and comfortable workspace.'
    },
    {
        id: 6,
        name: 'Budget Standard Room',
        type: 'standard',
        price: 80,
        rating: 3.8,
        reviews: 156,
        image: 'https://via.placeholder.com/300x200?text=Budget+Room',
        amenities: ['WiFi', 'AC', 'TV', 'Bathroom'],
        description: 'Affordable standard room with essential amenities.'
    }
];

// User Database (Local Storage)
let users = JSON.parse(localStorage.getItem('stayeaseUsers')) || [];
let bookings = JSON.parse(localStorage.getItem('stayeaseBookings')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    displayRooms(roomsDatabase);
    updateAuthUI();
    setMinDates();
});

// Display Rooms
function displayRooms(rooms) {
    const roomsGrid = document.getElementById('roomsGrid');
    roomsGrid.innerHTML = '';

    if (rooms.length === 0) {
        roomsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No rooms found. Try adjusting your filters.</p>';
        return;
    }

    rooms.forEach(room => {
        const roomCard = document.createElement('div');
        roomCard.className = 'room-card';
        roomCard.innerHTML = `
            <div class="room-image" style="background-image: url('${room.image}')"></div>
            <div class="room-info">
                <div class="room-type">${room.type}</div>
                <h3 class="room-name">${room.name}</h3>
                <div class="room-rating">
                    ${'★'.repeat(Math.floor(room.rating))}${'☆'.repeat(5-Math.floor(room.rating))} 
                    (${room.reviews} reviews)
                </div>
                <div class="room-amenities">${room.amenities.slice(0, 3).join(', ')}...</div>
                <div class="room-price">$${room.price}/night</div>
                <div class="room-actions">
                    <button class="btn btn-secondary" onclick="viewRoomDetails(${room.id})">View Details</button>
                    <button class="btn btn-primary" onclick="bookRoom(${room.id})">Book Now</button>
                </div>
            </div>
        `;
        roomsGrid.appendChild(roomCard);
    });
}

// View Room Details
function viewRoomDetails(roomId) {
    const room = roomsDatabase.find(r => r.id === roomId);
    if (!room) return;

    const roomDetailsDiv = document.getElementById('roomDetails');
    roomDetailsDiv.innerHTML = `
        <div class="room-details-content">
            <div class="room-details-image" style="background-image: url('${room.image}')"></div>
            <div class="room-details-info">
                <h3>${room.name}</h3>
                <p><strong>Type:</strong> ${room.type.toUpperCase()}</p>
                <p><strong>Price:</strong> $${room.price} per night</p>
                <p><strong>Rating:</strong> ${'★'.repeat(Math.floor(room.rating))} (${room.rating}/5)</p>
                <p><strong>Reviews:</strong> ${room.reviews}</p>
                <p><strong>Description:</strong> ${room.description}</p>
                <h4>Amenities:</h4>
                <ul>
                    ${room.amenities.map(a => `<li>${a}</li>`).join('')}
                </ul>
                <button class="btn btn-primary" style="margin-top: 20px;" onclick="closeRoomDetailsModal(); bookRoom(${room.id})">
                    Book This Room
                </button>
            </div>
        </div>
    `;

    document.getElementById('roomDetailsModal').style.display = 'block';
}

// Filter by Price
function filterByPrice() {
    const maxPrice = document.getElementById('priceFilter').value;
    document.getElementById('priceValue').textContent = `Max Price: $${maxPrice}`;

    const filtered = roomsDatabase.filter(room => room.price <= maxPrice);
    filterByType(filtered);
}

// Filter by Type
function filterByType(priceFiltered = roomsDatabase) {
    const type = document.getElementById('roomTypeFilter').value;
    let filtered = priceFiltered;

    if (type) {
        filtered = priceFiltered.filter(room => room.type === type);
    }

    displayRooms(filtered);
}

// Search Rooms
function searchRooms() {
    const location = document.getElementById('searchLocation').value.toLowerCase();
    const checkIn = document.getElementById('checkInDate').value;
    const checkOut = document.getElementById('checkOutDate').value;
    const guests = document.getElementById('guests').value;

    if (!checkIn || !checkOut) {
        alert('Please select check-in and check-out dates');
        return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
        alert('Check-out date must be after check-in date');
        return;
    }

    // In a real application, you would filter based on availability
    alert(`Searching for rooms in "${location}" from ${checkIn} to ${checkOut} for ${guests} guest(s)`);
    displayRooms(roomsDatabase);
}

// Set Minimum Dates
function setMinDates() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkInDate').setAttribute('min', today);
    document.getElementById('checkOutDate').setAttribute('min', today);
}

// Book Room
function bookRoom(roomId) {
    if (!currentUser) {
        alert('Please login to book a room');
        openLoginModal();
        return;
    }

    const room = roomsDatabase.find(r => r.id === roomId);
    const checkIn = document.getElementById('checkInDate').value;
    const checkOut = document.getElementById('checkOutDate').value;

    if (!checkIn || !checkOut) {
        alert('Please select check-in and check-out dates');
        return;
    }

    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const totalPrice = room.price * nights;

    const bookingSummary = document.getElementById('bookingSummary');
    bookingSummary.innerHTML = `
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h4>${room.name}</h4>
            <p><strong>Check-in:</strong> ${checkIn}</p>
            <p><strong>Check-out:</strong> ${checkOut}</p>
            <p><strong>Number of nights:</strong> ${nights}</p>
            <p><strong>Price per night:</strong> $${room.price}</p>
            <h3 style="margin-top: 15px;">Total: $${totalPrice}</h3>
        </div>
    `;

    document.getElementById('bookingModal').style.display = 'block';
    // Store booking data for confirmation
    window.pendingBooking = {
        roomId: room.id,
        roomName: room.name,
        checkIn: checkIn,
        checkOut: checkOut,
        nights: nights,
        totalPrice: totalPrice
    };
}

// Confirm Booking
function confirmBooking(event) {
    event.preventDefault();

    const booking = {
        id: Date.now(),
        userId: currentUser.id,
        ...window.pendingBooking,
        bookingDate: new Date().toLocaleDateString(),
        status: 'Confirmed'
    };

    bookings.push(booking);
    localStorage.setItem('stayeaseBookings', JSON.stringify(bookings));

    alert('Booking confirmed! A confirmation email has been sent to your email address.');
    closeBookingModal();
    window.pendingBooking = null;
}

// Login Functions
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        alert('Login successful!');
        closeLoginModal();
        updateAuthUI();
    } else {
        alert('Invalid email or password');
    }
}

// Register Functions
function openRegisterModal() {
    document.getElementById('registerModal').style.display = 'block';
}

function closeRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
}

function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    if (users.find(u => u.email === email)) {
        alert('Email already registered');
        return;
    }

    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        registrationDate: new Date().toLocaleDateString()
    };

    users.push(newUser);
    localStorage.setItem('stayeaseUsers', JSON.stringify(users));

    alert('Registration successful! Please login.');
    closeRegisterModal();
    openLoginModal();
}

// Forgot Password Functions
function openForgotPasswordModal() {
    closeLoginModal();
    document.getElementById('forgotPasswordModal').style.display = 'block';
}

function closeForgotPasswordModal() {
    document.getElementById('forgotPasswordModal').style.display = 'none';
}

function handleForgotPassword(event) {
    event.preventDefault();

    const email = document.getElementById('forgotEmail').value;
    const user = users.find(u => u.email === email);

    if (user) {
        alert('Password reset link has been sent to your email address.');
        closeForgotPasswordModal();
        openLoginModal();
    } else {
        alert('Email not found in our system');
    }
}

// Switch Between Login and Register
function switchToLogin() {
    closeRegisterModal();
    openLoginModal();
}

function switchToRegister() {
    closeLoginModal();
    openRegisterModal();
}

// Logout
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    alert('Logged out successfully');
    updateAuthUI();
    window.location.href = '#home';
}

// Update Auth UI
function updateAuthUI() {
    const authLinks = document.querySelector('.auth-links');
    const userMenu = document.getElementById('userMenu');

    if (currentUser) {
        authLinks.style.display = 'none';
        userMenu.style.display = 'flex';
    } else {
        authLinks.style.display = 'flex';
        userMenu.style.display = 'none';
    }
}

// Dashboard Functions
function openDashboard() {
    if (!currentUser) {
        alert('Please login first');
        openLoginModal();
        return;
    }

    displayUserBookings();
    displayProfileInfo();
    document.getElementById('dashboardModal').style.display = 'block';
}

function closeDashboardModal() {
    document.getElementById('dashboardModal').style.display = 'none';
}

function displayUserBookings() {
    const userBookings = bookings.filter(b => b.userId === currentUser.id);
    const bookingsDiv = document.getElementById('userBookings');

    if (userBookings.length === 0) {
        bookingsDiv.innerHTML = '<p>You have no bookings yet. <a href="#rooms">Browse rooms</a></p>';
        return;
    }

    bookingsDiv.innerHTML = userBookings.map(booking => `
        <div class="booking-card">
            <h4>${booking.roomName}</h4>
            <p><strong>Booking ID:</strong> ${booking.id}</p>
            <p><strong>Check-in:</strong> ${booking.checkIn}</p>
            <p><strong>Check-out:</strong> ${booking.checkOut}</p>
            <p><strong>Number of nights:</strong> ${booking.nights}</p>
            <p><strong>Total Price:</strong> $${booking.totalPrice}</p>
            <p><strong>Status:</strong> <span style="color: green; font-weight: bold;">${booking.status}</span></p>
            <p><strong>Booking Date:</strong> ${booking.bookingDate}</p>
            <div class="booking-actions">
                <button class="btn-modify" onclick="modifyBooking(${booking.id})">Modify</button>
                <button class="btn-cancel" onclick="cancelBooking(${booking.id})">Cancel</button>
            </div>
        </div>
    `).join('');
}

function displayProfileInfo() {
    const profileDiv = document.getElementById('profileInfo');
    profileDiv.innerHTML = `
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${currentUser.name}</p>
            <p><strong>Email:</strong> ${currentUser.email}</p>
            <p><strong>Registration Date:</strong> ${currentUser.registrationDate}</p>
            <p><strong>Total Bookings:</strong> ${bookings.filter(b => b.userId === currentUser.id).length}</p>
        </div>
    `;
}

function cancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this booking?')) {
        const bookingIndex = bookings.findIndex(b => b.id === bookingId);
        if (bookingIndex !== -1) {
            bookings[bookingIndex].status = 'Cancelled';
            localStorage.setItem('stayeaseBookings', JSON.stringify(bookings));
            alert('Booking cancelled successfully');
            displayUserBookings();
        }
    }
}

function modifyBooking(bookingId) {
    alert('Modification feature coming soon! Please contact support to modify your booking.');
}

function editProfile() {
    alert('Edit profile feature coming soon! Please contact support for account changes.');
}

// Tab Switching
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');

    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Contact Form
function submitContact(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = ['loginModal', 'registerModal', 'forgotPasswordModal', 'roomDetailsModal', 'bookingModal', 'dashboardModal'];

    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Close booking modal functions
function closeRoomDetailsModal() {
    document.getElementById('roomDetailsModal').style.display = 'none';
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
}
