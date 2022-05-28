import styles from "./Header.module.scss";
import mainImage from '../../assests/Group 12.png'
import calanderImage from '../../assests/calendar.png'
import bellImage from '../../assests/bell.png'
import teamImage from '../../assests/team.png'
import meetingImage from '../../assests/meeting.png'


export const Header = () => {
    return (
        <div>
            <div className={styles.header}>
                <div className={styles.header_left}>
                    <img src={mainImage} alt="" />
                </div>
                <div className={styles.header_right}>
                    <img src={calanderImage} alt="calendar" />
                    {/* <img src={bellImage} alt="notification" /> */}
                    <img src={teamImage} alt="user management" />
                    <img src={meetingImage} alt="meeeting room management" />
                </div>
            </div>
        </div>
    )
}