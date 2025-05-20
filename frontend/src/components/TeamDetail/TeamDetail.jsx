import './TeamDetail.css';
import pokeball from '../../assets/pokeball3D.png';
import ProgressBar from 'react-bootstrap/ProgressBar';

// Component that displays a completed task summary
// Input struct of fields: {teamname: string, course: string, level: number, progress: number}
function TeamDetail({fields}) {

    return (
       <section className="team-detail-box">
            <div className="detail-text-row">
                <p className='team-name'>Temp name</p>
                <div className='vert-text'>
                    <p className='level'>COMP1531</p>
                    <p className='level'>Lvl 3</p>
                </div>
            </div>
            <div className="detail-progress-row">
                <img className="poke-image" src={pokeball} />
                {/* progress bar for xp */}
                <ProgressBar className="progress-bar" variant="success" now={60} label={`60%`} />
            </div>
        </section>
    )
}

export default TeamDetail;