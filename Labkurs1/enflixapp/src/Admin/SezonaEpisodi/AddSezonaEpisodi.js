import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import { Formik } from 'formik';



export class AddSezonaEpisodi extends Component{

    constructor(props){
        super(props);
        this.submitSE=this.submitSE.bind(this);
        this.state={epis:[], sersez:[]}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'episoda')
        .then(response=>response.json())
        .then(data=>{
            this.setState({epis:data});
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

   
        submitSE(event){
            event.preventDefault();
            fetch(process.env.REACT_APP_API+'sezonaepisodi',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
    
                body:JSON.stringify({
                    
                    SezonaID:event.target.SezonaID.value,
                    EpisodaID:event.target.EpisodaID.value
                   
                })
            })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
            },
            (error)=>{
                alert('Ka ndodhur nje gabim');
            })
            {window.location.href="/SezonaEpisodi"}
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
                               onSubmit={this.submitSE}
                             >
                                 
                                     <Form onSubmit={this.submitSE}>
                                         <Form.Group controlId="SezonaID">
                                        <Form.Label>Sezona ID</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.sersez.map(sers=>
                                            <option key={sers.SezonaID} value={sers.SezonaID}>{sers.SezonaID}</option>)}
                                        </Form.Control>
                                         </Form.Group>
                                         
                                         <Form.Group controlId="EpisodaID">
                                         <Form.Label>Episoda</Form.Label>
                                         <Form.Control as="select">
                                            {this.state.epis.map(epi=>
                                            <option key={epi.EpisodaID} value={epi.EpisodaID}>{epi.Titulli}</option>)}
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

