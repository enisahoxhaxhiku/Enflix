import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import { Formik } from 'formik';




export class AddSerialiSezona extends Component{

    constructor(props){
        super(props);
        this.submitSS=this.submitSS.bind(this);
        this.state={seri:[], sersez:[]}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'seriali')
        .then(response=>response.json())
        .then(data=>{
            this.setState({seri:data});
        });
    }

    refreshList1(){
        fetch(process.env.REACT_APP_API+'sezona')
        .then(response=>response.json())
        .then(data=>{
            this.setState({sersez:data});
        });
    }

    componentDidMount(){
        this.refreshList();
        this.refreshList1();
    }


    submitSS(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'serialisezona',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },

            body:JSON.stringify({
                
                SerialiID:event.target.SerialiID.value,
                SezonaID:event.target.SezonaID.value
               
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Ka ndodhur nje gabim');
        })
        {window.location.href="/SerialiSezona"}
    }
    
render(){


    return(

        <div className="container">
        <Modal {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter" centered>
              <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                      Shto Lidhjen
                  </Modal.Title>
              </Modal.Header>

                  <Modal.Body>
                      <Row>
                      <Col sm={6}>
                      <Formik
                         onSubmit={this.submitSS}
                       >
                           
                               <Form onSubmit={this.submitSS}>
                                   <Form.Group controlId="SerialiID">
                                  <Form.Label>Seriali</Form.Label>
                                  <Form.Control as="select">
                                      {this.state.seri.map(ser=>
                                      <option key={ser.SerialiID} value={ser.SerialiID}>{ser.Titulli}</option>)}
                                   </Form.Control>
                                   </Form.Group>
                                   
                                   <Form.Group controlId="SezonaID">
                                   <Form.Label>Sezona ID</Form.Label>
                                   <Form.Control as="select">
                                      {this.state.sersez.map(sers=>
                                      <option key={sers.SezonaID} value={sers.SezonaID}>{sers.SezonaID
                                      }</option>)}
                                   </Form.Control>
                                   </Form.Group>

                                 
                                  
                              <Form.Group>
                                  <Button variant="primary" type="submit">
                                      Shto Lidhjen
                                  </Button>
                              </Form.Group>
                               </Form>
                               
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