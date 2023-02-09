import React , {Component} from 'react';
import {Table, Dropdown} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import ReadMoreReact from 'read-more-react';

import { Button , ButtonToolbar} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import { AddRegjisoretESerialit } from './AddRegjisoretESerialit';
import { EditRegjisoretESerialit } from './EditRegjisoretSerialit';


export class RegjisoretESerialit extends Component{
    constructor(props){
        super(props);
        this.state={regs:[] , addModalShow:false , editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'regjisoreteserialit')
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
            fetch(process.env.REACT_APP_API+'regjisoreteserialit/'+regID,{
                method:'DELETE',
                header :{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }

    render(){
        const{regs, regemri, regmbi, regbio, regid}=this.state;
        let addModalClose =()=>this.setState({addModalShow:false});
        let editModalShow = ()=>this.setState({editModalShow:false});
        return(
            <div className="container">
                <Helmet>
                <title>Regjisoret e Serialit</title>
                </Helmet>
                <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                        Regjisoret e Serialit
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <NavLink className="nav-link d-inline p-1 text-black" to="regjisoretefilmit">
                            Regjisoret e Filmit
                        </NavLink>
                    </Dropdown.Menu>
                </Dropdown>

                <ButtonToolbar>
                    <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                        Shto Regjisorin
                    </Button>
                    <AddRegjisoretESerialit show={this.state.addModalShow}  onHide={addModalClose}/>
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
                        {regs.map(regj=>
                            <tr key={regj.RegjisoriSID}>
                                <td>{regj.Emri}</td>
                                <td>{regj.Mbiemri}</td>
                                <td style={{ cursor: 'pointer' }}><ReadMoreReact text={regj.Biografia}
                                    min={50}
                                    readMoreText="Read more"/></td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, regid:regj.RegjisoriSID, regemri:regj.Emri,
                                        regmbi:regj.Mbiemri, regbio:regj.Biografia})}>
                                            Edit
                                            </Button>
                                            
                                        <Button className="mr-2" variant="danger" onClick={()=>this.deleteReg(regj.RegjisoriSID)}> 
                                        Delete
                                        </Button>
                                        <EditRegjisoretESerialit show={this.state.editModalShow} onHide={editModalShow}
                                            regid={regid}
                                            regemri={regemri}
                                            regmbi={regmbi}
                                            regbio={regbio}
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