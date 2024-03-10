import React, { useEffect, useState } from "react";
import axios from "axios";
import { GetGroupsResponse, Group } from "../../types/types";
import GroupItem from "../GroupItem/GroupItem";
import styles from "./GroupList.module.css";
import GroupFilter from "../GroupFilter/GroupFilter";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const GroupList: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Добавляем задержку в 1 секунду
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axios.get<Group[]>("/groups.json"); // Получаем данные с сервера
        const groupsData: Group[] = response.data;
        const responseData: GetGroupsResponse = {
          result: groupsData.length > 0 ? 1 : 0,
          data: groupsData,
        };
        if (responseData.result === 1 && responseData.data) {
          // Если результат успешен и данные присутствуют, устанавливаем их в состояние
          setGroups(responseData.data);
          setFilteredGroups(responseData.data);
          setLoading(false);
        } else {
          // В случае ошибки или некорректного результата очищаем состояния и устанавливаем loading в false
          setGroups([]);
          setFilteredGroups([]);
          setLoading(false);
          console.error("Error: No data returned or result is 0");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filters: any) => {
    let filteredGroups = groups;
    // Применяем фильтры к группам
    if (filters.privacyType !== "all") {
      filteredGroups = filteredGroups.filter(
        (group) => group.closed === (filters.privacyType === "closed")
      );
    }
    if (filters.avatarColor !== "any") {
      if (filters.avatarColor === "без аватара") {
        filteredGroups = filteredGroups.filter((group) => !group.avatar_color);
      } else {
        filteredGroups = filteredGroups.filter(
          (group) => group.avatar_color === filters.avatarColor
        );
      }
    }
    if (filters.hasFriends) {
      filteredGroups = filteredGroups.filter(
        (group) => group.friends && group.friends.length > 0
      );
    }

    setFilteredGroups(filteredGroups);
  };

  return (
    <div>
      <GroupFilter onFilterChange={handleFilterChange} groups={groups} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.groupList}>
          {filteredGroups.map((group) => (
            <GroupItem key={group.id} group={group} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupList;
