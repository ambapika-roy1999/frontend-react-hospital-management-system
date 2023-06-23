import React from 'react';
import { Link } from 'react-router-dom';
import UiContent from '../../Components/Common/UiContent';
//import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import PreviewCardHeader from '../../Components/Common/PreviewCardHeader';
import {Card, CardBody, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Row, UncontrolledDropdown ,Table} from 'reactstrap';
import { InputExample, InputSizing, FileInput, InputGroup, InputGroupSizing, MultipleInputs, ButtonsCheckboxesRadiosGroup, ButtonsWithDropdowns, CustomForms } from '../Forms/BasicElements/BasicElementCode';
import { DefaultTables} from '../Tables/BasicTables/BasicTablesCode';
import GlobalAlert from '../GlobalAlert/GlobalAlert';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const EditDoctorSpecialization=()=>{
const [show,setShow]=useState(false);

    document.title="Dashboard | Velzon - React Admin & Dashboard Template";
    console.log('edit doctor specialization')
    async function update_special(){
        
            try {
                let type_obj = {'specialization_name': type, 'id': id};
                const response = await axios.post('http://localhost:8000/api/update-doctor-type',type_obj);
                console.log('specilaization updated', response);
              //  setShow(true); 
               // setShowList(response);
                // Handle the response data here
              } catch (error) {
                // Handle errors here
              }
        setShow(true); 

    }
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const [type, setType] = useState(searchParams.get('specialization'));
  console.log('special',type)
  
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Basic Elements" pageTitle="Forms" />
                   {show==1?<GlobalAlert setShow={setShow} show={show}/>:''}
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Edit specialization" />
                                <CardBody className="card-body">
                                    <div className="live-preview">
                                        <Row className="gy-4" >
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="exampleInputrounded" className="form-label">Doctor specialization</Label>
                                                    <Input type="text" className="form-control rounded-pill" id="exampleInputrounded" placeholder="Edit specialization" value={type} onChange={(event)=>{setType(event.target.value)}}/>
                                                </div>
                                            </Col>
                                            <Col xxl={3} md={6}>
                                                <br/><button type="button"className="btn btn-primary" onClick={update_special}>Update</button>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "352px" }}>
                                            <code>
                                                <InputExample />
                                            </code>
                                        </pre>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>   
                </Container>
            </div>
        </React.Fragment>
    );
}
export default EditDoctorSpecialization;