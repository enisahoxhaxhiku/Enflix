
import React , {Component} from 'react';

import {Table, Dropdown} from 'react-bootstrap';

import { Button , ButtonToolbar} from 'react-bootstrap';

import { AddRegjisoretEFilmit } from './AddRegjisoretEFilmit';

import { EditRegjisoretEFilmit } from './EditRegjisoretEFilmit';
import {Helmet} from "react-helmet";
import {NavLink} from 'react-router-dom';


export class RegjisoretEFilmit extends Component{

    constructor(props){
        super(props);
        this.state={regs:[] , addModalShow:false , editModalShow:false}
    }


    refreshList(){
        fetch(process.env.REACT_APP_API+'regjisoretefilmit')
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


    deleteReg(regID){
        if(window.confirm('Jeni te sigurt qe doni ta fshini Regjisorin e Filmit ?')){
            fetch(process.env.REACT_APP_API+'regjisoretefilmit/' +regID,{
                method:'DELETE',
                header :{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }

    render(){
        const{regs, regemri , regmbiemri , regbiografia , regid}=this.state;
        let addModalClose =()=>this.setState({addModalShow:false});
        let editModalShow = ()=>this.setState({editModalShow:false});
        return(
            <div className="container">
                <Helmet>
                <title>Regjisoret e Filmit</title>
                </Helmet>
                <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                        Regjisoret e Filmit
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <NavLink className="nav-link d-inline p-1 text-black" to="regjisoreteserialit">
                            Regjisoret e Serialit
                        </NavLink>
                    </Dropdown.Menu>
                    
                </Dropdown>

                <ButtonToolbar>
                    <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                        Shto Regjisorin
                    </Button>
                    <AddRegjisoretEFilmit show={this.state.addModalShow}  onHide={addModalClose}/>
                </ButtonToolbar>

                <Table className="mt-4"  striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <td>Emri</td>
                            <td>Mbiemri</td>
                            <td>Biografia</td>
                            <td>Veprime</td>
                        </tr>
                    </thead>
                    <tbody>
                        {regs.map(r=>
                            <tr key={r.RegjisoriFID}>
                                <td>{r.Emri}</td>
                                <td>{r.Mbiemri}</td>
                                <td>{r.Biografia}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, regid:r.RegjisoriFID, regemri:r.Emri,
                                        regmbiemri:r.Mbiemri, regbiografia:r.Biografia})}>
                                            Edit
                                            </Button>
                                            
                                        <Button className="mr-2" variant="danger" onClick={()=>this.deleteReg(r.RegjisoriFID)}> 
                                        Delete
                                        </Button>
                                        <EditRegjisoretEFilmit show={this.state.editModalShow} onHide={editModalShow}
                                            regid={regid}
                                            regemri={regemri}
                                            regmbiemri={regmbiemri}
                                            regbiografia={regbiografia}
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