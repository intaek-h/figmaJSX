import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectProjectTitle,
  setProjectTitle,
} from "../../../features/utility/utilitySlice";
import styles from "./ProjectTitleInput.module.scss";

function ProjectTitleInput() {
  const projectTitle = useSelector(selectProjectTitle);

  const dispatch = useDispatch();

  const [isFocused, setIsFocused] = useState(false);
  const [title, setTitle] = useState(projectTitle);

  if (isFocused) {
    return (
      <input
        type="text"
        className={styles.field}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => {
          dispatch(setProjectTitle(title));
          setIsFocused(false);
        }}
      />
    );
  }

  return (
    <span
      className={styles.unfocused}
      onDoubleClick={() => {
        setIsFocused(true);
      }}
    >
      {title}
    </span>
  );
}

export default ProjectTitleInput;
