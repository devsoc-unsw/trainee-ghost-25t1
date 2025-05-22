import './TeamDetail.css';
import pokeball from '../../assets/pokeball3D.png';
import ProgressBar from 'react-bootstrap/ProgressBar';

// Component that displays a completed task summary
// Input struct of fields: {name: string, course: string, level: number, progress: number}
function TeamDetail({user, teamData}) {
    // The percent of the team is to the next level * 100
    const level = Math.floor(teamData.xp / 100);
    const percentToNextLevel = Math.floor(teamData.xp % 100)
    return (
       <section className="team-detail-box">
            <div className="detail-text-row">
                <div className="vert-text" id="vert-text-1">
                    <p className='team-name'>{teamData.name}</p>
                    <p className="welcome-text">Welcome {user.name}!</p>
                </div>
                <div className='vert-text' id="vert-text-2">
                    <p className='class-code'>{teamData.class_code}</p>
                    <p className='level'>Lv.{level}</p>
                </div>
            </div>
            <div className="detail-progress-row">
                <img className="poke-image" src={pokeball} />
                <ProgressBar
                    className={`progress-bar ${percentToNextLevel === 0 ? "no-progress" : ""}`}
                    striped
                    animated
                    now={percentToNextLevel}
                    label={percentToNextLevel + '%'}
                />
            </div>
        </section>
    )
}

export default TeamDetail;