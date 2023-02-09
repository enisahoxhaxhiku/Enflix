import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';


export class AddSezonen extends Component{

    constructor(props){
        super(props);
        this.submitSezonen=this.submitSezonen.bind(this);
    }


    validationSchema() {
        return Yup.object().shape({
            NrSezones: Yup.number()
            .required('Numri sezones duhet te plotesohet'),
            NrEpisodave: Yup.number()
            .required('Numri episodave duhet te plotesohet'),
        
        });
      
           
       
      }
    submitSezonen(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'sezona',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },

            body:JSON.stringify({
                
                NrSezones:event.target.NrSezones.value,
                NrEpisodave:event.target.NrEpisodave.value
               
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Ka ndodhur nje gabim');
        })
        {window.location.href="/Sezona"}
    }
  render(){
      const initialValues={
          NrSezones : '',
          NrEpisodave : '',
          

      };

      return(
          <div className="container">
              <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Shto Sezonen
                        </Modal.Title>
                    </Modal.Header>

                        <Modal.Body>
                            <Row>
                            <Col sm={6}>
                            <Formik
                               initialValues={initialValues}
                               validationSchema={this.validationSchema}
                               onSubmit={this.submitSezonen}
                             >
                                 {({ submitSezonen, isValid, isSubmitting, dirty }) => (
                                     <Form onSubmit={this.submitSezonen}>
                                         <Form.Group controlId="NrSezones">
                                        <Form.Label>Numri i sezones</Form.Label>
                                        <Field min="1" type="number" name="NrSezones" required placeholder="NrSezones" className="form-control" />
                                        <ErrorMessage
                                          name="NrSezones"
                                          component="div"
                                          className="text-danger"
                                         />
                                         </Form.Group>
                                         
                                         <Form.Group controlId="NrEpisodave">
                                         <Form.Label>Numri i episodave</Form.Label>
                                         <Field min="1" type="number" name="NrEpisodave" required placeholder="NrEpisodave" className="form-control" />
                                         <ErrorMessage
                                          name="NrEpisodave"
                                          component="div"
                                          className="text-danger"
                                         />
                                         </Form.Group>

                                       
                                        
                                    <Form.Group>
                                        <Button disabled={isSubmitting || !dirty || !isValid} variant="primary" type="submit">
                                            Shto Sezonen
                                        </Button>
                                    </Form.Group>
                                     </Form>
                                     )}
                                     </Formik>
                            </Col>
                            </Row>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger"  onClick={this.props.onHide}>Close</Button>
                        </Modal.Footer>

                    </Modal>
          </div>
      )
  }
}