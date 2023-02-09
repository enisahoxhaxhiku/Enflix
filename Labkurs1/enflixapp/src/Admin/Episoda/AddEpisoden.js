import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form, Image} from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';


export class AddEpisoden extends Component{

    constructor(props){
        super(props);
        this.submitEpisoden=this.submitEpisoden.bind(this);
    }


    validationSchema() {
        return Yup.object().shape({
          Titulli: Yup.string()
            .required('Titulli duhet te plotesohet.'),
            PershkrimiE: Yup.string()
            .required('Pershkrimi episodes duhet te plotesohet.'),
        
        });
      
           
       
      }
    submitEpisoden(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'episoda',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },

            body:JSON.stringify({
                Titulli:event.target.Titulli.value,
                NrEpisodes:event.target.NrEpisodes.value,
                PershkrimiE:event.target.PershkrimiE.value,
                Linku:event.target.Linku.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Ka ndodhur nje gabim');
        })
        {window.location.href="/episoda"}
    }
  render(){
      const initialValues={
          Titulli : '',
          NrEpisodes : '',
          PershkrimiE : '',
          Linku : '',

      };

      return(
          <div className="container">
              <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Shto Episoden
                        </Modal.Title>
                    </Modal.Header>

                        <Modal.Body>
                            <Row>
                            <Col sm={6}>
                            <Formik
                               initialValues={initialValues}
                               validationSchema={this.validationSchema}
                               onSubmit={this.submitEpisoden}
                             >
                                 {({ submitEpisoden, isValid, isSubmitting, dirty }) => (
                                     <Form onSubmit={this.submitEpisoden}>
                                         <Form.Group controlId="Titulli">
                                        <Form.Label>Titulli</Form.Label>
                                        <Field type="text" name="Titulli" required placeholder="Titulli" className="form-control" />
                                        <ErrorMessage
                                          name="Titulli"
                                          component="div"
                                          className="text-danger"
                                         />
                                         </Form.Group>
                                         
                                         <Form.Group controlId="NrEpisodes">
                                         <Form.Label>Numri episodes</Form.Label>
                                         <Field type="number" name="NrEpisodes" required placeholder="NrEpisodes" className="form-control" />
                                         <ErrorMessage
                                          name="NrEpisodes"
                                          component="div"
                                          className="text-danger"
                                         />
                                         </Form.Group>

                                         <Form.Group controlId="PershkrimiE">
                                        <Form.Label>Pershkrimi</Form.Label>
                                        <Field as="textarea" name="PershkrimiE" required placeholder="PershkrimiE" className="form-control" />
                                        <ErrorMessage
                                          name="PershkrimiE"
                                          component="div"
                                          className="text-danger"
                                         />
                                         </Form.Group>
                                         <Form.Group controlId="Linku">
                                        <Form.Label>Linku</Form.Label>
                                        <input type="url" name="Linku" required placeholder="Linku" className="form-control"/>
                                        <ErrorMessage
                                          name="Linku"
                                          component="div"
                                          className="text-danger"
                                         />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button disabled={isSubmitting || !dirty || !isValid} variant="primary" type="submit">
                                            Shto Episoden
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