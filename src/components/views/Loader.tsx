import React from 'react';
import {
    Col,
    ProgressBar,
    Row,
} from 'react-bootstrap';

export default () => {
    return (<Row>
        <Col lg={6} lgOffset={3}>
            <ProgressBar active={true} now={85} />
        </Col>
    </Row>);
};
