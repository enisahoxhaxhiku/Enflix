import React,{Component} from "react";
import {NavLink} from 'react-router-dom';
import {Table, Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddKategoritEFilmit} from './AddKategoritEFilmit';
import {EditKategoritEFilmit} from './EditKategoritEFilmit';

export class KategoritEFilmit extends Component{
    constructor(props){
        super(props);
        this.state={cate:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'kategoritefilmit')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cate:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }
    
    deleteAkt(aktid){
        if(window.confirm('Jeni i sigurt qe doni ta fshini Kategorin e fimlmit?')){
            fetch(process.env.REACT_APP_API+'kategoritefilmit/'+aktid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }
    
    render(){
        const {cate, categ, catid}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div className="container">
                <Helmet>
                <title>Kategorite e Filmit</title>
                </Helmet>
                <Dropdown className="d-flex justify-content-end mt-4">
                  <Dropdown.Toggle variant="success">
                    Kategorite e Filmit
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink className="nav-link d-inline p-1 text-black" to="kategoriteserialit">
                      Kategorite e Serialit
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>

                <ButtonToolbar>
                    <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                       Shto Kategorine
                    </Button>

                    <AddKategoritEFilmit show={this.state.addModalShow}
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
                        {cate.map(cat=>
                            <tr key={cat.KategoriaFId}>
                                <td>{cat.Kategoria}</td>
                                <td>
                               <ButtonToolbar>
                                   <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, catid:cat.KategoriaFId,
                                categ:cat.Kategoria})}>
                                       Edit
                                   </Button>

                                   <Button className="mr-2" variant="danger" onClick={()=>this.deleteAkt(cat.KategoriaFId)}>
                                       Delete
                                   </Button>

                                   <EditKategoritEFilmit show={this.state.editModalShow} onHide={editModalClose}
                                   catid={catid}
                                   categ={categ}/>
                               </ButtonToolbar>

                                </td>
                            </tr>)}
                    </tbody>

                </Table>
            </div>
        )
    }
}