import React,{Component} from "react";
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
import {Card} from 'react-bootstrap';
import ReactPlayer from 'react-player/youtube';

export class DetajetEFilmit extends Component{
    constructor(props){
        super(props)
        this.state={film:[]}
    }

    refreshList(){
        let {id} = this.props.match.params;
        fetch(process.env.REACT_APP_API+`filmat/${id}`, {
          method: 'GET'
        })
          .then(response=>response.json())
          .then(data=>{
              this.setState({film:data});
          });
      }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }
    
    render(){
        const {film}=this.state;
        return(
            <div className="container shadow p-3 mb-5 bg-white rounded mt-4">
                <Helmet>
                <title>Detaji I Filmit</title>
                </Helmet>
                <div className="container d-flex mt-4 flex-wrap">
                {film.map(fil=>
                <div key={fil.FilmatId} style={{width: '100%'}}>

                    Filmi: <strong>{fil.Titulli}</strong>

                <ReactPlayer url={fil.Linku_Filmit}
                width='100%' controls/>
                <Card className="mt-4">
                      <Card.Body>
                          <Card.Body className="container d-flex mt-2 flex-wrap mx-auto">
                      <Card.Text>
                         Titulli: <strong>{fil.Titulli}</strong>
                        </Card.Text>
                        <Card.Text className="mx-auto">
                         Kategoria: <strong>{fil.Kategoria}</strong>
                        </Card.Text>
                    

                      <Card.Text  className="mx-auto">
                         Data Postimit: <strong>{fil.Data_Postimit}</strong>
                        </Card.Text>
                       
                        
                        <Card.Text>
                         Aktori Kryesor:<Link className="nav-link d-inline" to={`/detajeteaktorittefilmit/${fil.AktortiFId}`}><strong>{fil.Emri} {fil.Mbiemri}</strong></Link>
                        </Card.Text>
                        <Card.Text className="mx-auto">
                         Producenti:<Link className="nav-link d-inline" to={`/detajeteproducentevetefilmit/${fil.ProducentiID}`}><strong>{fil.Emri1} {fil.Mbiemri1}</strong></Link>
                        </Card.Text>
                        <Card.Text>
                         Regjisori:<Link className="nav-link d-inline" to={`/detajeteregjisorevetefilmit/${fil.RegjisoriFID}`}><strong>{fil.Emri2} {fil.Mbiemri2}</strong></Link>
                        </Card.Text>
                        <Card.Text className="mx-auto">
                         Skenaristi:<Link className="nav-link d-inline" to={`/detajeteskenaristvetefilmit/${fil.SkenaristatId}`}><strong>{fil.Emri3} {fil.Mbiemri3}</strong></Link>
                        </Card.Text>
                      </Card.Body>
                    </Card.Body>
                  </Card>
                
                
                <Card className="mt-4">
                  <Card.Body>
                    <Card.Text className="mx-auto">
                    <strong>Pershkrimi i Filmit: </strong>{fil.Pershkrimi_Filmit}
                        </Card.Text>
                      </Card.Body>
                  </Card>

                </div>
                 
                )}
                </div>
            </div>
        )
    }
}