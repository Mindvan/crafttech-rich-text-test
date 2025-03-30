import { ChangeEvent } from "react";
import { ToolType } from "../../../shared/types/tool";
import { ControlProps } from "../model/types";
import styles from './Control.module.scss';

const Control = ({ tool, setTool }: ControlProps) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTool(e.target.value as ToolType);
  };

  return (
    <div className={styles.controls}>
      <div className={styles.controls__item}>
        <input
          type="radio"
          id="cursor"
          name="control"
          value="cursor"
          checked={tool === "cursor"}
          onChange={handleOnChange}
          className={styles.controls__radio}
        />
        <label htmlFor="cursor" className={styles.controls__label}>Взаимодействие</label>
      </div>

      <div className={styles.controls__item}>
        <input
          type="radio"
          id="shape"
          name="control"
          value="shape"
          checked={tool === "shape"}
          onChange={handleOnChange}
          className={styles.controls__radio}
        />
        <label htmlFor="shape" className={styles.controls__label}>Добавление</label>
      </div>
    </div>
  );
};

export default Control;
