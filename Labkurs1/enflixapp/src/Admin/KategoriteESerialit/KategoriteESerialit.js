import React ,{Component} from "react";
import {NavLink} from 'react-router-dom';
import {Table, Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";


import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddKategoriteESerialit} from './AddKategoriteESerialit';
import {EditKategoriteESerialit} from './EditKategoriteESerialit';

export class KategoriteESerialit extends Component{


    constructor(props){
        super(props);
        this.state={kategors:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'kategoriteeserialit')
        .then(response=>response.json())
        .then(data=>{
            this.setState({kategors:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteKategorine(katID){
        if(window.confirm('Jeni i sigurt qe doni te fshini Kategorine e serialit?')){
            fetch(process.env.REACT_APP_API+'kategoriteeserialit/'+katID, {
                method : 'DELETE',
                header : {
                    'Accept' : 'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }


render(){
        const {kategors, kategoria, katID}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div className="container">
                 <Helmet>
                <title>Kategorite e Serialit</title>
                </Helmet>
                 <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                    Kategorite e Serialit
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <NavLink className="nav-link d-inline p-1 text-black" to="kategoritEFilmit">
                            Kategorit e Filmit
                        </NavLink>
                    </Dropdown.Menu>
                </Dropdown>
             

                <ButtonToolbar>
                    <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                       Shto Kategorine
                    </Button>

                    <AddKategoriteESerialit show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Kategorite</th>
                        <th>Veprime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kategors.map(kategorite=>
                            <tr key={kategorite.KategoriaSID}>
                                <td>{kategorite.Kategoria}</td>
                                <td>
                               <ButtonToolbar>
                                   <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, katID:kategorite.KategoriaSID,
                                kategoria:kategorite.Kategoria})}>
                                       Edit
                                   </Button>

                                   <Button className="mr-2" variant="danger" onClick={()=>this.deleteKategorine(kategorite.KategoriaSID)}>
                                       Delete
                                   </Button>

                                   <EditKategoriteESerialit show={this.state.editModalShow} onHide={editModalClose}
                                   katID={katID}
                                   kategoria={kategoria}/>
                               </ButtonToolbar>

                                </td>
                            </tr>)}
                    </tbody>

                </Table>
            </div>
        )
    }
}

