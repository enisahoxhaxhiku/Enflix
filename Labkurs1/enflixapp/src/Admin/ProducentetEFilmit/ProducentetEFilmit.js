import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Table, Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";

import { Button , ButtonToolbar} from 'react-bootstrap';
import { AddProducentetEFilmit } from './AddProducentetEFilmit';
import { EditProducentetEFilmit } from './EditProducentetEFilmit';

export class ProducentetEFilmit extends Component{

    constructor(props){
        super(props);
        this.state={prods:[] , addModalShow:false , editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'producentetefilmit')
        .then(response=>response.json())
        .then(data=>{
            this.setState({prods:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteProd(prodID){
        if(window.confirm('Jeni i sigurt qe doni ta fshini Producentin e filmit?')){
            fetch(process.env.REACT_APP_API+'producentetefilmit/'+prodID,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }

    render(){
        const{prods,prodEmri,prodMbiemri,prodBiografia,prodID}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div className="container">
                <Helmet>
                <title>Producentet E Filmit</title>
                </Helmet>
                <Dropdown className="d-flex justify-content-end mt-4">
                  <Dropdown.Toggle variant="success">
                    Producentet e Filmit
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink className="nav-link d-inline p-1 text-black" to="producenteteserialit">
                      Producentet e Serialit
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>
                
                <ButtonToolbar>
                <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                       Shto Producentin
                    </Button>

                    <AddProducentetEFilmit show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>

               <Table className="mt-4" striped bordered hover size="sm">

                    <thead>
                        <tr>
                        <td>Emri</td>
                        <td>Mbiemri</td>
                        <td>Biografia</td>
                        <td>Veprime</td>
                        </tr>
                    </thead>
                    <tbody>
                        {prods.map(p=>
                            
                            <tr key={p.ProducentiID}>
                                <td>{p.Emri}</td>
                                <td>{p.Mbiemri}</td>
                                <td>{p.Biografia}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" 
                                        onClick={()=>this.setState({editModalShow:true,prodID:p.ProducentiID,prodEmri:p.Emri,
                                        prodMbiemri:p.Mbiemri , prodBiografia:p.Biografia})}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger" 
                                        onClick={()=>this.deleteProd(p.ProducentiID)}>
                                            Delete
                                        </Button>

                                        <EditProducentetEFilmit show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        prodID={prodID}
                                        prodEmri={prodEmri}
                                        prodMbiemri={prodMbiemri}
                                        prodBiografia={prodBiografia} />
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
               </Table>

               
            </div>
        )
    }

}