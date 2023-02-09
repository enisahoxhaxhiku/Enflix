import React , {Component} from 'react';
import {Table, Dropdown} from 'react-bootstrap';
import { Button , ButtonToolbar} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import {NavLink} from 'react-router-dom';
import {AddSkenaristetESerialit} from './AddSkenaristetESerialit';
import { EditSkenaristetESerialit } from './EditSkenaristetESerialit';

export class SkenaristetESerialit extends Component{

   constructor(props){
    super(props)
    this.state={skens:[] , addModalShow:false , editModalShow:false}
   }

   refreshList(){
    fetch(process.env.REACT_APP_API+'skenaristateserialit')
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
    if(window.confirm('Jeni te sigurt qe doni ta fshini Skenaristin e Serialit ?')){
        fetch(process.env.REACT_APP_API+'skenaristateserialit/' +skeID,{
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
                <title>Skenaristet e Serialit</title>
            </Helmet>

            <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                        Skenaristet e Serialit
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <NavLink className="nav-link d-inline p-1 text-black" to="skenaristetefilmit">
                            Skenaristet e Filmit
                        </NavLink>
                    </Dropdown.Menu>
                    
                </Dropdown>


                <ButtonToolbar>
                    <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                        Shto Skenaristin
                    </Button>
                    <AddSkenaristetESerialit show={this.state.addModalShow}  onHide={addModalClose}/>
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
                            <tr key={ske.SkenaristatSId}>
                                <td>{ske.Emri}</td>
                                <td>{ske.Mbiemri}</td>
                                <td>{ske.Biografia}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, skeid:ske.SkenaristatSId, skeemri:ske.Emri,
                                        skembiemri:ske.Mbiemri, skebiografia:ske.Biografia})}>
                                            Edit
                                            </Button>
                                            
                                        <Button className="mr-2" variant="danger" onClick={()=>this.deleteSke(ske.SkenaristatSId)}> 
                                        Delete
                                        </Button>
                                        <EditSkenaristetESerialit show={this.state.editModalShow} onHide={editModalShow}
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