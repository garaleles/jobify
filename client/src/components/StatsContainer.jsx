import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';

const StatsContainer = ({defaultStats}) => {
    const stats = [{
        title:'bekleyen başvurular',
        count: defaultStats?.pending || 0,
        icon: <FaSuitcaseRolling />,
        color: '#f59e0b',
        bcg: '#fef3c7'

    },
    {
        title:'planlanan görüşmeler',
        count: defaultStats?.interview || 0,
        icon: <FaCalendarCheck />,
        color: '#38a169',
        bcg: '#c6f6d5'

    },
    {
        title:'reddedilen başvurular',
        count: defaultStats?.declined || 0,
        icon: <FaBug />,
        color: '#e53e3e',
        bcg: '#fed7d7'
    },
    ]
    return (
        <div>
            <Wrapper>
                {stats.map((item, index) => {
                    return <StatItem key={item.title} {...item} />
                })
                }
            </Wrapper>
        </div>
    )

}

export default StatsContainer