const bookingId = getParameterByName('bookingId');
const user_id = getParameterByName('userId');
const HOST = '3.83.253.202';

function getBookingDetails(bookingId, renderTarget, renderMethod) {
    const userApiUrl = `http://${HOST}/api/v1/users/${user_id}`;
    $.ajax({
        url: userApiUrl,
        method: 'GET',
        success: function (data) {
            const first_name = data.first_name;
            const last_name = data.last_name;
            const userName = first_name + ' ' + last_name;
            const userEmail = data.email;

            const bookingApiUrl = `http://${HOST}/api/v1/bookings/${bookingId}`;
            $.ajax({
                url: bookingApiUrl,
                method: 'GET',
                success: function (data) {
                    const id = data.id;
                    const car_id = data.car_id;
                    const bookingDate = data.created_at;
                    const pickup_date = data.pickup_date;
                    const return_date = data.return_date;
                    const total_cost = data.total_cost.toFixed(2);
                    const formattedDateString = new Date(bookingDate);
                    const booking_date = formattedDateString.toUTCString();

                    const carApiUrl = `http://${HOST}/api/v1/cars/${car_id}`;
                    $.ajax({
                        url: carApiUrl,
                        method: "GET",
                        success: function (data) {
                            const price_by_day = data.price_by_day.toFixed(2);
                                        const image_url = data.image_url.replace(/ /g, '_');
                            const location_id = data.location_id;
                            const brand = data.brand;
                            const model = data.model;
                            const year = data.year;
                            const car_type = brand + ' ' + model + ' ' + year;

                            const locationApiUrl = `http://${HOST}/api/v1/locations/${location_id}`;
                            $.ajax({
                                url: locationApiUrl,
                                method: "GET",
                                success: function (data) {
                                    const locationName = data.name;
                                    const locationAddress = data.address;

                                    const bookingDetailsHtml1 = `
                                        <div class="card-header bg-primary text-white">
                                          <h2 class="h4 mb-0">Booking Details</h2>
                                        </div>
                                        <div class="card-body">
                                          <div class="row d-flex align-items-stretch">
                                            <div class="col-lg-6 d-flex flex-column">
                                              <ul class="list-group flex-grow-1">
                                                <li class="list-group-item"><strong>Booking ID:</strong> ${bookingId}</li>
                                                <li class="list-group-item"><strong>Booking Date:</strong> ${booking_date}</li>
                                                <li class="list-group-item"><strong>Customer Name:</strong> ${userName}</li>
                                                <li class="list-group-item"><strong>Pickup Date:</strong> ${pickup_date}</li>
                                                <li class="list-group-item"><strong>Return Date:</strong> ${return_date}</li>
                                                <li class="list-group-item"><strong>Total Rental Cost:</strong> $${total_cost}</li>
                                                <li class="list-group-item"><strong>Booking Status:</strong> Confirmed</li>
                                                <li class="list-group-item"><strong>Payment Method:</strong> Credit Card</li>
                                                <li class="list-group-item"><strong>Customer Contact:</strong> ${userEmail}</li>
                                              </ul>
                                            </div>
                                            <div class="col-lg-6 d-flex flex-column">
                                              <ul class="list-group flex-grow-1">
                                                <li class="list-group-item d-flex justify-content-center align-items-center">
                                                <img id="carImage" src="${image_url}" alt="Selected Car" class="img-fluid rounded" style="height: 245px;">
                                                </li>
                                                <li class="list-group-item"><strong>Car Type:</strong> ${car_type}</li>
                                                <li class="list-group-item"><strong>Daily Rental Cost:</strong> $${price_by_day}</li>
                                                <li class="list-group-item"><strong>Rental Location:</strong> ${locationName}</li>
                                                <li class="list-group-item"><strong>Location Address:</strong> ${locationAddress}</li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                    `;
                                    const bookingDetailsHtml2 = `
                                        <div class="booking-details card mb-4 shadow-lg">
                                          ${bookingDetailsHtml1}
                                        </div>
                                    `;
                                    if (renderMethod === 'append') {
                                        renderTarget.append(bookingDetailsHtml2);
                                    } else if (renderMethod === 'html') {
                                        renderTarget.html(bookingDetailsHtml1);
                                    } else {
                                        console.error("Invalid renderMethod specified. Use 'append' or 'html'.");
                                    }
                                },
                                error: function (error) {
                                    console.error("Error fetching location details:", error);
                                }
                            });
                        },
                        error: function (error) {
                            console.error("Error fetching car details:", error);
                        }
                    });
                },
                error: function (error) {
                    console.error("Error fetching booking details:", error);
                }
            });
        },
        error: function (error) {
            console.error("Error fetching user info:", error);
        }
    });
}

$(document).ready(function() {
    setTimeout(function() {
        const userBookingsApiUrl = `http://${HOST}/api/v1/users/${user_id}/bookings`;

        // Fetch and display specific booking information
        getBookingDetails(bookingId, $(".booking-details"), 'html');
        // Fetch and display all user bookings
        $.ajax({
            url: userBookingsApiUrl,
            method: 'GET',
            success: function (userBookings) {
                for (const booking of userBookings) {
                    const bookingId = booking.id;
                    getBookingDetails(bookingId, $(".user-bookings"), 'append');
                }
            },
            error: function (error) {
                console.error("Error fetching user bookings:", error);
            }
        });
    }, 2000); // Simulated loading time of 2 seconds
});
