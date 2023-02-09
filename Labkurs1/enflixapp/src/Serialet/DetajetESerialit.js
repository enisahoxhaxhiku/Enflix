import React,{Component} from "react";
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
import {Card,Dropdown} from 'react-bootstrap';


export class DetajetESerialit extends Component{
    constructor(props){
        super(props)
        this.state={seri:[]}
    }


    refreshList(){
        let {id} = this.props.match.params;
        fetch(process.env.REACT_APP_API+`seriali/sezonat/${id}`, {
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
            <div className="container shadow p-3 mb-5 bg-white rounded mt-4">
                <Helmet>
                <title>Detajet e Serialit</title>
                </Helmet>
               
                
                <div className="container d-flex mt-4 flex-wrap">
                {seri.map(ser=>
                <div key={ser.SerialiID} style={{width: '100%'}}>

                    Seriali: <strong>{ser.Titulli}</strong>

                <Card className="mt-4">
                  <Card.Body className="mb-4 d-flex justify-content-center">
                  <Card.Img variant="top" style={{width: '352px', height: '450px'}} src={`${process.env.REACT_APP_PHOTOPATHS}${ser.Foto_S}`} />
                  </Card.Body>
                      <Card.Body>
                          <Card.Body className="container d-flex mt-2 flex-wrap mx-auto">
                      <Card.Text>
                         Titulli: <strong>{ser.Titulli}</strong>
                        </Card.Text>
                        <Card.Text className="mx-auto">
                         Kategoria: <strong>{ser.Kategoria}</strong>
                        </Card.Text>
                    
                        <Card.Text>
                         Numri i sezonave: <strong>{ser.NrSezonave} &nbsp;</strong>
                        </Card.Text>

                      <Card.Text>
                         Data Postimit: <strong>{ser.Data_PostimitS} &nbsp;</strong>
                        </Card.Text>
                    
                        <Card.Text>
                          Aktori Kryesor<Link className="nav-link d-inline" to={`/detajeteaktoritteserialit/${ser.AktortSId}`}><strong>{ser.Emri} {ser.Mbiemri}</strong></Link>
                        </Card.Text>

                        <Card.Text className="mx-auto">
                          Producenti:<Link className="nav-link d-inline" to={`/detajeteproducenteveteserialit/${ser.ProducentiSID}`}><strong>{ser.Emri1} {ser.Mbiemri1}</strong></Link>
                        </Card.Text>

                        <Card.Text>
                        Regjisori:<Link className="nav-link d-inline" to={`/detajeteregjisoritteserialit/${ser.RegjisoriSID}`}><strong>{ser.Emri2} {ser.Mbiemri2}</strong></Link>
                        </Card.Text>

                        <Card.Text className="mx-auto">
                     Skenaristi: <Link className="nav-link d-inline" to={`/detajeteskenaristitteserialit/${ser.SkenaristatSId}`}><strong>{ser.Emri3} {ser.Mbiemri3}</strong></Link>
                        </Card.Text>

                      </Card.Body>
                    </Card.Body>
                  </Card>
                
                
                <Card className="mt-4">
                  <Card.Body>
                    <Card.Text className="mx-auto">
                         Pershkrimi i Serialit: <strong>{ser.PershkrimiS}</strong>
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