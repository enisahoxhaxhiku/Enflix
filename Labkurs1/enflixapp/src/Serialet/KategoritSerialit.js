import React,{Component} from "react";
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import {Card} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'


export class KategoritSerialit extends Component{
    constructor(props){
        super(props)
        this.state={kats:[], sert:[]}
    }

    refreshList(){
        let {id} = this.props.match.params;
        fetch(process.env.REACT_APP_API+`seriali/kategoria/${id}`, {
          method: 'GET'
     
        })
          .then(response=>response.json())
          .then(data=>{
              this.setState({kats:data});
          });
      }
      refreshList1(){
        fetch(process.env.REACT_APP_API+'kategoriteeserialit')
        .then(response=>response.json())
        .then(data=>{
            this.setState({sert:data});
        });
    }
    componentDidMount(){
        this.refreshList();
        this.refreshList1();
    }

    componentDidUpdate(){
        this.refreshList();
        this.refreshList1();
    }
    render(){
        const {kats, sert}=this.state;
        return(
            <div className="container shadow p-3 mb-5 bg-white rounded mt-4">
                <Helmet>
                <title>Serialet</title>
                </Helmet>
                
                <Accordion className="container mt-4 w-50">
                   <Accordion.Item eventKey="0">
                     <Accordion.Header>Zgjedh Kategorine</Accordion.Header>
                       <Accordion.Body>
                        <Link className="nav-link" to={`/serialet`}>
                           Serialet
                        </Link>
                        {sert.map(serr=>
                        <Link key={serr.KategoriaSID} className="nav-link" to={`/kategoritserialit/${serr.KategoriaSID}`}>
                           {serr.Kategoria}
                        </Link>
                        )}
                       </Accordion.Body>
                     </Accordion.Item>
                   </Accordion>
                
                <div className="container d-flex mt-4 flex-wrap">
                {kats.map(kat=>
                <Link key={kat.SerialiID} className="nav-link d-inline shadow p-3 mb-5 bg-white rounded" to={`/detajetesezones/${kat.SerialiID}`}>
                  <Card style={{ width: '17rem' }}>
                    <Card.Img variant="top" style={{width: '271px', height: '300px'}} src={`${process.env.REACT_APP_PHOTOPATHS}${kat.Foto_S}`} />
                      <Card.Body>
                        <Card.Title className="mb-4 d-flex justify-content-center">{kat.Titulli}</Card.Title>
                        <Card.Text className="mb-4 d-flex justify-content-center">
                         Kategoria : &nbsp;<strong>{kat.Kategoria}</strong> 
                        </Card.Text>
                    
                    </Card.Body>
                  </Card>
                </Link>
                )}
                </div>
            </div>
        )
    }
}