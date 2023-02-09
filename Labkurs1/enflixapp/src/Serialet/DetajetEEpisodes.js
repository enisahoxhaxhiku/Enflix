import React,{Component} from "react";
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
import {Card , Dropdown} from 'react-bootstrap';
import ReactPlayer from 'react-player/youtube';



export class DetajetEEpisodes extends Component{

    constructor(props){
        super(props)
        this.state={seri:[]}
    }

    refreshList(){
        let {eppid} = this.props.match.params;
        fetch(process.env.REACT_APP_API+`seriali/${eppid}/episoda`, {
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
        const{seri}=this.state;
        return(
            <div className="container">
                
                <Helmet>
                <title>Detajet e Sezones se Serialit</title>
                </Helmet>
               
                <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                        Episoda
                    </Dropdown.Toggle>
                    <Dropdown.Menu>

                    {seri.map(ser=>
                    <Link  className="nav-link d-inline p-1 text-black" to={`/detajeteserialit/${ser.SerialiID}`}>
                            Detajet e Serialit
                        </Link>
                        )}
                   
                      
                        
                    </Dropdown.Menu>
         
                </Dropdown>

                <div className="container d-flex mt-4 flex-wrap">
                {seri.map(ser=>
                <div key={ser.EpisodaID} style={{width: '100%'}}>

                    

                <ReactPlayer url={ser.Linku}
                width='100%' controls/>
                Episoda "<strong>{ser.Titulli}</strong>"
                <Card className="mt-4">
                    <Card.Body>
                    <i>{ser.PershkrimiE}</i>
                    </Card.Body>
                </Card>
                
                </div>
                )}
                </div>
                
            </div>
        )


    }


}