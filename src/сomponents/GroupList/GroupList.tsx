import React, { useEffect, useState } from "react";
import axios from "axios";
import { GetGroupsResponse, Group } from "../../types/types";
import GroupItem from "../GroupItem/GroupItem";
import styles from "./GroupList.module.css";
const GroupList: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Group[]>("/groups.json");
        const groupsData: Group[] = response.data;
        const responseData: GetGroupsResponse = {
          result: groupsData.length > 0 ? 1 : 0,
          data: groupsData,
        };
        setGroups(responseData.data || []);
        console.log(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.groupList}>
      {groups.map((group) => (
        <GroupItem key={group.id} group={group} />
      ))}
    </div>
  );
};

export default GroupList;
