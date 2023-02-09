import React,{Component} from "react";
import {Table, Image} from 'react-bootstrap';
import {Helmet} from "react-helmet";

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddFilmat} from './AddFilmat';
import {EditFilmat} from './EditFilmat';

export class Filmat extends Component{
    constructor(props){
        super(props)
        this.state={film:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'filmat')
        .then(response=>response.json())
        .then(data=>{
            this.setState({film:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteFil(filid){
        if(window.confirm('Jeni i sigurt qe doni ta fshini Filmin?')){
            fetch(process.env.REACT_APP_API+'filmat/'+filid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }
    
    render(){
        const {film, filid, tit, foto, persh, link}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div className="container">
                <Helmet>
                <title>Filmat</title>
                </Helmet>

                <ButtonToolbar>
                    <Button className="mt-4" variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                       Shto Filmin
                    </Button>

                    <AddFilmat show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Titulli</th>
                        <th>Foto</th>
                        <th>Kategoria</th>
                        <th>Veprime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {film.map(fil=>
                            <tr key={fil.FilmatId}>
                                <td>{fil.Titulli}</td>
                                <td><Image width="70px" height="70px" src={`${process.env.REACT_APP_PHOTOPATH}${fil.Foto}`}/></td>
                                <td>{fil.Kategoria}</td>
                                <td>
                                <ButtonToolbar>
                                   <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, filid:fil.FilmatId, tit:fil.Titulli, foto:fil.Foto, persh:fil.Pershkrimi_Filmit, link:fil.Linku_Filmit})}>
                                       Edit
                                   </Button>

                                   <Button className="mr-2" variant="danger" onClick={()=>this.deleteFil(fil.FilmatId)}>
                                       Delete
                                   </Button>

                                   <EditFilmat show={this.state.editModalShow}
                                      onHide={editModalClose}
                                      filid={filid}
                                      tit={tit}
                                      foto={foto}
                                      persh={persh}
                                      link={link}
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