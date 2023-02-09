import React , {Component} from 'react';
import {Table, Dropdown} from 'react-bootstrap';
import { Button , ButtonToolbar} from 'react-bootstrap';
import { AddSkenaristetEFilmit } from './AddSkenaristetEFilmit';
import { EditSkenaristetEFilmit } from './EditSkenaristetEFilmit';
import {Helmet} from "react-helmet";
import {NavLink} from 'react-router-dom';


export class SkenaristetEFilmit extends Component{

    constructor(props){
        super(props);
        this.state={skens:[] , addModalShow:false , editModalShow:false}
    }


    refreshList(){
        fetch(process.env.REACT_APP_API+'skenaristatefilmit')
        .then(response=>response.json())
        .then(data=>{
            this.setState({skens:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }


    deleteSke(skeID){
        if(window.confirm('Jeni te sigurt qe doni ta fshini Skenaristin e Filmit ?')){
            fetch(process.env.REACT_APP_API+'skenaristatefilmit/' +skeID,{
                method:'DELETE',
                header :{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }

    render(){
        const{skens, skeemri , skembiemri , skebiografia , skeid}=this.state;
        let addModalClose =()=>this.setState({addModalShow:false});
        let editModalShow = ()=>this.setState({editModalShow:false});
        return(
            <div className="container">
                <Helmet>
                <title>Skenariste e Filmit</title>
                </Helmet>
                <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                        Skenaristet e Filmit
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <NavLink className="nav-link d-inline p-1 text-black" to="skenaristeteserialit">
                            Skenaristet e Serialit
                        </NavLink>
                    </Dropdown.Menu>
                    
                </Dropdown>

                <ButtonToolbar>
                    <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                        Shto Skenaristin
                    </Button>
                    <AddSkenaristetEFilmit show={this.state.addModalShow}  onHide={addModalClose}/>
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
                        {skens.map(ske=>
                            <tr key={ske.SkenaristatId}>
                                <td>{ske.Emri}</td>
                                <td>{ske.Mbiemri}</td>
                                <td>{ske.Biografia}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, skeid:ske.SkenaristatId, skeemri:ske.Emri,
                                        skembiemri:ske.Mbiemri, skebiografia:ske.Biografia})}>
                                            Edit
                                            </Button>
                                            
                                        <Button className="mr-2" variant="danger" onClick={()=>this.deleteSke(ske.SkenaristatId)}> 
                                        Delete
                                        </Button>
                                        <EditSkenaristetEFilmit show={this.state.editModalShow} onHide={editModalShow}
                                            skeid={skeid}
                                            skeemri={skeemri}
                                            skembiemri={skembiemri}
                                            skebiografia={skebiografia}
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