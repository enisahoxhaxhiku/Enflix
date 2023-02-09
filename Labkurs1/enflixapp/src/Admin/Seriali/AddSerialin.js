import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form, Image} from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';

export class AddSerialin extends Component{
   
    constructor(props){
    super(props)
    this.state={kats:[], akto:[], prod:[], regs:[], sken:[]};
    this.submitSerialin=this.submitSerialin.bind(this);
    this.fotoSerialiSelect=this.fotoSerialiSelect.bind(this);

    }



fotoisnot = "pro.png";
image = process.env.REACT_APP_PHOTOPATHS+this.fotoisnot;



refreshList(){
    fetch(process.env.REACT_APP_API+'kategoriteeserialit')
    .then(response=>response.json())
    .then(data=>{
        this.setState({kats:data});
    });
}


refreshList1(){
    fetch(process.env.REACT_APP_API+'aktorteserialit')
    .then(response=>response.json())
    .then(data=>{
        this.setState({akto:data});
    });
}

refreshList2(){
    fetch(process.env.REACT_APP_API+'producenteteserialit')
    .then(response=>response.json())
    .then(data=>{
        this.setState({prod:data});
    });
}

refreshList3(){
    fetch(process.env.REACT_APP_API+'regjisoreteserialit')
    .then(response=>response.json())
    .then(data=>{
        this.setState({regs:data});
    });
}

refreshList4(){
    fetch(process.env.REACT_APP_API+'skenaristateserialit')
    .then(response=>response.json())
    .then(data=>{
        this.setState({sken:data});
    });
}

componentDidMount(){
    this.refreshList();
    this.refreshList1();
    this.refreshList2();
    this.refreshList3();
    this.refreshList4();
}
validationSchema() {
    return Yup.object().shape({
      Titulli: Yup.string()
        .required('Titulli duhet te plotesohet.'),
        PershkrimiS: Yup.string()
        .required('Pershkrimi duhet te plotesohet.'),
    });
  }



  submitSerialin(event){
    event.preventDefault();
    fetch(process.env.REACT_APP_API+'seriali',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            Titulli:event.target.Titulli.value,
            NrSezonave:event.target.NrSezonave.value,
            PershkrimiS:event.target.PershkrimiS.value,
            Foto_S:this.fotoisnot,
            AktortSId:event.target.AktortSId.value,
            ProducentiSID:event.target.ProducentiSID.value,
            RegjisoriSID:event.target.RegjisoriSID.value,
            SkenaristatSId:event.target.SkenaristatSId.value,
            KategoriaSID:event.target.KategoriaSID.value
            
           
            
        })
    })
    .then(res=>res.json())
    .then((result)=>{
        alert(result);
    },
    (error)=>{
        alert('Ka ndodhur nje gabim');
    })
    {window.location.href="/Seriali"}
}

fotoSerialiSelect(event){
    event.preventDefault();
    this.fotoisnot=event.target.files[0].name;
    const formData = new FormData();
    formData.append(
        "myFile",
        event.target.files[0],
        event.target.files[0].name
    );

    fetch(process.env.REACT_APP_API+'seriali/SaveFotoSeriali',{
        method:'POST',
        body:formData
    })
    .then(res=>res.json())
    .then((result)=>{
        this.image=process.env.REACT_APP_PHOTOPATHS+result;
    },
    (error)=>{
        alert('Failed');
    })
    
}

render(){
    const initialValues = {
        Titulli: '',
        PershkrimiS: '',
      };
    return(
        <div className="container">
            <Modal {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Shto Serialin
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                        <Formik
                           initialValues={initialValues}
                           validationSchema={this.validationSchema}
                           onSubmit={this.submitSerialin}
                         >
                             {({ submitSerialin, isValid, isSubmitting, dirty }) => (
                            <Form onSubmit={this.submitSerialin}>
                                <Form.Group controlId="Titulli">
                                    <Form.Label>Titulli</Form.Label>
                                    <Field type="text" name="Titulli" required placeholder="Titulli" className="form-control" />
                                    <ErrorMessage
                                      name="Titulli"
                                      component="div"
                                      className="text-danger"
                                     />
                                </Form.Group>
                                <Form.Group controlId="NrSezonave">
                                    <Form.Label>Numri Sezonave</Form.Label>
                                    <input type="text"  name="NrSezonave" required placeholder="NrSezonave" className="form-control" />
                                    <ErrorMessage
                                      name="NrSezonave"
                                      component="div"
                                      className="text-danger"
                                     />
                                </Form.Group>
                                <Form.Group controlId="PershkrimiS">
                                    <Form.Label>Pershkrimi Serialit</Form.Label>
                                    <Field as="textarea" name="PershkrimiS" required placeholder="Pershkrimi Serialit" className="form-control" />
                                    <ErrorMessage
                                      name="PershkrimiS"
                                      component="div"
                                      className="text-danger"
                                     />
                                </Form.Group>
                                <Form.Group controlId="Foto_S">
                                    <Form.Label>Foto</Form.Label><br/>
                                    <Image width="150px" height="150px" src={this.image}/>
                                    <input onChange={this.fotoSerialiSelect} type="File" name="Foto_S" className="form-control"/>
                                </Form.Group>
                                
                                
                                <Form.Group controlId="AktortSId">
                                   <Form.Label>Aktori Kryesor</Form.Label>
                                   <Form.Control as="select">
                                      {this.state.akto.map(akt=>
                                      <option key={akt.AktortSId} value={akt.AktortSId}>{akt.Emri} {akt.Mbiemri}</option>)}
                                   </Form.Control>
                                </Form.Group>

                            
                                <Form.Group controlId="ProducentiSID">
                                   <Form.Label>Producenti</Form.Label>
                                   <Form.Control as="select">
                                      {this.state.prod.map(p=>
                                      <option key={p.ProducentiSID} value={p.ProducentiSID}>{p.Emri} {p.Mbiemri}</option>)}
                                   </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="RegjisoriSID">
                                   <Form.Label>Regjisori</Form.Label>
                                   <Form.Control as="select">
                                      {this.state.regs.map(regj=>
                                      <option key={regj.RegjisoriSID} value={regj.RegjisoriSID}>{regj.Emri} {regj.Mbiemri}</option>)}
                                   </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="SkenaristatSId">
                                   <Form.Label>Skenaristi</Form.Label>
                                   <Form.Control as="select">
                                      {this.state.sken.map(ske=>
                                      <option key={ske.SkenaristatSId} value={ske.SkenaristatSId}>{ske.Emri} {ske.Mbiemri}</option>)}
                                   </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="KategoriaSID">
                                   <Form.Label>Kategoria</Form.Label>
                                   <Form.Control as="select">
                                      {this.state.kats.map(kategorite=>
                                      <option key={kategorite.KategoriaSID} value={kategorite.KategoriaSID}>{kategorite.Kategoria}</option>)}
                                   </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Button disabled={isSubmitting || !dirty || !isValid} variant="primary" type="submit">
                                        Shto Serialin
                                    </Button>
                                </Form.Group>
                            </Form>
                               )}
                            </Formik>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}




}