import React,{Component} from "react";
import {Table,Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";

import {Button,ButtonToolbar} from 'react-bootstrap';
import { AddSerialiSezona } from "./AddSerialiSezona";


export class SerialiSezona extends Component{

    constructor(props){
        super(props)
        this.state={sersez:[],addModalShow:false}
    }


    refreshList(){
        fetch(process.env.REACT_APP_API+'serialisezona')
        .then(response=>response.json())
        .then(data=>{
            this.setState({sersez:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
    this.refreshList();
    }


    deleteSerialiSezona(ssID){
        if(window.confirm('Jeni te sigurt qe doni te fshini lidhjen Serial-Sezone?')){
            fetch(process.env.REACT_APP_API+'serialisezona/'+ssID,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }




    render(){

        const{sersez,ssID}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});

        return(
            <div className="container">
        <Helmet>
                <title>Lidhjet Serial Sezone</title>
        </Helmet>
        <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                        Lidhjet Serial Sezone
                    </Dropdown.Toggle>
                    <Dropdown.Menu>

                      
                        <Dropdown.Item href="seriali">Seriali</Dropdown.Item>
                        <Dropdown.Item href="sezona">Sezonat</Dropdown.Item>
                        <Dropdown.Item href="episoda">Episodat</Dropdown.Item>
                        <Dropdown.Item href="sezonaepisodi">Lidhjet Sezone Episod</Dropdown.Item>
                    </Dropdown.Menu>
         
                </Dropdown>
                <ButtonToolbar>
        <Button className="mt-4" variant="success" onClick={()=>this.setState({addModalShow:true})}>
            Shto Lidhjen
        <AddSerialiSezona show={this.state.addModalShow} 
        onHide={addModalClose}/>
        </Button>
        </ButtonToolbar>
        <Table className="mt-4"  striped bordered hover size="sm">
            <thead>
            <tr>
                        <th>Seriali ID</th>
                        <th>Sezona ID</th>
                        <th>Numri i sezones</th>
                        <th>Veprime</th>
                        </tr>
            </thead>
            <tbody>
                {sersez.map(ss=>
                    <tr key={ss.SezonaID}>
                        <td>{ss.SerialiID}</td>
                        <td>{ss.SezonaID}</td>
                        <td>{ss.NrSezones}</td>
                        <td>
                        <ButtonToolbar>
                                 
                                   <Button className="mr-2" variant="danger" onClick={()=>this.deleteSerialiSezona(ss.SezonaID)}>
                                       Delete
                                   </Button>
                                  
                        </ButtonToolbar>
                         </td>
                    </tr>)}
            </tbody>
        </Table>
        
            </div>
        )


    }



}