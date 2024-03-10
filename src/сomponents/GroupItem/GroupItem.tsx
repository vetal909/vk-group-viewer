import { useState } from "react";
import closedIcon from "/svg/close.svg";
import openIcon from "/svg/open.svg";
import styles from "./GroupItem.module.css";
import { Group } from "../../types/types";

interface Props {
  group: Group;
}

const GroupItem: React.FC<Props> = ({ group }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.groupItem}>
      <div
        className={styles.avatar}
        style={{ backgroundColor: group.avatar_color }}
      >
        {!group.avatar_color && <span className={styles.questionMark}>?</span>}
      </div>

      <div className={styles.infoContainer}>
        <h3 className={styles.groupName}>{group.name}</h3>
        <p className={styles.infotx1}>
          {group.closed ? (
            <>
              <span>Закрытая</span>
              <img src={closedIcon} alt="closed icon" />
            </>
          ) : (
            <>
              <span>Открытая</span>
              <img src={openIcon} alt="open icon" />
            </>
          )}
        </p>
        <p className={styles.infotxt}>
          Количество участников:&nbsp;{group.members_count}
        </p>
        <div className={styles.friendsBox} onClick={toggleDropdown}>
          <p className={styles.showFriends}>
            {group.friends
              ? group.friends.length > 0
                ? `Друзей в группе: ${group.friends.length}`
                : "Нет друзей"
              : "Нет друзей"}
          </p>
          {group.friends && <span className={styles.arrow}>&#9660;</span>}
        </div>
      </div>

      {isDropdownOpen && group.friends && (
        <div
          className={`${styles.friends} ${
            isDropdownOpen && group.friends ? styles.active : ""
          }`}
        >
          <div className={styles.closeButton}>
            <p className={styles.closedIcon} onClick={closeDropdown}>
              закрыть
            </p>
          </div>
          <p className={styles.maininDrop}>Друзья в группе:</p>
          <ul className={styles.friendList}>
            {group.friends.map((friend, index) => (
              <li key={index}>{`${friend.first_name} ${friend.last_name}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GroupItem;
