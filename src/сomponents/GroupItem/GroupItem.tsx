import { useState } from "react";
import styles from "./GroupItem.module.css";
import { Group } from "../../types/types";

interface Props {
  group: Group;
}

const GroupItem: React.FC<Props> = ({ group }) => {
  const [showFriends, setShowFriends] = useState(false);
  const toggleFriends = () => {
    setShowFriends(!showFriends);
  };
  return (
    <div className={styles.groupItem}>
      <h3 className={styles.groupName}>{group.name}</h3>
      <div className={styles.infoContainer}>
        <p>{group.closed ? "Закрытая" : "Открытая"}</p>
        <p>Количество участников: {group.members_count}</p>
      </div>
      {group.avatar_color && (
        <div
          className={styles.avatar}
          style={{
            backgroundColor: group.avatar_color,
          }}
        ></div>
      )}
      <p onClick={toggleFriends} className={styles.showFriends}>
        Количество друзей: {group.friends ? group.friends.length : 0}
      </p>
      {showFriends && group.friends && (
        <div className={styles.friends}>
          <p>Друзья в группе:</p>
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
