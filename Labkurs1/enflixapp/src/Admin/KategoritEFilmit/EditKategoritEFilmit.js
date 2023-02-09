import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';


export class EditKategoritEFilmit extends Component{
    constructor(props){
        super(props);
        this.submitKategoritF=this.submitKategoritF.bind(this);
    }

    submitKategoritF(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'kategoritefilmit',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                KategoriaFId:event.target.KategoriaFId.value,
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
        {window.location.href="/kategoritefilmit"}
    }
    render(){
        return(
            <div className="container">
                <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update Kategorin e Filmit
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.submitKategoritF}>
                                <Form.Group controlId="KategoriaFId">
                                        <Form.Control type="text" name="KategoriaFId" required hidden defaultValue={this.props.catid} placeholder="KategoriaFId" />
                                    </Form.Group>
                                    <Form.Group controlId="Kategoria">
                                        <Form.Label>Kategoria</Form.Label>
                                        <Form.Control type="text" name="Kategoria" required defaultValue={this.props.categ} placeholder="Kategoria" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Kategorin
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