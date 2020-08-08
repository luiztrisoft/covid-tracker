import React, {Component} from 'react';
import {fetchData, fetchBrazilianDataByUf, fetchDailyData} from '../../global/services/covid-19'
import {Chart} from 'primereact/chart';
import {converter} from '../../global/util/ConverterEstados'
import { connect } from 'react-redux';

class Dashboard extends Component {    
    constructor() {
        super();
        
        this.state = {
            mortesBrasil:0,
            
            covidData: {
                totalCasos: 0,
                totalMortes: 0
            },
            dailyData:{},
            estadosBrasileiros:{},
            brasilMundo: {}
        };
    }

    async componentDidMount(){
        const brasil = await fetchData('Brazil');
        const mundo = await fetchData();
        const brazilianData = await fetchBrazilianDataByUf()
        const initialDailyData = await fetchDailyData();
        
        initialDailyData.forEach(element => {
            if(new Date(element.date) > new Date('2020-05-22') && new Date(element.date) < new Date('2020-05-29')){
                
            }
        });
        
        let estados = [];
        brazilianData.map((_estado)=>(            
            estados.push({'estado': converter(_estado.provinceState), 'mortes':_estado.deaths})
        ))
        this.setState({
            estadosBrasileiros:{                 
                labels: estados.map((e) => e.estado),
                datasets: [
                    {
                        label: 'Total de mortes por estados brasileiros',
                        backgroundColor: '#8a4baf',
                        data: estados.map((e) => e.mortes)
                    }
                ]
            },
            covidData: {
                totalMortesBrasil: brasil.deaths.value,
                totalMortesMundo: mundo.deaths.value,
                totalCasos: brasil.confirmed.value,
                labels: ['Mundo', 'Brasil'],
                datasets: [
                    {
                        label: 'Total de casos',
                        backgroundColor: '#663399',
                        data: [mundo.confirmed.value,brasil.confirmed.value]
                    },                                       
                    {
                        label: 'Mortes',
                        backgroundColor: '#d9bae8',
                        data: [ mundo.deaths.value, brasil.deaths.value]
                    }
                ]
            },
            brasilMundo:{
                labels: ['Mortes no Brasil', 'Mortes no mundo'],
                datasets: [
                    {
                        data: [brasil.deaths.value, mundo.deaths.value],
                        backgroundColor: ["#663399","#d9bae8"]
                    }
                ]                
            },
    
            dailyData: {
                labels: initialDailyData.map(({ date }) => date),
                //labels: initialDailyData.forEach(element =>  (new Date(element.date) > new Date('2020-05-22') && new Date(element.date) < new Date('2020-05-29'))),
               
                datasets: [{                      
                        data: initialDailyData.map((data) => data.deaths),                  
                        label: 'Mortes',
                        borderColor: '#fff',   
                        backgroundColor: "#663399",               
                        fill: false,
                    },{
                        data: initialDailyData.map((data) => data.confirmed),
                        label: 'Infectados',
                        borderColor: '#fff',
                        backgroundColor: '#d9bae8',
                        fill: false
                    }
            ]}
        })        
    }

    percentualMortes = () =>{
        return `Percentual de mortes no Brasil: ${this.imporVirgula(this.arredondarDuasCasas(this.calcularPercentual())) }%`
    }

    calcularPercentual (){
        const {totalMortesBrasil, totalMortesMundo} = this.state.covidData;
        return (totalMortesBrasil * 100) / totalMortesMundo || 0;       
    }
        
    arredondarDuasCasas(valor){
        return valor.toFixed(2);
    }

    imporVirgula (valor){
        return valor.replace(".", ",")
    }

    render() {   
        //https://covid19.mathdro.id/api/countries/Brazil/deaths
        return (  
            <div className="p-grid p-fluid">   
                <div className="p-col-12 p-lg-12">        
                    <h1 > 
                        <i className='fas fa-home' style={{marginRight: '10px'}}/> 
                        {this.props.dashboardInfo.name}
                        <span style={{marginLeft: '10px', fontSize: '10px'}}>Version: {this.props.dashboardInfo.version}</span>
                    </h1>          
                </div> 

                <div className="p-col-12 p-lg-12">
                    <div className="card">
                       <Chart type="bar" data={this.state.estadosBrasileiros} height="70"/>
                    </div>
                </div>

                 <div className="p-col-12 p-lg-6">
                    <div className="card">
                        <label> Comparação entre Brasil e o mundo </label>
                        <Chart type="bar" data={this.state.covidData} height="130"/>
                    </div>
                </div>      

                <div className="p-col-12 p-lg-6">
                    <div className="card"> 
                    {/* 
                    https://www.youtube.com/watch?v=_V4r5ibOm5g&list=LLkdJNcMKlxTMjrXzSMoKzjg&index=51&t=32s
                    */}
                        {/* 8,95 07/06/2020 19:00 */}
                        {/* 9,00 08/06/2020 21:00 */}
                        {/* 9,72 12/06/2020 00:38 */}
                        {/* 9,80 13/06/2020 13:55 */}
                        {/* 9,92 14/06/2020 10:15 */}
                        {/* 9,95 15/06/2020 21:20 */}
                        <label>{this.percentualMortes() || 0} </label>                                           
                        <Chart type="pie" data={this.state.brasilMundo} height="130"/>
                    </div>           
                </div>  
                
                <div className="p-col-12 p-lg-12">
                    <div className="card">
                         <Chart type="line" data={this.state.dailyData} height='100'/>   
                    </div>
                </div>            
            </div>
        )
    }
}

const mapStateToProps = store => ({
    dashboardInfo: store.dashboardReducer.dashboardInfo
  });

export default connect(mapStateToProps, null)(Dashboard);