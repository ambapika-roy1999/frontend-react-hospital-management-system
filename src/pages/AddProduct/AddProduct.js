import React,{useEffect,useState} from 'react';

import UiContent from '../../Components/Common/UiContent';
//import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Row, UncontrolledDropdown,Table,Button } from 'reactstrap';
import PreviewCardHeader from '../../Components/Common/PreviewCardHeader';
import { InputExample, InputSizing, FileInput, InputGroup, InputGroupSizing, MultipleInputs, ButtonsCheckboxesRadiosGroup, ButtonsWithDropdowns, CustomForms } from '../Forms/BasicElements/BasicElementCode';
import Select from "react-select";
import axios from 'axios';
import GlobalAlert from '../GlobalAlert/GlobalAlert';
import { DefaultTables} from '../Tables/BasicTables/BasicTablesCode';
import { Link } from 'react-router-dom';

const AddProducts=()=>{
    document.title="Dashboard | Velzon - React Admin & Dashboard Template";
    const[specialization,setSpecialization] = useState('');
    const[doctorType, setDoctorType]=useState('1');
    const[doctorName, setDoctorName]=useState('');
    const[doctorAddress, setDoctorAddress]=useState('');
    const[doctorFees, setDoctorFees]=useState('');
    const[doctorContact, setDoctorContact]=useState('');
    const[doctoremail, setDoctorEmail]=useState('');
    const [show,setShow]=useState(false);
    const[showAllList, setShowAllList]=useState([]);
    const[res,setRes]=useState([]);
    const [modal_positionTop, setmodal_positionTop] = useState(false);
    
    useEffect (()=>{
        console.log('add product')
        const fetchData = async () => {
                    try {
                      const response = await axios.get('http://localhost:8000/api/show_doctor_list');
                      console.log('doctor_list', response);
                      setSpecialization(response)
                      // Handle the response data here
                    } catch (error) {
                      // Handle errors here
                    }
                  };

                  fetchData(); 
    },[]);
    useEffect(()=>{
        console.log('hi')
        const fetchData1 = async () => {
            try {
              const response = await axios.get('http://localhost:8000/api/show_all_doctor');
              console.log('doctor list', response);
              setShowAllList(response);
              // Handle the response data here
            } catch (error) {
              // Handle errors here
            }
          };
      
          fetchData1(); 
    },[res])
    useEffect(()=>{
        console.log('hi')
        const fetchData2 = async () => {
            try {
              const response = await axios.get('http://localhost:8000/api/show_all_doctor');
              setShowAllList(response);
              console.log('doctor', response);
              console.log('doctor test',Array.isArray(response));

              // Handle the response data here
            } catch (error) {
              // Handle errors here
            }
          };
      
          fetchData2(); 
    },[]);
    async function addDoctor(){
        let doctorObj = {'doctor_name': doctorName, 'doctor_address': doctorAddress, 'doctor_type': doctorType, 'doctor_fees': doctorFees, 'doctor_contact_no':doctorContact,'doctor_email':doctoremail};
        console.log('doctor_details', doctorObj);
        try {
            const response = await axios.post('http://localhost:8000/api/add-doctor',doctorObj);
            console.log('doctor', response);
            setShow(true); 
            setRes(response);

            //setSpecialization(response)
            

            // Handle the response data here
          } catch (error) {
            // Handle errors here
          }
    }
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Basic Elements" pageTitle="Forms" />
                    {show==true?<GlobalAlert setShow={setShow} show={show}/>:''}
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Add doctor" />
                                <CardBody className="card-body">
                                    <div className="live-preview">
                                        <Row className="gy-4" >
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="exampleInputrounded" className="form-label">Select doctor specialization:</Label>
                                                    <select className="form-select rounded-pill mb-3" aria-label="Default select example" value={doctorType} onChange={(event)=>{console.log(event);setDoctorType(event.target.value)}}>
                                                       {
                                                       specialization=='' ? <option>Search for services</option>:
                                                        specialization.map((obj,index)=>(
                                                            <option key={index} value={obj.id}>{obj.specialization_name}</option>
                                                             ))
                                                       }
                                                        {/* <option >Search for services</option>
                                                        <option defaultValue="1">Information Architecture</option>
                                                        <option defaultValue="2">UI/UX Design</option>
                                                        <option defaultValue="3">Back End Development</option> */}
                                                    </select>
                                                </div>
                                            </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="exampleInputrounded" className="form-label">Doctor name:</Label>
                                                        <Input type="text" className="form-control rounded-pill" id="exampleInputrounded" placeholder="Enter Doctor name" value={doctorName} onChange={(event)=>{setDoctorName(event.target.value)}}/>
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="exampleInputrounded" className="form-label">Doctor clinic address</Label>
                                                        <Input type="text" className="form-control rounded-pill" id="exampleInputrounded" placeholder="Enter Doctor clinic address" value={doctorAddress} onChange={(event)=>{setDoctorAddress(event.target.value)}} />
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="exampleInputrounded" className="form-label">Doctor consultency fees</Label>
                                                        <Input type="text" className="form-control rounded-pill" id="exampleInputrounded" placeholder="Enter Doctor consultency fees" value={doctorFees} onChange={(event)=>{setDoctorFees(event.target.value)}} />
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="exampleInputrounded" className="form-label">Doctor contact no</Label>
                                                        <Input type="text" className="form-control rounded-pill" id="exampleInputrounded" placeholder="Enter Doctor contact no" value={doctorContact} onChange={(event)=>{setDoctorContact(event.target.value)}} />
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="exampleInputrounded" className="form-label">Doctor email address</Label>
                                                        <Input type="text" className="form-control rounded-pill" id="exampleInputrounded" placeholder="Enter Doctor email address" value={doctoremail} onChange={(event)=>{setDoctorEmail(event.target.value)}} />
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <br/><button type="button"className="btn btn-primary" onClick={addDoctor}>Submit</button>
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

                <Container fluid>
                    <Row>
                    <Col xl={12}>
                            <Card>
                                <PreviewCardHeader title="Doctors List" />
                                <CardBody>
                                    <div className="live-preview">
                                        <div className="table-responsive">
                                            <Table className="align-middle table-nowrap mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Specialization</th>
                                                        <th scope="col">Doctor Name</th>
                                                        <th scope="col">Doctor Address</th>
                                                        <th scope="col">Fees</th>
                                                        <th scope="col">Contact No</th>
                                                        <th scope="col">Email</th>
                                                        {/* <th scope="col">Date</th>
                                                        <th scope="col">Invoice</th> */}
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {  
                                                   showAllList.map((obj,index)=>(
                                                          <tr key={index}>
                                                          <td>{obj.doctor_type.specialization_name}</td>
                                                          <td>{obj.doctor_name}</td>
                                                          <td>{obj.doctor_address}</td>
                                                          <td>{obj.doctor_fees}</td>
                                                          <td>{obj.doctor_contact_no}</td>
                                                          <td>{obj.doctor_email}</td>
                                                          <td>
                                                              <div className="hstack gap-3 flex-wrap">
                                                                  <Link to="/edit-doctor-specialization" className="link-success fs-15"><i className="ri-edit-2-line"></i></Link>
                                                                  <Link to="#" className="link-danger fs-15"><i className="ri-delete-bin-line"></i></Link>
                                                                  {/* <Button color="primary" onClick={() => tog_positionTop()}>Top Modal</Button> */}
                                                              </div>
                                                          </td>
                                                      </tr>
                                                   ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ "height": "275px" }}>
                                            <code>
                                                <DefaultTables />
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
export default AddProducts;