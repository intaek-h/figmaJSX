import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectProjectTitle,
  setInputFieldBlurred,
  setInputFieldFocused,
  setProjectTitle,
} from "../../../features/utility/utilitySlice";
import styles from "./ProjectTitleInput.module.scss";

function ProjectTitleInput() {
  const projectTitle = useSelector(selectProjectTitle);

  const dispatch = useDispatch();

  const [isFocused, setIsFocused] = useState(false);
  const [title, setTitle] = useState(projectTitle);

  useEffect(() => {
    setTitle(projectTitle);
  }, [projectTitle]);

  if (isFocused) {
    return (
      <input
        type="text"
        className={styles.field}
        value={title}
        autoFocus
        onFocus={() => dispatch(setInputFieldFocused())}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => {
          dispatch(setProjectTitle(title));
          dispatch(setInputFieldBlurred());
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
