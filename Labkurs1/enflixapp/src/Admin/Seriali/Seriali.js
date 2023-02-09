import React,{Component} from "react";
import {Table,Dropdown,Image} from 'react-bootstrap';
import {Helmet} from "react-helmet";

import {Button,ButtonToolbar} from 'react-bootstrap';
import{EditSerialin} from './EditSerialin';
import { AddSerialin } from "./AddSerialin";



export class Seriali extends Component{
    constructor(props){
        super(props)
        this.state={seri:[],addModalShow:false,editModalShow:false}
    }

 
    refreshList(){
        fetch(process.env.REACT_APP_API+'seriali')
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
 
  
  
    deleteSerial(serid){
        if(window.confirm('Jeni i sigurt qe doni ta fshini Serialin?')){
            fetch(process.env.REACT_APP_API+'seriali/'+serid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }

render(){
  
    const {seri,serid,tit,nrs,persh,foto}=this.state;
    let addModalClose=()=>this.setState({addModalShow:false});
    let editModalClose=()=>this.setState({editModalShow:false});
    return(

        <div className="container">
            <Helmet>
                <title>Serialet</title>
            </Helmet>
            
            <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                        Serialet
                    </Dropdown.Toggle>
                    <Dropdown.Menu>

                      
                        <Dropdown.Item href="sezona">Sezonat</Dropdown.Item>
                        <Dropdown.Item href="episoda">Episodat</Dropdown.Item>
                        <Dropdown.Item href="sezonaepisodi">Lidhjet Sezone Episod</Dropdown.Item>
                        <Dropdown.Item href="serialisezona">Lidhjet Serial Sezone</Dropdown.Item>
                    </Dropdown.Menu>
         
                </Dropdown>
                <ButtonToolbar>
                <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>Shto Serialin</Button>
                <AddSerialin show={this.state.addModalShow}
                    onHide={addModalClose}/>
            </ButtonToolbar>

            <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>SerialiID</th>
                        <th>Titulli</th>
                        <th>Numri Sezonave</th>
                        <th>Pershkrimi</th>
                        <th>Foto</th>
                        <th>Kategoria</th>
                        <th>Veprime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seri.map(ser=>
                            <tr key={ser.SerialiID}>
                                <td>{ser.SerialiID}</td>
                                <td>{ser.Titulli}</td>
                                <td>{ser.NrSezonave}</td>
                                <td>{ser.PershkrimiS}</td>
                                <td><Image width="70px" height="70px" src={`${process.env.REACT_APP_PHOTOPATHS}${ser.Foto_S}`}/></td>
                                <td>{ser.Kategoria}</td>
                                <td>
                                <ButtonToolbar>
                                   <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, serid:ser.SerialiID, tit:ser.Titulli,nrs:ser.NrSezonave,persh:ser.PershkrimiS,foto:ser.Foto_S})}>
                                       Edit
                                   </Button>

                                   <Button className="mr-2" variant="danger" onClick={()=>this.deleteSerial(ser.SerialiID)}>
                                       Delete
                                   </Button>

                                   <EditSerialin show={this.state.editModalShow}
                                      onHide={editModalClose}
                                      serid={serid}
                                      tit={tit}
                                      nrs={nrs}
                                      persh={persh}
                                      foto={foto}
                                      
                                     
                                    />
                               </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>

                </Table>


        </div>

       
    )




}











}