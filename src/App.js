import React, { Component } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';

class MyComponent extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            duration: 0,
            resource: 0,
            id: '',
            message: '',
            error: null,
        };
    }

    postData = (e) => {
        e.preventDefault();
        const { name, duration, resource, id } = this.state;
        Axios.post('/project', { name, duration, resource, id })
            .then(response => {
                this.setState({ message: 'Data submitted successfully.', error: null });
            })
            .catch(error => {
                this.setState({ error: 'There was an error during submission.', message: '' });
            });
    }

    handleInputChange = e => {
        let value = e.target.value;

        if (e.target.name === 'duration' || e.target.name === 'resource') {
            value = parseInt(value, 10);
        }

        this.setState({ [e.target.name]: value });
    }

    render() {
        return (
            <Form onSubmit={this.postData}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" onChange={this.handleInputChange} placeholder="Enter Name" />
                </Form.Group>

                <Form.Group controlId="formDuration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control type="number" name="duration" onChange={this.handleInputChange} placeholder="Enter Duration" />
                </Form.Group>

                <Form.Group controlId="formResource">
                    <Form.Label>Resource</Form.Label>
                    <Form.Control type="number" name="resource" onChange={this.handleInputChange} placeholder="Enter Resource" />
                </Form.Group>

                <Form.Group controlId="formId">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="text" name="id" onChange={this.handleInputChange} placeholder="Enter ID" />
                </Form.Group>

                <div>
                    { this.state.message && <p>{this.state.message}</p> }
                    { this.state.error && <p>{this.state.error}</p> }
                    <Button variant="primary" type="submit">Submit</Button>
                </div>
            </Form>

        );
    }
}

export default MyComponent;
