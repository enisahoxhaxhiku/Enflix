import React,{Component} from "react";
import {Table,Dropdown} from 'react-bootstrap';
import {Helmet} from "react-helmet";

import {Button,ButtonToolbar} from 'react-bootstrap';
import{AddSezonaEpisodi} from './AddSezonaEpisodi';


export class SezonaEpisodi extends Component{


    constructor(props){
        super(props)
        this.state={sezoep:[],addModalShow:false}
        
    }
    refreshList3(){
        fetch(process.env.REACT_APP_API+'sezonaepisodi')
        .then(response=>response.json())
        .then(data=>{
            this.setState({sezoep:data});
        });
    }
    componentDidMount(){
        this.refreshList3();
    }

    componentDidUpdate(){
    this.refreshList3();
    }


    deleteSezonaEpisodi(seid){
        if(window.confirm('Jeni te sigurt qe doni te fshini lidhjen Sezone-Episod?')){
            fetch(process.env.REACT_APP_API+'sezonaepisodi/'+seid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }



render(){
    const{sezoep,seid}=this.state;
    let addModalClose=()=>this.setState({addModalShow:false});
   


    return(
        <div className="container">
        <Helmet>
                <title>Lidhjet Sezone Episod</title>
        </Helmet>
        <Dropdown className="d-flex justify-content-end mt-4">
                    <Dropdown.Toggle variant="success">
                        Lidhjet Sezone Episod
                    </Dropdown.Toggle>
                    <Dropdown.Menu>

                      
                        <Dropdown.Item href="seriali">Seriali</Dropdown.Item>
                        <Dropdown.Item href="sezona">Sezonat</Dropdown.Item>
                        <Dropdown.Item href="episoda">Episodat</Dropdown.Item>
                        <Dropdown.Item href="serialisezona">Lidhjet Serial Sezone</Dropdown.Item>
                        
                    </Dropdown.Menu>
         
                </Dropdown>
        <ButtonToolbar>
        <Button className="mt-4" variant="success" onClick={()=>this.setState({addModalShow:true})}>
            Shto Lidhjen
        <AddSezonaEpisodi show={this.state.addModalShow} 
        onHide={addModalClose}/>
        </Button>
        </ButtonToolbar>



        <Table className="mt-4"  striped bordered hover size="sm">
            <thead>
            <tr>
                        <th>Sezona ID</th>
                        <th>Episoda ID</th>
                        <th>Numri i episodes</th>
                        <th>Veprime</th>
                        </tr>
            </thead>
            <tbody>
                {sezoep.map(se=>
                    <tr key={se.EpisodaID}>
                        <td>{se.SezonaID}</td>
                        <td>{se.EpisodaID}</td>
                        <td>{se.NrEpisodes}</td>
                        <td>
                        <ButtonToolbar>
                                 
                                   <Button className="mr-2" variant="danger" onClick={()=>this.deleteSezonaEpisodi(se.EpisodaID)}>
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