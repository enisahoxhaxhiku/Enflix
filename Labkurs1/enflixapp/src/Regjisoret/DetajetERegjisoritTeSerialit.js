import React,{Component} from "react";
import {Card, Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import {NavLink} from 'react-router-dom';


export class DetajetERegjisoritTeSerialit extends Component{
    
  constructor(props){
    super(props)
    this.state={regs:[]}
}

refreshList(){
  let {id} = this.props.match.params;
  fetch(process.env.REACT_APP_API+`regjisoreteserialit/${id}`, {
    method: 'GET'
  })
    .then(response=>response.json())
    .then(data=>{
        this.setState({regs:data});
    });
}
componentDidMount(){
    this.refreshList();
}

componentDidUpdate(){
    this.refreshList();
}


    render(){
      const {regs}=this.state;
        return(
            <div className="container">
                <Helmet>
                <title>Detajet e Regjisorit Te Serialit</title>
                </Helmet>
                <Dropdown className="d-flex justify-content-end mt-4">
                  <Dropdown.Toggle variant="success">
                  Detajet e Regjisorit Te Serialit
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink className="nav-link d-inline p-1 text-black" to="/regjisorseriali">
                      Regjisort E Serialit
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>
                <div className="container d-flex flex-wrap">
                {regs.map(regj=><Card className="mt-4" key={regj.RegjisoriSID}>
                  <Card className="mt-4 d-flex flex-row" style={{ width: '70rem' }}>
                  <Card.Body>
                    <Card.Title className="mb-4">Emri I Regjisorit te Serialit</Card.Title>
                      <Card.Subtitle>{regj.Emri}</Card.Subtitle>
                  </Card.Body>

                  <Card.Body>
                    <Card.Title className="mb-4">Mbiemri I Regjisorit te Serialit</Card.Title>
                      <Card.Subtitle>{regj.Mbiemri}</Card.Subtitle>
                  </Card.Body>
                </Card>

                <Card className="mt-5" style={{ width: '70rem' }}>
                  <Card.Body>
                    <Card.Title className="mb-4">Biografia I Regjisorit te Serialit</Card.Title>
                    <Card.Text>
                    {regj.Biografia}
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