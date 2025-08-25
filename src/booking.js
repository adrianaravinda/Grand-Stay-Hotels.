
document.addEventListener('DOMContentLoaded', () => {
    const singleRoomRadio = document.getElementById('single-room');
    const doubleRoomRadio = document.getElementById('double-room');
    const tripleRoomRadio = document.getElementById('triple-room');
    const numRoomsInput = document.getElementById('num-rooms');
    const numAdultsInput = document.getElementById('num-adults');
    const numChildrenInput = document.getElementById('num-children');
    const durationInput = document.getElementById('duration');
    const extraBedCheckbox = document.getElementById('extra-bed');
    const promoCodeInput = document.getElementById('promo-code');
    const currentCostDisplay = document.getElementById('current-cost');
    const overallCostDisplay = document.getElementById('overall-cost');
    const loyaltyPointsDisplay = document.getElementById('loyalty-points-display');
    const bookHotelBtn = document.getElementById('book-now-btn');
    const bookAdventureBtn = document.getElementById('book-adventure-btn');
    const addToFavBtn = document.getElementById('add-to-fav-btn');
    const checkLoyaltyBtn = document.getElementById('check-loyalty-btn');
    
    let overallBookingCost = 0;
    let loyaltyPoints = 0;

    function calculateCurrentCost() {
        let roomCost = 0;
        if (singleRoomRadio.checked) roomCost = 25000;
        else if (doubleRoomRadio.checked) roomCost = 35000;
        else if (tripleRoomRadio.checked) roomCost = 40000;

        const numberOfRooms = parseInt(numRoomsInput.value) || 0;
        const durationOfStay = parseInt(durationInput.value) || 0;
        let totalRoomCost = roomCost * numberOfRooms * durationOfStay;
        const numberOfChildren = parseInt(numChildrenInput.value) || 0;
        const childrenMealCost = numberOfChildren * 5000 * durationOfStay;
        const extraBedCost = extraBedCheckbox.checked ? (8000 * numberOfRooms * durationOfStay) : 0;

        let currentTotal = totalRoomCost + childrenMealCost + extraBedCost;
        
        if (promoCodeInput.value.trim().toUpperCase() === 'PROMO123') {
            currentTotal *= 0.95; // Apply 5% discount
        }

        currentCostDisplay.textContent = `LKR ${currentTotal.toFixed(2)}`;
        return currentTotal;
    }

    
    const allInputs = document.querySelectorAll('#booking-form input');
    allInputs.forEach(input => input.addEventListener('change', calculateCurrentCost));

    bookHotelBtn.addEventListener('click', () => {
        const currentBookingCost = calculateCurrentCost();
        if (currentBookingCost <= 0) {
            alert("Please select your booking details first.");
            return;
        }

        overallBookingCost += currentBookingCost;
        overallCostDisplay.textContent = `LKR ${overallBookingCost.toFixed(2)}`;

        // --- Loyalty Points Logic ---
        const numberOfRooms = parseInt(numRoomsInput.value) || 0;
        if (numberOfRooms > 3) {
            const earnedPoints = numberOfRooms * 20;
            loyaltyPoints += earnedPoints;
            localStorage.setItem('userLoyaltyPoints', loyaltyPoints);
            alert(`Congratulations! You've earned ${earnedPoints} loyalty points! Your new total is ${loyaltyPoints}.`);
            loyaltyPointsDisplay.textContent = loyaltyPoints;
        }
        
        alert('Thank you! Your hotel booking has been added to the overall bill.');
        document.getElementById('booking-form').reset();
        calculateCurrentCost();
    });

    // --- BOOK ADVENTURE BUTTON LOGIC ---
    bookHotelBtn.addEventListener('click', () => {
        const currentBookingCost = calculateCurrentCost();
        if (currentBookingCost <= 0) {
            alert("Please select your booking details first.");
            return;
        }

        overallBookingCost += currentBookingCost;
        overallCostDisplay.textContent = `LKR ${overallBookingCost.toFixed(2)}`;

        const numberOfRooms = parseInt(numRoomsInput.value) || 0;
        if (numberOfRooms > 3) {
            const earnedPoints = numberOfRooms * 20;
            loyaltyPoints += earnedPoints;
            localStorage.setItem('userLoyaltyPoints', loyaltyPoints);
            alert(`Congratulations! You've earned ${earnedPoints} loyalty points! Your new total is ${loyaltyPoints}.`);
            loyaltyPointsDisplay.textContent = loyaltyPoints;
        }
        alert('Thank you! Your hotel booking has been added to the overall bill.');
        document.getElementById('booking-form').reset();
        calculateCurrentCost();
    });
    addToFavBtn.addEventListener('click', () => {
        const favouriteBooking = {
            roomType: singleRoomRadio.checked ? 'Single' : (doubleRoomRadio.checked ? 'Double' : 'Triple'),
            rooms: numRoomsInput.value,
            adults: numAdultsInput.value,
            children: numChildrenInput.value,
            duration: durationInput.value,
            extraBed: extraBedCheckbox.checked,
        };

        localStorage.setItem('favouriteBooking', JSON.stringify(favouriteBooking));
        alert('Your current booking has been saved as a favourite!');
    });
    checkLoyaltyBtn.addEventListener('click', () => {
        const savedPoints = localStorage.getItem('userLoyaltyPoints') || 0;
        loyaltyPoints = parseInt(savedPoints);
        loyaltyPointsDisplay.textContent = loyaltyPoints;
        alert(`You have a total of ${loyaltyPoints} loyalty points.`);
    });
    const savedPoints = localStorage.getItem('userLoyaltyPoints') || 0;
    loyaltyPoints = parseInt(savedPoints);
    loyaltyPointsDisplay.textContent = loyaltyPoints;
    
    calculateCurrentCost();
});