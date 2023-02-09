import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import { Table,Dropdown } from 'react-bootstrap';
import {Helmet} from "react-helmet";

import {Button,ButtonToolbar} from 'react-bootstrap';
import { AddProducentetESerialit } from './AddProducentetESerialit';
import { EditProducentetESerialit } from './EditProducentetESerialit';



export class ProducentetESerialit extends Component{

    constructor(props){
        super(props);
        this.state={prods:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'producenteteserialit')
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

    deleteProds(prodid){
        if(window.confirm('Jeni te sigurt qe doni te fshini Producentin e Serialit?')){
            fetch(process.env.REACT_APP_API+'producenteteserialit/'+prodid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }
 

    render(){
        const{prods,prodemri,prodmbiemri,prodbiografia,prodid}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div className="container">
                <Helmet>
                <title>Producentet E Serialit</title>
                </Helmet>
                <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                    Producentet e Serialit
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <NavLink className="nav-link d-inline p-1 text-black" to="producentetefilmit">
                            Producentet e Filmit
                        </NavLink>
                    </Dropdown.Menu>
                </Dropdown>

                <ButtonToolbar>
                    <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                        Shto Producentin
                    </Button>

                    <AddProducentetESerialit show = {this.state.addModalShow} 
                    onHide = {addModalClose}/>
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
                          <tr key={p.ProducentiSID}>
                              <td>{p.Emri}</td>
                              <td>{p.Mbiemri}</td>
                              <td>{p.Biografia}</td>
                              <td>
                                  <ButtonToolbar>
                                  <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, prodid:p.ProducentiSID,
                                prodemri:p.Emri,prodmbiemri:p.Mbiemri,prodbiografia:p.Biografia})}>
                                            Edit
                                        </Button>
                                      <Button className="mr-2" 
                                      variant="danger" onClick={()=>this.deleteProds(p.ProducentiSID)}>
                                        Delete
                                      </Button>

                             
                                      <EditProducentetESerialit show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        prodid={prodid}
                                        prodemri={prodemri}
                                        prodmbiemri={prodmbiemri}
                                        prodbiografia={prodbiografia} />
                                  </ButtonToolbar>
                              </td>
                          </tr> )}
                    </tbody>
                </Table>
            </div>
        )
    }



}