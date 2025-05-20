import './TeamDetail.css';
import pokeball from '../../assets/pokeball3D.png';
import ProgressBar from 'react-bootstrap/ProgressBar';

// Component that displays a completed task summary
// Input struct of fields: {teamname: string, course: string, level: number, progress: number}
function TeamDetail({teamData}) {

    // The percent of the team is to the next level * 100
    const level = Math.floor(teamData.xp / 100);
    const percentToNextLevel = Math.floor(teamData.xp % 100)

    return (
       <section className="team-detail-box">
            <div className="detail-text-row">
                <p className='team-name'>Temp name</p>
                <div className='vert-text'>
                    <p className='level'>{teamData.class_code}</p>
                    <p className='level'>Level {level}</p>
                </div>
            </div>
            <div className="detail-progress-row">
                <img className="poke-image" src={pokeball} />
                <ProgressBar className="progress-bar" variant="success" now={percentToNextLevel} label={percentToNextLevel + '%'} />
            </div>
        </section>
    )
}

export default TeamDetail;