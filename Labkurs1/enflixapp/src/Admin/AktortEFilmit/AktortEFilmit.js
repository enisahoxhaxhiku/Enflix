import React,{Component} from "react";
import {NavLink} from 'react-router-dom';
import {Table, Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";
import ReadMoreReact from 'read-more-react';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddAktortEFilmit} from './AddAktortEFilmit';
import {EditAktortEFilmit} from './EditAktortEFilmit';

export class AktortEFilmit extends Component{
    constructor(props){
        super(props)
        this.state={akto:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'aktortefilmit')
        .then(response=>response.json())
        .then(data=>{
            this.setState({akto:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }
    
    deleteAkt(aktid){
        if(window.confirm('Jeni i sigurt qe doni ta fshini Aktorin e filmit?')){
            fetch(process.env.REACT_APP_API+'aktortefilmit/'+aktid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }
    
    render(){
        const {akto, emri, mbi, bio, aktid}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div className="container">
                <Helmet>
                <title>Aktort E Filmit</title>
                </Helmet>
                <Dropdown className="d-flex justify-content-end mt-4">
                  <Dropdown.Toggle variant="success">
                    Aktort e Filmit
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink className="nav-link d-inline p-1 text-black" to="aktorteserialit">
                      Aktort e Serialit
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>

                <ButtonToolbar>
                    <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                       Shto Aktorin
                    </Button>

                    <AddAktortEFilmit show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Emri</th>
                        <th>Mbiemri</th>
                        <th>Biografia</th>
                        <th>Veprime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {akto.map(akt=>
                            <tr key={akt.AktortiFId}>
                                <td>{akt.Emri}</td>
                                <td>{akt.Mbiemri}</td>
                                <td style={{ cursor: 'pointer' }}><ReadMoreReact text={akt.Biografia}
                                    min={50}
                                    readMoreText="Read more"/></td>
                                <td>
                               <ButtonToolbar>
                                   <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, aktid:akt.AktortiFId,
                                emri:akt.Emri,mbi:akt.Mbiemri,bio:akt.Biografia})}>
                                       Edit
                                   </Button>

                                   <Button className="mr-2" variant="danger" onClick={()=>this.deleteAkt(akt.AktortiFId)}>
                                       Delete
                                   </Button>

                                   <EditAktortEFilmit show={this.state.editModalShow} onHide={editModalClose}
                                   aktid={aktid}
                                   emri={emri}
                                   mbi={mbi}
                                   bio={bio}/>
                               </ButtonToolbar>

                                </td>
                            </tr>)}
                    </tbody>

                </Table>
            </div>
        )
    }
}