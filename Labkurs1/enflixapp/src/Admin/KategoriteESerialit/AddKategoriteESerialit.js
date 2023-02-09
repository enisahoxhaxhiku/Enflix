import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';

export class AddKategoriteESerialit extends Component{
    constructor(props){
        super(props);
        this.submitKategoriteS=this.submitKategoriteS.bind(this);
    }

    validationSchema() {
        return Yup.object().shape({
          Kategoria: Yup.string()
            .required('Kategoria duhet te plotesohet.')
            .matches(
                /^[A-Za-z .]{3,15}$/,
                "Kategoria te permbaj vetem Shkronja dhe te jete me e gjate se 2 shkronja dhe jo me e gjate se 15 shkronja."
              ),
        });
      }

    submitKategoriteS(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'kategoriteeserialit',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Kategoria:event.target.Kategoria.value,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Ka ndodhur nje gabim');
        })
        {window.location.href="/kategoriteserialit"}
    }
    render(){
        const initialValues = {
            Kategoria: '',
          };
        return(
            <div className="container">
                <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Shto Kategorine e Serialit
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                            <Formik
                               initialValues={initialValues}
                               validationSchema={this.validationSchema}
                               onSubmit={this.submitKategoriteS}
                             >
                                 {({ submitKategoriteS, isValid, isSubmitting, dirty }) => (
                            
                                <Form onSubmit={this.submitKategoriteS}>
                                    <Form.Group controlId="Kategoria">
                                        <Form.Label>Kategoria</Form.Label>
                                        <Field type="text" name="Kategoria" required placeholder="Kategoria" className="form-control" />
                                        <ErrorMessage
                                          name="Kategoria"
                                          component="div"
                                          className="text-danger"
                                         />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button disabled={isSubmitting || !dirty || !isValid}  variant="primary" type="submit">
                                            Shto Kategorine
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