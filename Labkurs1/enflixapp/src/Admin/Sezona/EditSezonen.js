import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditSezonen extends Component{

    constructor(props){
        super(props)
        this.submitSezonen=this.submitSezonen.bind();
    }


submitSezonen(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'sezona',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },

            body:JSON.stringify({
                SezonaID:event.target.SezonaID.value,
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
        return (
            <div className="container">
                <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered>
    
                   <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update Sezonen e Serialit
                        </Modal.Title>
                    </Modal.Header>
    
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.submitSezonen}>
                                <Form.Group controlId="SezonaID">
                                                <Form.Control type="text" name="SezonaID" required hidden defaultValue = {this.props.szid} placeholder="SezonaID"/>
                                            </Form.Group>
    
                                    <Form.Group controlId="NrSezones">
                                    <Form.Label>NrSezones</Form.Label>
                                    <Form.Control type="number" min ="1" name="NrSezones" required defaultValue = {this.props.sznr} placeholder="Numri sezones"/>
                                    </Form.Group>
                                   
                                    <Form.Group controlId="NrEpisodave">
                                        <Form.Label>Numri Episodave</Form.Label>
                                        <Form.Control type="number" min="1" name="NrEpisodave" required defaultValue={this.props.sznrep} placeholder="Numri episodave"/>
                                    </Form.Group>
                                   
                                    
    
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Sezonen
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