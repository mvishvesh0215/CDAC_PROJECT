const express = require('express')
const db = require('../db')
const bcrypt = require("bcrypt")
const utils = require('../utils')
const verifyCustomerToken = require("../authMiddleware");

const router = express.Router()

// Get all vendors which are located in the customer address
router.get('/all-vendor', verifyCustomerToken, (request, response) => {
    const customer_id = request.query.customer_id
    // console.log(customer_id)
    // const customer_id = request.params.customer_id

    if (!customer_id) {
        return response.status(400).json({
            error: "customer_id is required"
        })
    }

    // Get the customer's address_id
    const query1 = `SELECT address_id FROM user WHERE id = ? and user_role = 'ROLE_CUSTOMER'`;
    db.pool.query(query1, [customer_id], (error, customerRows) => {
        if (error) {
            response.send(utils.createError(error))
        } else {
            if (customerRows.length === 0) {
                response.send(utils.createError("Customer not found"))
            } else {
                const address_id = customerRows[0].address_id

                // Get the city where the customer is located
                const query2 = `SELECT city FROM address WHERE id = ?`
                db.pool.query(query2, [address_id], (error, addressRows) => {
                    if (error) {
                        response.send(utils.createError(error))
                    } else {
                        if (addressRows.length === 0) {
                            response.send(utils.createError("Address not found"))
                        } else {
                            const city = addressRows[0].city
                            console.log(city)
                            // Get all vendors in the same city
                            const query3 = `SELECT id, first_name, last_name FROM user WHERE address_id IN (SELECT id FROM address WHERE city = ?) and user_role = 'ROLE_VENDOR'`
                            db.pool.query(query3, [city], (error, vendorRows) => {
                                if (error) {
                                    response.send(utils.createError(error))
                                } else {
                                    if (vendorRows.length === 0) {
                                        response.send(utils.createError("No vendors found in this city"))
                                    } else {
                                        console.log(vendorRows)
                                        response.send(utils.createSuccess(vendorRows));
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    })
})

// Get all subscriptions of vendor that has been selected
router.get('/all-subscription', verifyCustomerToken, (request, response) => {
    const vendor_id = request.query.vendor_id

    if (!vendor_id) {
        return response.status(400).json({
            error: "Please select the vendor"
        })
    }

    const query = `SELECT id,minimum_quantity,subscription_name,unit_price,vendor_id FROM subscription WHERE vendor_id = ?`
    db.pool.query(query, [vendor_id], (error, subscriptionRows) => {
        if (error) {
            response.send(utils.createError(error))
        } else {
            if (subscriptionRows.length === 0) {
                response.send(utils.createError("No subscriptions found for this vendor"))
            } else {
                response.send(utils.createSuccess(subscriptionRows))
            }
        }
    })
})

// Updating customer profile
router.put('/profile', verifyCustomerToken, (request, response) => {
    const id = request.query.customer_id

    // console.log(id)
    const {
        first_name,
        last_name,
        phone_no,
        password,
        address,
        city,
        state,
        pincode
    } = request.body
    // console.log(request.body)
    // Hash password before saving
    bcrypt.hash(password, 10, (error, hashedPassword) => {
        if (error) {
            response.send(utils.createError(error));
        } else {
            // Update User table
            const statement1 = `
                UPDATE User
                SET first_name = ?, last_name = ?, phone_no = ?, password = ?
                WHERE id = ?`

            db.pool.query(statement1, [first_name, last_name, phone_no, hashedPassword, id], (error) => {
                if (error) {
                    response.send(utils.createError(error))
                } else {
                    // Get address_id
                    const statement2 = `SELECT address_id FROM User WHERE id = ?`
                    db.pool.query(statement2, [id], (error, rows) => {
                        if (error) {
                            response.send(utils.createError(error))
                        } else {
                            if (rows.length === 0) {
                                response.send(utils.createError("User not found"));
                            } else {
                                const address_id = rows[0].address_id

                                // Update Address table
                                const statement3 = `
                                    UPDATE Address
                                    SET address = ?, city = ?, state = ?, pincode = ?
                                    WHERE id = ?
                                `;

                                db.pool.query(statement3, [address, city, state, pincode, address_id], (error) => {
                                    if (error) {
                                        response.send(utils.createError(error));
                                    } else {
                                        response.send(utils.createSuccess({
                                            message: "Profile updated successfully"
                                        }))
                                    }
                                })
                            }
                        }
                    })
                }
            })
        }
    })
})


//get customer details for profile
router.get('/profile', verifyCustomerToken, (request, response) => {
    const userId = request.query.customer_id; // Extract user ID from the URL parameter
    // console.log(userId)
    const statement = `
        SELECT user_name, first_name, last_name, email, phone_no, aadhar_card, pan_card, password, address_id
        FROM user
        WHERE id = ?
    `;

    // Query the database to get user details
    db.pool.query(statement, [userId], (error, users) => {
        if (error) {
            response.send(utils.createError(error));
        } else {
            if (users.length === 0) {
                response.send(utils.createError('User does not exist'));
            } else {
                const address_id = users[0].address_id; // Corrected variable

                // Query to get the address details
                const statement2 = `SELECT address, city, state, pincode FROM Address WHERE id = ?`;

                db.pool.query(statement2, [address_id], (error, addressRows) => {
                    if (error) {
                        response.send(utils.createError(error));
                    } else {
                        response.send(utils.createSuccess({
                            user: users[0],
                            address: addressRows.length > 0 ? addressRows[0] : null // Handle empty address case
                        }));
                    }
                });
            }
        }
    });
});

router.post('/buy-subscription', verifyCustomerToken, (request, response) => {
    const { buy_price, quantity, customer_id, subscription_id } = request.body;
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date (YYYY-MM-DD)

    // Validate input values
    if (!customer_id || !subscription_id || !buy_price || !quantity) {
        return response.status(400).send(utils.createError("All fields (customer_id, subscription_id, buy_price, quantity) are required"));
    }

    const statement = `
        INSERT INTO transaction (customer_id, subscription_id, buy_price, quantity, created_on, updated_on)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.pool.query(statement, [customer_id, subscription_id, buy_price, quantity, currentDate, currentDate], (error, result) => {
        if (error) {
            console.error("Error inserting transaction:", error);
            return response.status(500).send(utils.createError("Internal server error"));
        }

        response.send(utils.createSuccess({
            message: "Subscription purchased successfully",
            transactionId: result.insertId, // Return the newly inserted transaction ID
            customer_id,
            subscription_id,
            buy_price,
            quantity,
            created_on: currentDate,
            updated_on: currentDate
        }));
    });
});



module.exports = router