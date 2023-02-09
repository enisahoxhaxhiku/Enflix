import React,{Component} from "react";
import {Card, Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import {NavLink} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { Button ,ButtonToolbar} from 'react-bootstrap';

export class DetajetEEpisodave extends Component{
    
  constructor(props){
    super(props)
    this.state={seri:[]}
}

refreshList(){
  let {sezid} = this.props.match.params;
  fetch(process.env.REACT_APP_API+`seriali/${sezid}/episodat`, {
    method: 'GET'
  })
    .then(response=>response.json())
    .then(data=>{
        this.setState({seri:data});
    });
}
componentDidMount(){
    this.refreshList();
}

componentDidUpdate(){
    this.refreshList();
}


    render(){
      const {seri}=this.state;
        return(
            <div className="container">
                <Helmet>
                <title>Detajet e Episodave se Serialit</title>
                </Helmet>
               
                <div className="container d-flex flex-wrap">
                {seri.map(ser=>
                 <Link key={ser.SerialiID} className="nav-link d-inline" to={`/detajeteepisodes/${ser.EpisodaID}`}>
               <Card style={{ width: '17rem' }}>
                    <Card.Img variant="top" style={{width: '271px', height: '335px'}} src={`${process.env.REACT_APP_PHOTOPATHS}${ser.Foto_S}`} />
                      <Card.Body>
                        <Card.Title className="mb-4 d-flex justify-content-center"><strong>Episoda : {ser.NrEpisodes}</strong></Card.Title>
                        <Card.Text className="mb-4 d-flex justify-content-center">
                         <strong><i>"{ser.Titulli}"</i></strong>
                        </Card.Text>
                        <ButtonToolbar className="mb-4 d-flex justify-content-center">
                      <Button variant="primary">Luaj</Button>
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