import Wrapper from '../assets/wrappers/JobInfo';

const JobInfo = ({icon, text}) => {
    return (
        <Wrapper>
            <span className='job-icon'>{icon}</span>
            <p className='job-text'>{text}</p>
        </Wrapper>
    )

}

export default JobInfo