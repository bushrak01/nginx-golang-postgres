import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Container} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import logo from "./imperiaLogo.png"
import {Link} from "react-router-dom";
import React from "react";

function Patient() {
    return (
        <Container className="p-2">
            <Row className="p-1 mt-4 bg-light-subtle">
                <Col>
                    <Image src="" thumbnail width="200px" height="300px" />
                </Col>
                <Col>
                    <ul>
                        <li>
                            Name:
                        </li>
                        <li>
                            Date of birth:
                        </li>
                        <li>
                            Gender:
                        </li>
                        <li>
                            Contact Number:
                        </li>
                    </ul>
                </Col>
            </Row>
            <Row className="p-1 mt-4 bg-light-subtle">
            </Row>
        </Container>
    );
}

export default Patient;
