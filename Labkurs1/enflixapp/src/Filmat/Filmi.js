import React,{Component} from "react";
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
import {Card, Button} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'

export class Filmi extends Component{
    constructor(props){
        super(props)
        this.state={film:[], filmn:[]}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Filmat')
        .then(response=>response.json())
        .then(data=>{
            this.setState({film:data});
        });
    }

    refreshList1(){
        fetch(process.env.REACT_APP_API+'kategoritefilmit')
        .then(response=>response.json())
        .then(data=>{
            this.setState({filmn:data});
        });
    }

    componentDidMount(){
        this.refreshList();
        this.refreshList1();
    }

    
    render(){
        const token = (localStorage.getItem("token"));
        const {film, filmn}=this.state;
        return(
            <div className="container shadow p-3 mb-5 bg-white rounded mt-4">
                <Helmet>
                <title>Filmat</title>
                </Helmet>
                {!token && <h1 className="text-center">Nuk jeni te kyqur!<br></br> <Link to="/login"><Button variant="primary" type="submit">
                            Log in
                                </Button></Link></h1>}
                
                {token &&<Accordion className="container mt-4 w-50">
                   <Accordion.Item eventKey="0">
                     <Accordion.Header>Zgjedh Kategorine</Accordion.Header>
                     {filmn.map(filmm=>
                       <Accordion.Body key={filmm.KategoriaFId}>
                        <Link className="nav-link d-inline" to={`/kategoritfilmit/${filmm.KategoriaFId}`}>
                           {filmm.Kategoria}
                        </Link>
                       </Accordion.Body>
                       )}
                     </Accordion.Item>
                   </Accordion>}
                
                {token && <div className="container d-flex mt-4 flex-wrap">
                {film.map(fil=>
                <Link key={fil.FilmatId} className="nav-link d-inline shadow p-3 mb-5 bg-white rounded" to={`/detajetefilmit/${fil.FilmatId}`}>
                  <Card style={{ width: '17rem' }}>
                    <Card.Img variant="top" style={{width: '271px', height: '335px'}} src={`${process.env.REACT_APP_PHOTOPATH}${fil.Foto}`} />
                      <Card.Body>
                        <Card.Title className="mb-4 d-flex justify-content-center text-center">{fil.Titulli}</Card.Title>
                        <Card.Text className="mb-4 d-flex justify-content-center text-center">
                         Kategoria: {fil.Kategoria}
                        </Card.Text>
                      
                    </Card.Body>
                  </Card>
                </Link>
                )}
                </div>
    }
            </div>
        )
    }
}