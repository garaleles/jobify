import { useState } from 'react';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import Wrapper from '../assets/wrappers/ChartsContainer';
const ChartsContainer = ({data}) => {
    const [barChart, setBarChart] = useState(true);
    const [areaChart, setAreaChart] = useState(false);


    return (
        <Wrapper>
            <h4>Aylık Uygulamalar</h4>
            <button onClick={() => {setBarChart(!barChart); setAreaChart(areaChart)}}>
                {barChart ? 'Alan Grafik' : 'Bar Grafik'}
            </button>
            {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}

        </Wrapper>
    )

}

export default ChartsContainer