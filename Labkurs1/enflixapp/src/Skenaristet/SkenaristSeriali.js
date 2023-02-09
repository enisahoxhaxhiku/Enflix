import React,{Component} from "react";
import {Helmet} from "react-helmet";
import { Dropdown ,Button , ButtonToolbar } from "react-bootstrap";
import {Link, NavLink } from "react-router-dom";
import {Card} from 'react-bootstrap';

export class SkenaristSeriali extends Component{

    constructor(props){
        super(props)
        this.state={skens:[]}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'skenaristateserialit')
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
                <div className="container shadow p-3 mb-5 bg-white rounded mt-4">
                <Helmet>
                    <title>Skenaristet E Filmit</title>
                </Helmet>

                <Dropdown className="d-flex justify-content-end mt-4">
                <Dropdown.Toggle variant="success">
                    Skenaristet e Serialit
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <NavLink className="nav-link d-inline p-1 text-black" to="skenaristfilmi">
                    Skenaristet e Filmit
                    </NavLink>
                </Dropdown.Menu>
                </Dropdown>
                <div className="container d-flex flex-wrap">
                    {skens.map(ske=>
                        <Link key={ske.SkenaristatSId} className="nav-link d-inline" to={`/detajeteskenaristveteserialit/${ske.SkenaristatSId}`}>
                        <Card className="mt-4" border="primary" style={{width:'17rem',height:'10rem'}}>
                        <Card.Body>
                            <Card.Title className="text-secondary d-flex justify-content-center"><span className="text-dark">Emri : </span>{ske.Emri}</Card.Title>
                            <Card.Title className="text-secondary d-flex justify-content-center"><span className="text-dark">Mbiemri : </span>{ske.Mbiemri}</Card.Title>
                            <ButtonToolbar  className="d-flex justify-content-center" >
                                <Button variant="success">
                                Me shume
                                </Button>
                                 
                            </ButtonToolbar>
                        </Card.Body>
                        </Card>
                        </Link>
                        )}
                </div>
                </div>
            )
        }

}