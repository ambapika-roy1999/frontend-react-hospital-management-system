import { Alert, Card, CardBody, Col, Container, Row, UncontrolledAlert } from 'reactstrap';
import { useState } from 'react';
function GlobalAlert({setShow,show}){

    const onDismiss = () => setShow(false);
return(
    <Alert color="primary" isOpen={show} toggle={onDismiss}>
        <strong> Hi! </strong> A simple <b>Primary alert</b> —check it out!
    </Alert>
);
}
export default GlobalAlert;