import React,{Component} from "react";
import {Table,Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddSezonen} from './AddSezonen';
import { EditSezonen } from "./EditSezonen";
export class Sezona extends Component{

    constructor(props){
        super(props)
        this.state={sezo:[],addModalShow:false,editModalShow:false}
    }

    refreshList2(){
        fetch(process.env.REACT_APP_API+'sezona')
        .then(response=>response.json())
        .then(data=>{
            this.setState({sezo:data});
        });
    }

    componentDidMount(){
        this.refreshList2();
    }

    componentDidUpdate(){
   
        this.refreshList2();
    }



    deleteSz(szid){
        if(window.confirm('Jeni te sigurt qe doni te fshini Sezonen e Serialit?')){
            fetch(process.env.REACT_APP_API+'sezona/'+szid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }



    render(){
        const{sezo,szid,sznr,sznrep}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div className="container">
        <Helmet>
                <title>Sezona</title>
        </Helmet>
        <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                        Sezonat
                    </Dropdown.Toggle>
                    <Dropdown.Menu>

                      
                        <Dropdown.Item href="seriali">Seriali</Dropdown.Item>
                        <Dropdown.Item href="episoda">Episodat</Dropdown.Item>
                        <Dropdown.Item href="sezonaepisodi">Lidhjet Sezone Episod</Dropdown.Item>
                        <Dropdown.Item href="serialisezona">Lidhjet Serial Sezone</Dropdown.Item>
                    </Dropdown.Menu>
         
                </Dropdown>
        <ButtonToolbar>
        <Button className="mt-4" variant="success" onClick={()=>this.setState({addModalShow:true})}>
            Shto Sezonen
        <AddSezonen show={this.state.addModalShow} 
        onHide={addModalClose}/>
        </Button>
        </ButtonToolbar>



        <Table className="mt-4"  striped bordered hover size="sm">
            <thead>
            <tr>
                        <th>ID</th>
                        <th>Numri i sezones</th>
                        <th>Numri i episodave</th>
                        <th>Veprime</th>
                        </tr>
            </thead>
            <tbody>
                {sezo.map(s=>
                    <tr key={s.SezonaID}>
                        <td>{s.SezonaID}</td>
                        <td>{s.NrSezones}</td>
                        <td>{s.NrEpisodave}</td>
                        <td>
                        <ButtonToolbar>
                                   <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true,szid:s.SezonaID,sznr:s.NrSezones,sznrep:s.NrEpisodave})}>
                                       Edit
                                   </Button>

                                   <Button className="mr-2" variant="danger" onClick={()=>this.deleteSz(s.SezonaID)}>
                                       Delete
                                   </Button>
                                   <EditSezonen show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        szid={szid}
                                        sznr={sznr}
                                        sznrep={sznrep} 
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