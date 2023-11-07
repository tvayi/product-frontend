import React, { Component } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Card, ListGroup, Alert} from 'react-bootstrap';

class MyComponent extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            name: '',
            weight: 0,
            description: '',
            error: null,
            formVisible: false,
            order: [],
        };
    }

    componentDidMount() {
        Axios.get('/product')
            .then(response => {
                this.setState({ products: response.data });
            })
            .catch(error => {
                console.log(error);

                const mockResponse = [
                    { id:1, name: 'product 1', weight: '20', description: 'Description 1' },
                    { id:2, name: 'product 2', weight: '30', description: 'Description 2' },
                    { id:3, name: 'product 3', weight: '40', description: 'Description 3' },
                ];

                this.setState({ products: mockResponse });
            });
    }

    addToOrder = (product) => {
        this.setState(prevState => ({
            order: [...prevState.order, product]
        }))
    }

    processOrder = () => {
        Axios.post('/order', this.state.order)
            .then(response => {
                this.setState({ message: 'Order processed successfully.', error: null });
            })
            .catch(error => {
                this.setState({
                    error: `Order was added (mock response because server in unavailable) Products in order: ${JSON.stringify(this.state.order)}`,
                    message: ''
                });
            });
    }
    postData = (e) => {
        e.preventDefault();
        const { name, weight, description, id } = this.state;
        Axios.post('/product', { name, weight, description, id })
            .then(response => {
                this.setState({ message: 'Data submitted successfully.', error: null });
            })
            .catch(error => {
                this.setState({
                    error: `Product was added (mock response because server in unavailable)`,
                    message: ''
                });
            });
    }

    handleInputChange = e => {
        let value = e.target.value;

        if (e.target.name === 'weight') {
            value = parseInt(value, 10);
        }

        this.setState({ [e.target.name]: value });
    }

    toggleFormVisibility = () => {
        this.setState(prevState => ({
            formVisible: !prevState.formVisible
        }));
    }

    renderForm = () => (
        <Form onSubmit={this.postData}>
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" onChange={this.handleInputChange} placeholder="Enter product name" />
            </Form.Group>

            <Form.Group controlId="formWeight">
                <Form.Label>Weight</Form.Label>
                <Form.Control type="number" name="weight" onChange={this.handleInputChange} placeholder="Enter product weight" />
            </Form.Group>

            <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" onChange={this.handleInputChange} placeholder="Enter product description" />
            </Form.Group>

            <div>
                { this.state.message && <p>{this.state.message}</p> }
                { this.state.error && <p>{this.state.error}</p> }
                <Button variant="primary" type="submit">Submit</Button>
            </div>
        </Form>
    )

    renderProductList = () => (
        <ListGroup>
            {this.state.products.map(product => (
                <ListGroup.Item key={product.id}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>
                                Weight: {product.weight} <br/>
                                Description: {product.description}
                            </Card.Text>
                            <Button variant="primary" onClick={() => this.addToOrder(product)}>Add to Order</Button>
                        </Card.Body>
                    </Card>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )

    renderAlert = () => {
        const { message, error } = this.state;

        if (message) {
            return <Alert variant='success'>{message}</Alert>;
        }

        if (error) {
            return <Alert variant='danger'>{error}</Alert>;
        }

        return null;
    }

    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.toggleFormVisibility}>
                    Add product
                </Button>

                {this.state.formVisible && this.renderForm()}
                <div>
                    <h2>All Products</h2>
                    {this.renderProductList()}
                </div>
                <Button variant="secondary" onClick={this.processOrder} disabled={this.state.order.length === 0}>
                    Process Order
                </Button>
                {this.renderAlert()}
            </div>
        );
    }
}


export default MyComponent;
