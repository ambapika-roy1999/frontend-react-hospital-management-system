import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import UiContent from '../../Components/Common/UiContent';
//import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import PreviewCardHeader from '../../Components/Common/PreviewCardHeader';
import {Card, CardBody, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Row, UncontrolledDropdown ,Table,Button,Modal, ModalBody, ModalHeader,} from 'reactstrap';
import { InputExample, InputSizing, FileInput, InputGroup, InputGroupSizing, MultipleInputs, ButtonsCheckboxesRadiosGroup, ButtonsWithDropdowns, CustomForms } from '../Forms/BasicElements/BasicElementCode';
import { DefaultTables} from '../Tables/BasicTables/BasicTablesCode';
import axios from 'axios';
import GlobalAlert from '../GlobalAlert/GlobalAlert';

const AddDoctorSpecialization=()=>{
    document.title="Dashboard | Velzon - React Admin & Dashboard Template";
    console.log('add doctor specialization')
    const[doctorType, setDoctorType]=useState('');
    const [show,setShow]=useState(false);
    const[showList, setShowList]=useState(false);
    const[showAllList, setShowAllList]=useState([]);
    const [modal_positionTop, setmodal_positionTop] = useState(false);
    const[currentId, setCurrentId]= useState('');

    function tog_positionTop(id) {
        setmodal_positionTop(!modal_positionTop);
        setCurrentId(id);
        console.log('deleted_id',currentId)      
    }
    async function delete_type(id){
         try {
           const response = await axios.post('http://localhost:8000/api/delete-doctor-type',{'id':id});
            console.log('deleted_doctor', response);
            setShowList(response);
            // Handle the response data here
          } catch (error) {
            // Handle errors here
          }
    }


    useEffect(()=>{
        
        const fetchData1 = async () => {
            try {
              const response = await axios.get('http://localhost:8000/api/show_doctor_list');
              console.log('doctor list', response);
              setShowAllList(response);
              // Handle the response data here
            } catch (error) {
              // Handle errors here
            }
          };
      
          fetchData1(); 
    },[showList])
    useEffect(()=>{

        const fetchData = async () => {
            try {
              const response = await axios.get('http://localhost:8000/api/show_doctor_list');
              setShowAllList(response);
              console.log('doctor', response);
              console.log('doctor test',Array.isArray(response));
              // Handle the response data here
            } catch (error) {
              // Handle errors here
            }
          };
      
          fetchData(); 
    },[]);
    async function addDoctorType(){
        try {
            setDoctorType('');
            let type_obj = {'specialization_name': doctorType};
            const response = await axios.post('http://localhost:8000/api/add-doctor-type',type_obj);
            console.log('specilaization added', response);
            setShow(true); 
            setShowList(response);
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
                                <PreviewCardHeader title="Add specialization" />
                                <CardBody className="card-body">
                                    <div className="live-preview">
                                        <Row className="gy-4" >
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="exampleInputrounded" className="form-label">Doctor specialization</Label>
                                                    <Input type="text" className="form-control rounded-pill" id="exampleInputrounded" placeholder="Enter Doctor specialization" value={doctorType} onChange={(event)=>{setDoctorType(event.target.value)}}/>
                                                </div>
                                            </Col>
                                            <Col xxl={3} md={6}>
                                                <br/><button type="button"className="btn btn-primary"  onClick={addDoctorType}>Submit</button>
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
                                    <PreviewCardHeader title="Doctor Specialization List" />
                                    <CardBody>
                                        <div className="live-preview">
                                            <div className="table-responsive">
                                                <Table className="align-middle table-nowrap mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Specialization</th>
                                                            <th scope="col">Addition date</th>
                                                            {/* <th scope="col">Date</th>
                                                            <th scope="col">Invoice</th> */}
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {  
                                                    showAllList.map((obj,index)=>(
                                                            <tr key={index}>
                                                            <td>{obj.specialization_name}</td>
                                                            <td>{obj.created_at}</td>
                                                            <td>
                                                                <div className="hstack gap-3 flex-wrap">
                                                                    <Link to={`/edit-doctor-specialization?id=${obj.id}&specialization=${obj.specialization_name}`} className="link-success fs-15"><i className="ri-edit-2-line"></i></Link>
                                                                    <Button color="primary" onClick={() => tog_positionTop(obj.id)}><i className="ri-delete-bin-line" value={obj.id}></i></Button>
                                                                </div>
                                                            </td>
                                                        </tr> 
                                                    ))}
                                                    
                                                            {/* <tr>
                                                            <th scope="row"><Link to="#" className="fw-medium"></Link></th>
                                                            <td></td>
                                                            <td>October 15, 2021</td>
                                                            <td>$2,300</td>
                                                            <td>
                                                                <div className="hstack gap-3 flex-wrap">
                                                                    <Link to="/edit-doctor-specialization" className="link-success fs-15"><i className="ri-edit-2-line"></i></Link>
                                                                    <Link to="#" className="link-danger fs-15"><i className="ri-delete-bin-line"></i></Link>
                                                                </div>
                                                            </td>
                                                        </tr> */}
                                                    
                                                        
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
                    <Modal id="topmodal" isOpen={modal_positionTop} toggle={() => { tog_positionTop         (currentId); }} >
                        <ModalHeader className="modal-title" id="myModalLabel" toggle={() => { 
                            console.log('toggle',currentId) ;tog_positionTop(currentId); }}>
                           Please Confirm
                        </ModalHeader>
                        <ModalBody className="text-center p-5">
                            <lord-icon src="https://cdn.lordicon.com/pithnlch.json"
                                trigger="loop" colors="primary:#121331,secondary:#08a88a" style={{ width: "120px", height: "120px" }}>
                            </lord-icon>
                            <div className="mt-4">
                                <h4 className="mb-3">Are you sure you want to delete the record?</h4>
                                <p className="text-muted mb-4"> Data once deleted can not be retrieved.</p>
                                <div className="hstack gap-2 justify-content-center">
                                    <Button  className="btn btn-success fw-medium" onClick={() => { tog_positionTop(); }}> No,thanks</Button>
                                    <Button className="btn btn-danger" onClick={()=>{delete_type(currentId);tog_positionTop();}}>Delete</Button>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
                </Container>
            </div>
        </React.Fragment>
    );
}
export default AddDoctorSpecialization;