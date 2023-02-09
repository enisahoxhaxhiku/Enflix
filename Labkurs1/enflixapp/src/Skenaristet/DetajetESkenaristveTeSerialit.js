import React,{Component} from "react";
import {Card, Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import {NavLink} from 'react-router-dom';

export class DetajetESkenaristveTeSerialit extends Component{


    constructor(props){
        super(props)
        this.state={skens:[]}
      } 


      refreshList(){
        let {id} = this.props.match.params;
        fetch(process.env.REACT_APP_API+`skenaristateserialit/${id}` ,
        {
          method : 'GET'
        })
        .then(response=>response.json())
        .then(data=>{
          this.setState({skens:data});
        });
      }
      componentDidMount(){
        this.refreshList();
      }
    
      componentDidUpdate(){
        this.refreshList();
      }
    
      render(){
        const{skens}=this.state;
            return(
                <div className="container">
                <Helmet>
                <title>Detajet e Skenaristeve Te Serialit</title>
                </Helmet>
                <Dropdown  className="d-flex justify-content-end mt-4">
                  <Dropdown.Toggle variant="success">
                    Detajet e Skenaristeve te Serialit
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink className="nav-link d-inline p-1 text-black" to="/skenaristseriali">
                    Skenaristet e Serialit
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>
                <div className="container d-flex flex-wrap">
                  {skens.map(ske=><Card className="mt-4" key={ske.SkenaristatSId}>
                <Card className="mt-4 d-flex flex-row" style={{ width: '70rem' }}>
                  <Card.Body>
                    <Card.Title className="mb-4">Emri i Skenaristit te Serialit</Card.Title>
                      <Card.Subtitle>{ske.Emri}</Card.Subtitle>
                  </Card.Body>

                  <Card.Body>
                    <Card.Title className="mb-4">Mbiemri i Skenaristit te Serialit</Card.Title>
                      <Card.Subtitle>{ske.Mbiemri}</Card.Subtitle>
                  </Card.Body>
                </Card>

                <Card className="mt-5" style={{ width: '70rem' }}>
                  <Card.Body>
                    <Card.Title className="mb-4">Biografia e Regjisorit te Serialit</Card.Title>
                    <Card.Text>
                     {ske.Biografia}
                    </Card.Text>
                  </Card.Body>
                </Card>
                </Card>
                )}
                </div>

                </div>
            )



      }


}