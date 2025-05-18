import homeBtn from '../assets/home.png';
import newTaskBtn from '../assets/new_task.png';
import viewTaskBtn from '../assets/view_task.png';
import profileBtn from '../assets/profile2.png';
import arrow from '../assets/arrow.png';
import '../pages/home/Home.css';

function NavBar({clicked, setClicked}) {
    
    return (
        <>
            <ul>
                <li className="up-arrow"><img src={arrow}/></li>
                <li>
                    <img className={clicked === 'home' ? 'clicked' : ''}
                        src={homeBtn}
                        onClick={() => setClicked('home')}/>
                </li>
                <li>
                    <img
                        className={clicked === 'newTask' ? 'clicked' : ''}
                        src={newTaskBtn}
                        onClick={() => setClicked('newTask')}/>
                </li>
                <li>
                    <img
                        className={clicked === 'viewTask' ? 'clicked' : ''}
                        src={viewTaskBtn}
                        onClick={() => setClicked('viewTask')}/>
                </li>
                <li>
                    <img
                        className={clicked === 'profile' ? 'clicked' : ''}
                        src={profileBtn}
                        onClick={() => setClicked('profile')}/>
                </li>
                <li className="down-arrow"><img src={arrow}/></li>
            </ul>
        </>
    );
}

export default NavBar;