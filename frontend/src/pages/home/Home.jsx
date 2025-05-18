import homeBtn from '../../assets/home.png';
import newTaskBtn from '../../assets/new_task.png';
import viewTaskBtn from '../../assets/view_task.png';
import profileBtn from '../../assets/profile.png';
import arrow from '../../assets/arrow.png';
import './Home.css';

function Home() {

    return (
        <>
            <ul>
                <li className="up-arrow"><img src={arrow}/></li>
                <li><img src={homeBtn}/></li>
                <li><img src={newTaskBtn}/></li>
                <li><img src={viewTaskBtn}/></li>
                <li><img src={profileBtn}/></li>
                <li className="down-arrow"><img src={arrow}/></li>
            </ul>
        </>
    )
}

export default Home
