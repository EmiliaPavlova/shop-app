import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import countries from '../data/countries.json';

const BillingForm = ({ formData, handleInputChange, errors }) => {
    const [countryOptions, setCountryOptions] = useState([]);

    useEffect(() => {
        setCountryOptions(countries);
    }, []);

    return (
        <Form className="bg-white p-3">
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Phone (+X XX XXX XX)"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.phone}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select a country</option>
                    {countryOptions.map((country) => (
                        <option key={country.code} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formZIP">
                <Form.Label>ZIP</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter ZIP"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
        </Form>
    );
}

export default BillingForm;
