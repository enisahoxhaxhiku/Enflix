import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form, Image} from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';


export class AddFilmat extends Component{
    constructor(props){
        super(props);
        this.state={kats:[], akto:[], prod:[], regs:[], sken:[]};
        this.submitFilmat=this.submitFilmat.bind(this);
        this.fotoFilmiSelect=this.fotoFilmiSelect.bind(this);
    }

    fotoisnot = "anonymous.png";
    image = process.env.REACT_APP_PHOTOPATH+this.fotoisnot;

    refreshList(){
        fetch(process.env.REACT_APP_API+'kategoritefilmit')
        .then(response=>response.json())
        .then(data=>{
            this.setState({kats:data});
        });
    }

    refreshList1(){
        fetch(process.env.REACT_APP_API+'aktortefilmit')
        .then(response=>response.json())
        .then(data=>{
            this.setState({akto:data});
        });
    }

    refreshList2(){
        fetch(process.env.REACT_APP_API+'producentetefilmit')
        .then(response=>response.json())
        .then(data=>{
            this.setState({prod:data});
        });
    }

    refreshList3(){
        fetch(process.env.REACT_APP_API+'regjisoretefilmit')
        .then(response=>response.json())
        .then(data=>{
            this.setState({regs:data});
        });
    }

    refreshList4(){
        fetch(process.env.REACT_APP_API+'skenaristatefilmit')
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
            Pershkrimi_Filmit: Yup.string()
            .required('Pershkrimi duhet te plotesohet.'),
        });
      }

    submitFilmat(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'filmat',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                //'Authorization' : 'bearer ' + (localStorage.getItem("token"))
            },
            body:JSON.stringify({
                Titulli:event.target.Titulli.value,
                Foto:this.fotoisnot,
                Pershkrimi_Filmit:event.target.Pershkrimi_Filmit.value,
                Linku_Filmit:event.target.Linku_Filmit.value,
                AktoriID:event.target.AktoriID.value,
                KategoriaID:event.target.KategoriaID.value,
                ProducentiID:event.target.ProducentiID.value,
                RegjisoriID:event.target.RegjisoriID.value,
                SkenaristiID:event.target.SkenaristiID.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Ka ndodhur nje gabim');
        })
        {window.location.href="/Filmat"}
    }


    fotoFilmiSelect(event){
        event.preventDefault();
        this.fotoisnot=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'filmat/SaveFotoFilmi',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.image=process.env.REACT_APP_PHOTOPATH+result;
        },
        (error)=>{
            alert('Failed');
        })
        
    }
    render(){
        const initialValues = {
            Titulli: '',
            Pershkrimi_Filmit: '',
          };
        return(
            <div className="container">
                <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Shto Filmin
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                            <Formik
                               initialValues={initialValues}
                               validationSchema={this.validationSchema}
                               onSubmit={this.submitFilmat}
                             >
                                 {({ submitFilmat, isValid, isSubmitting, dirty }) => (
                                <Form onSubmit={this.submitFilmat}>
                                    <Form.Group controlId="Titulli">
                                        <Form.Label>Titulli</Form.Label>
                                        <Field type="text" name="Titulli" required placeholder="Titulli" className="form-control" />
                                        <ErrorMessage
                                          name="Titulli"
                                          component="div"
                                          className="text-danger"
                                         />
                                    </Form.Group>
                                    <Form.Group controlId="Foto">
                                        <Form.Label>Foto</Form.Label><br/>
                                        <Image width="150px" height="150px" src={this.image}/>
                                        <input onChange={this.fotoFilmiSelect} type="File" name="Foto" className="form-control"/>
                                    </Form.Group>
                                    <Form.Group controlId="Pershkrimi_Filmit">
                                        <Form.Label>Pershkrimi Filmit</Form.Label>
                                        <Field as="textarea" name="Pershkrimi_Filmit" required placeholder="Pershkrimi Filmit" className="form-control" />
                                        <ErrorMessage
                                          name="Pershkrimi_Filmit"
                                          component="div"
                                          className="text-danger"
                                         />
                                    </Form.Group>
                                    <Form.Group controlId="Linku_Filmit">
                                        <Form.Label>Linku Filmit</Form.Label>
                                        <input type="url" name="Linku_Filmit" required placeholder="Linku Filmit" className="form-control"/>
                                        <ErrorMessage
                                          name="Linku_Filmit"
                                          component="div"
                                          className="text-danger"
                                         />
                                    </Form.Group>
                                    <Form.Group controlId="AktoriID">
                                       <Form.Label>Aktori Kryesor</Form.Label>
                                       <Form.Control as="select">
                                          {this.state.akto.map(akt=>
                                          <option key={akt.AktortiFId} value={akt.AktortiFId}>{akt.Emri} {akt.Mbiemri}</option>)}
                                       </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="KategoriaID">
                                       <Form.Label>Kategoria</Form.Label>
                                       <Form.Control as="select">
                                          {this.state.kats.map(kat=>
                                          <option key={kat.KategoriaFId} value={kat.KategoriaFId}>{kat.Kategoria}</option>)}
                                       </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="ProducentiID">
                                       <Form.Label>Producenti</Form.Label>
                                       <Form.Control as="select">
                                          {this.state.prod.map(pro=>
                                          <option key={pro.ProducentiID} value={pro.ProducentiID}>{pro.Emri} {pro.Mbiemri}</option>)}
                                       </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="RegjisoriID">
                                       <Form.Label>Regjisori</Form.Label>
                                       <Form.Control as="select">
                                          {this.state.regs.map(reg=>
                                          <option key={reg.RegjisoriFID} value={reg.RegjisoriFID}>{reg.Emri} {reg.Mbiemri}</option>)}
                                       </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="SkenaristiID">
                                       <Form.Label>Skenaristi</Form.Label>
                                       <Form.Control as="select">
                                          {this.state.sken.map(ske=>
                                          <option key={ske.SkenaristatId} value={ske.SkenaristatId}>{ske.Emri} {ske.Mbiemri}</option>)}
                                       </Form.Control>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button disabled={isSubmitting || !dirty || !isValid} variant="primary" type="submit">
                                            Shto Filmin
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