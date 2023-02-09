import React,{Component} from "react";
import {Card, Dropdown} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {Helmet} from "react-helmet";


export class DetajetEAktoritTeSerialit extends Component{
  constructor(props){
    super(props)
    this.state={akto:[]}
}

refreshList(){
  let {id} = this.props.match.params;
  fetch(process.env.REACT_APP_API+`aktorteserialit/${id}`, {
    method: 'GET'
  })
    .then(response=>response.json())
    .then(data=>{
        this.setState({akto:data});
    });
}
componentDidMount(){
    this.refreshList();
}

componentDidUpdate(){
    this.refreshList();
}

    render(){
      const {akto}=this.state;
      return(
          <div className="container">
              <Helmet>
              <title>Detajet e Aktorit Te Serialit</title>
              </Helmet>
              <Dropdown className="d-flex justify-content-end mt-4">
                  <Dropdown.Toggle variant="success">
                    Detajet e Aktorit te Serialit
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink className="nav-link d-inline p-1 text-black" to="/aktorseriali">
                      Aktort E Serialit
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>
              <div className="container d-flex flex-wrap">
              {akto.map(akt=><Card className="mt-4" key={akt.AktortSId}>
                <Card className="mt-4 d-flex flex-row" style={{ width: '70rem' }}>
                <Card.Body>
                  <Card.Title className="mb-4">Emri I Aktorit te Serialit</Card.Title>
                    <Card.Subtitle>{akt.Emri}</Card.Subtitle>
                </Card.Body>

                <Card.Body>
                  <Card.Title className="mb-4">Mbiemri I Aktorit te Serialit</Card.Title>
                    <Card.Subtitle>{akt.Mbiemri}</Card.Subtitle>
                </Card.Body>
              </Card>

              <Card className="mt-5" style={{ width: '70rem' }}>
                <Card.Body>
                  <Card.Title className="mb-4">Biografia I Aktorit te Serialit</Card.Title>
                  <Card.Text>
                  {akt.Biografia}
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