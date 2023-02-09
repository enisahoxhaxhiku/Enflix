import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditEpisoden extends Component{

constructor(props){
    super(props)
    this.submitEpisoden=this.submitEpisoden.bind();
}

submitEpisoden(event){
    event.preventDefault();
    fetch(process.env.REACT_APP_API+'episoda',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            EpisodaID:event.target.EpisodaID.value,
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
    return (
        <div className="container">
            <Modal {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter" centered>

               <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Episoden e Serialit
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.submitEpisoden}>
                            <Form.Group controlId="EpisodaID">
                                            <Form.Control type="text" name="EpisodaID" required hidden defaultValue = {this.props.epid} placeholder="EpisodaID"/>
                                        </Form.Group>

                                <Form.Group controlId="Titulli">
                                <Form.Label>Titulli</Form.Label>
                                <Form.Control type="text" name="Titulli" required defaultValue = {this.props.eptitulli} placeholder="Titulli"/>
                                </Form.Group>
                               
                                <Form.Group controlId="NrEpisodes">
                                    <Form.Label>Numri Episodes</Form.Label>
                                    <Form.Control type="number" min="1" name="NrEpisodes" required defaultValue={this.props.epnr} placeholder="Numri episodes"/>
                                </Form.Group>
                               
                                <Form.Group controlId="PershkrimiE">
                                <Form.Label>Pershkrimi</Form.Label>
                                    <Form.Control as="textarea" name="PershkrimiE" required defaultValue={this.props.eppershkrimi} placeholder="Pershkrimi"/>
                                </Form.Group>
                                <Form.Group controlId="Linku">
                                <Form.Label>Linku</Form.Label>
                                    <Form.Control type="text" name="Linku" required defaultValue={this.props.eplinku} placeholder="Linku"/>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Update Episoden
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