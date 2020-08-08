import React, { Component } from 'react';
import {fetchBrazilianDataByUf} from '../../global/services/covid-19';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';

// import './estados.css';

class Estados extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            brazilianData:[]
         }
    }

    async componentDidMount() {
        console.log(await fetchBrazilianDataByUf())
        this.setState({
            brazilianData: await fetchBrazilianDataByUf()
        });
    }

    flag(rowData, column){
        var src="img/estados/" + rowData.provinceState + ".jpg";
        return <img src={src}  alt={rowData.brand} width="20px" />; 
    }

    actionTemplate(rowData, column) {
        return <Button type="button" icon="pi pi-search" className="p-button-secondary" style={{marginRight: '.1em'}}></Button>                    
    }

    colorTemplate(rowData, column) {
        let gravidade 
        if(rowData.deaths < 1000){
            gravidade = {color: 'blue'};
        }else if(rowData.deaths >= 1000 && rowData.deaths < 5000){
            gravidade = {color: 'green'};
        }else if (rowData.deaths >= 5000 && rowData.deaths <= 10000){
            gravidade = {color: 'orange'};
        }else{
            gravidade = {color: 'red'};
        }
        return <span style={gravidade}>{rowData.deaths}</span>;
    }

    render() { 
        let cols = [
            {}
        ]

        return ( 
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-12">                
                    <DataTable value={this.state.brazilianData} style={{margin: 0, padding: 0}}  >
                        {/* <Column field="uid" header="UID" style={{textAlign:'center', width: '5em'}}/> */}
                        <Column  body={this.flag} style={{textAlign:'center', width: '4em'}}/>
                        <Column field="provinceState" header="Estado" sortable={true}/>
                        <Column field="confirmed" header="Confirmados" style={{textAlign:'right', width: '10em'}}/>
                        <Column field="recovered" header="Recuperados" style={{textAlign:'right', width: '10em'}}/>
                        <Column field="deaths" header="Mortes" sortable={true} body={this.colorTemplate} style={{textAlign:'right', width: '10em'}}/>
                        <Column field="lat" header="Latitude" style={{textAlign:'right', width: '10em'}}/>
                        <Column field="long" header="Longitude" style={{textAlign:'right', width: '10em'}}/>
                        {/* <Column body={this.actionTemplate} style={{textAlign:'center', width: '5em'}}/> */}
                    </DataTable>
                </div>
            </div> 
        );
    }
}
 
export default Estados;