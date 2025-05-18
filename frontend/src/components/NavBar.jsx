import homeBtn from '../assets/home.png';
import newTaskBtn from '../assets/new_task.png';
import viewTaskBtn from '../assets/view_task.png';
import profileBtn from '../assets/profile2.png';
import '../pages/home/Home.css';

function NavBar({clicked, setClicked}) {
    
    return (
        <>
            <ul>
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
            </ul>
        </>
    );
}

export default NavBar;