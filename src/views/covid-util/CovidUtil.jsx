import React, {Component} from 'react';
import {fetchData} from '../../global/services/covid-19'

class CovidUtil extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            covidData: {             
                totalMortes: 0
            }
         }
    }

    async componentDidMount(){
        const mundo = await fetchData();

        this.setState({
            covidData: {
                totalMortes: mundo.deaths.value
            }            
        })
    }

    render() { 
        const styleSeparator = {
            marginBottom: 10
        }

        return ( 
            <div className="p-grid p-fluid">

                <div className="p-col-12 p-lg-12">
                    <div className="card ">
                        <h1>Timeline</h1>
                        <a 
                            href="https://youtu.be/_V4r5ibOm5g " 
                            target="_blank" 
                            rel="noopener noreferrer">
                            <i className='fas fa-video' style={{marginRight: '10px'}}/> 
                            Documentário: Como saímos de um surto de pneumonia supostamente inofensivo numa cidade do interior da China para a atual pandemia
                        </a>

                         <div className="p-col-12 p-lg-12" style={styleSeparator} />                    

                        <a 
                            href="https://www.youtube.com/watch?v=5NJaUIHtwOo" 
                            target="_blank" 
                            rel="noopener noreferrer">
                            <i className='fas fa-video' style={{marginRight: '10px'}}/> 
                            Cronologia: De pneumonia misteriosa a {this.state.covidData.totalMortes} mortes por covid-19
                        </a>

                        <div className="p-col-12 p-lg-12" style={styleSeparator} />                    

                        <h1>Belo Horizonte</h1>
                        <a 
                            href="https://www.covidbh2020.com/" 
                            target="_blank" 
                            rel="noopener noreferrer">
                            <i className='fas fa-virus' style={{marginRight: '10px'}}/> 
                            Acompanhe o mapa interativo da COVID-19 com informações por bairros na capital mineira
                        </a>

                        <div className="p-col-12 p-lg-12" style={styleSeparator} /> 

                        <h1>Johns Hopkins</h1>
                        <a 
                            href="https://coronavirus.jhu.edu/map.html" 
                            target="_blank" 
                            rel="noopener noreferrer">
                            <i className='fas fa-university' style={{marginRight: '10px'}}/> 
                            Painel do centro de ciência e engenharia de sistemas sobre a COVID-19
                        </a>

                        <div className="p-col-12 p-lg-12" style={styleSeparator} /> 
                    </div>
                </div>
            </div>
         ); 
    }
}
 
export default CovidUtil;