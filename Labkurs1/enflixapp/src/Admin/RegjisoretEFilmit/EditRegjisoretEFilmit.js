import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';


export class EditRegjisoretEFilmit extends Component{

    constructor(props){
        super(props);
        this.submitRegjisorinF=this.submitRegjisorinF.bind(this);
    }

    submitRegjisorinF(event){
      event.preventDefault();
      fetch(process.env.REACT_APP_API+"regjisoretefilmit",{
            method:'PUT',
            headers : {
                'Accept':'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                RegjisoriFID:event.target.RegjisoriFID.value,
                Emri:event.target.Emri.value,
                Mbiemri:event.target.Mbiemri.value,
                Biografia:event.target.Biografia.value

            })
      })

      .then(res=>res.json())
      .then((result)=>{
          alert(result);
      },
  
          (error)=>{
          alert('Ka ndodhur nje gabim!');
          })
 
          {window.location.href="/regjisoretefilmit"}

    }

    render(){
        return(
            <div className="container">
                    <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header>
                        <Modal.Title  id="contained-modal-title-vcenter">Update Regjisorin e Filmit</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.submitRegjisorinF}>
                                    <Form.Group controlId="RegjisoriFID">
                                        <Form.Control  name="RegjisoriFID"required hidden defaultValue ={this.props.regid} 
                                        placeholder="RegjisoriFID"/>
                                    </Form.Group>
                                    <Form.Group controlId="Emri">
                                        <Form.Label>Emri</Form.Label>
                                        <Form.Control type = "text" name="Emri" required defaultValue = {this.props.regemri} placeholder="Emri"/> 
                                    </Form.Group>
                                    <Form.Group controlId="Mbiemri">
                                        <Form.Label>Mbiemri</Form.Label>
                                        <Form.Control type = "text" name="Mbiemri" required defaultValue = {this.props.regmbiemri} placeholder="Mbiemri"/> 
                                    </Form.Group>
                                    <Form.Group controlId="Biografia">
                                        <Form.Label>Biografia</Form.Label>
                                        <Form.Control as="textarea" name="Biografia" required defaultValue = {this.props.regbiografia} placeholder="Biografia"/> 
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Regjisorin
                                        </Button>
                                    </Form.Group>
                                </Form>
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