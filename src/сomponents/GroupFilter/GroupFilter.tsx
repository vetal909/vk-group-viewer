import React, { useState } from "react";
import { Group } from "../../types/types";
import styles from "./GroupFilter.module.css";

const GroupFilter: React.FC<{
  onFilterChange: (filters: any) => void;
  groups: Group[];
}> = ({ onFilterChange, groups }) => {
  // Если нет данных о группах
  if (!groups || !groups.length) {
    return null;
  }

  const avatarColors = groups.map((group) => group.avatar_color);
  // Если нет цветов аватаров
  if (!avatarColors.some(Boolean)) {
    return <div>Цвета аватаров не найдены</div>;
  }
  const [filters, setFilters] = useState({
    privacyType: "all",
    avatarColor: "any",
    hasFriends: false,
  });

  const handleFilterChange = (name: string, value: string | boolean) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    onFilterChange({ ...filters, [name]: value });
  };
  // Обработчик изменения типа приватности
  const handlePrivacyTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    handleFilterChange("privacyType", event.target.value);
  };
  // Обработчик изменения цвета аватара
  const handleAvatarColorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    handleFilterChange("avatarColor", event.target.value);
  };
  // Обработчик изменения наличия друзей
  const handleHasFriendsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFilterChange("hasFriends", event.target.checked);
  };

  // Создаем множество уникальных цветов аватаров из групп
  const colorsSet = new Set(
    groups.map((group) => group.avatar_color).filter(Boolean)
  );
  const colors = Array.from(colorsSet);

  const hasGroupsNoAvatar = groups.some((group) => !group.avatar_color);
  // Если есть группы без аватара, добавляем в массив цветов метку "без аватара"
  if (hasGroupsNoAvatar) {
    colors.push("без аватара");
  }

  return (
    <div className={styles.filterMain}>
      <select
        id="privacyType"
        value={filters.privacyType}
        onChange={handlePrivacyTypeChange}
      >
        <option value="all">Все</option>
        <option value="closed">Закрытые</option>
        <option value="open">Открытые</option>
      </select>

      <select
        id="avatarColor"
        value={filters.avatarColor}
        onChange={handleAvatarColorChange}
      >
        <option key="any" value="any">
          Выбрать цвет
        </option>
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
      <label>
        <input
          type="checkbox"
          id="hasFriends"
          checked={filters.hasFriends}
          onChange={handleHasFriendsChange}
        />
        С друзьями
      </label>
    </div>
  );
};

export default GroupFilter;
