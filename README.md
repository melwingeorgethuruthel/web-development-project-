<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StayEase - Online Hotel Room Booking</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- Navigation Bar -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">
                <i class="fas fa-hotel"></i> StayEase
            </div>
            <ul class="nav-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#rooms">Rooms</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li class="auth-links">
                    <a href="#" onclick="openLoginModal()">Login</a> | 
                    <a href="#" onclick="openRegisterModal()">Register</a>
                </li>
                <li class="user-menu" id="userMenu" style="display:none;">
                    <a href="#" onclick="openDashboard()">Dashboard</a> | 
                    <a href="#" onclick="logout()">Logout</a>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Home/Hero Section -->
    <section id="home" class="hero">
        <div class="hero-content">
            <h1>Welcome to StayEase</h1>
            <p>Book your perfect hotel room with ease and comfort</p>
            <div class="search-container">
                <input type="text" id="searchLocation" placeholder="Search location...">
                <input type="date" id="checkInDate">
                <input type="date" id="checkOutDate">
                <select id="guests">
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4+ Guests</option>
                </select>
                <button onclick="searchRooms()" class="search-btn">Search</button>
            </div>
        </div>
        <div class="hero-image">
            <img src="https://via.placeholder.com/600x400?text=Luxury+Hotel" alt="Hotel">
        </div>
    </section>

    <!-- Featured Rooms Section -->
    <section id="rooms" class="featured-rooms">
        <h2>Featured Rooms</h2>
        <div class="filter-section">
            <input type="range" id="priceFilter" min="0" max="1000" value="1000" onchange="filterByPrice()">
            <span id="priceValue">Max Price: $1000</span>
            <select id="roomTypeFilter" onchange="filterByType()">
                <option value="">All Types</option>
                <option value="standard">Standard</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
            </select>
        </div>
        <div class="rooms-grid" id="roomsGrid">
            <!-- Rooms will be dynamically loaded here -->
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <h2>About StayEase</h2>
        <p>StayEase is your trusted platform for finding and booking the perfect hotel room. With our easy-to-use interface and secure booking system, we make travel planning hassle-free.</p>
        <div class="features">
            <div class="feature-box">
                <i class="fas fa-search"></i>
                <h3>Easy Search</h3>
                <p>Find hotels and rooms instantly</p>
            </div>
            <div class="feature-box">
                <i class="fas fa-lock"></i>
                <h3>Secure Booking</h3>
                <p>Safe and encrypted transactions</p>
            </div>
            <div class="feature-box">
                <i class="fas fa-star"></i>
                <h3>Best Prices</h3>
                <p>Competitive rates guaranteed</p>
            </div>
            <div class="feature-box">
                <i class="fas fa-headset"></i>
                <h3>24/7 Support</h3>
                <p>Always here to help you</p>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <h2>Contact Us</h2>
        <form onsubmit="submitContact(event)">
            <input type="text" placeholder="Your Name" required>
            <input type="email" placeholder="Your Email" required>
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
        </form>
    </section>

    <!-- Footer -->
    <footer>
        <p>&copy; 2026 StayEase. All rights reserved.</p>
        <div class="social-links">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
    </footer>

    <!-- Login Modal -->
    <div id="loginModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeLoginModal()">&times;</span>
            <h2>Login</h2>
            <form onsubmit="handleLogin(event)">
                <input type="email" id="loginEmail" placeholder="Email" required>
                <input type="password" id="loginPassword" placeholder="Password" required>
                <button type="submit">Login</button>
                <p>Don't have an account? <a href="#" onclick="switchToRegister()">Register here</a></p>
                <a href="#" onclick="openForgotPasswordModal()">Forgot password?</a>
            </form>
        </div>
    </div>

    <!-- Register Modal -->
    <div id="registerModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeRegisterModal()">&times;</span>
            <h2>Register</h2>
            <form onsubmit="handleRegister(event)">
                <input type="text" id="registerName" placeholder="Full Name" required>
                <input type="email" id="registerEmail" placeholder="Email" required>
                <input type="password" id="registerPassword" placeholder="Password" required>
                <input type="password" id="registerConfirmPassword" placeholder="Confirm Password" required>
                <button type="submit">Register</button>
                <p>Already have an account? <a href="#" onclick="switchToLogin()">Login here</a></p>
            </form>
        </div>
    </div>

    <!-- Forgot Password Modal -->
    <div id="forgotPasswordModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeForgotPasswordModal()">&times;</span>
            <h2>Reset Password</h2>
            <form onsubmit="handleForgotPassword(event)">
                <input type="email" id="forgotEmail" placeholder="Enter your email" required>
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    </div>

    <!-- Room Details Modal -->
    <div id="roomDetailsModal" class="modal">
        <div class="modal-content room-details">
            <span class="close" onclick="closeRoomDetailsModal()">&times;</span>
            <div id="roomDetails"></div>
        </div>
    </div>

    <!-- Booking Modal -->
    <div id="bookingModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeBookingModal()">&times;</span>
            <h2>Confirm Your Booking</h2>
            <div id="bookingSummary"></div>
            <form onsubmit="confirmBooking(event)">
                <h3>Payment Information</h3>
                <input type="text" placeholder="Cardholder Name" required>
                <input type="text" placeholder="Card Number" required>
                <div class="payment-row">
                    <input type="text" placeholder="MM/YY" required>
                    <input type="text" placeholder="CVV" required>
                </div>
                <button type="submit">Complete Booking</button>
            </form>
        </div>
    </div>

    <!-- User Dashboard Modal -->
    <div id="dashboardModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeDashboardModal()">&times;</span>
            <h2>My Dashboard</h2>
            <div class="dashboard-tabs">
                <button class="tab-btn active" onclick="showTab('bookings')">My Bookings</button>
                <button class="tab-btn" onclick="showTab('profile')">Profile</button>
            </div>
            <div id="bookings" class="tab-content active">
                <h3>Your Bookings</h3>
                <div id="userBookings"></div>
            </div>
            <div id="profile" class="tab-content">
                <h3>Profile Information</h3>
                <div id="profileInfo"></div>
                <button onclick="editProfile()">Edit Profile</button>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
