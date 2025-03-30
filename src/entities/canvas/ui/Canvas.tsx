import { Stage } from "react-konva";
import { ToolType } from "../../../shared/types/tool";
import Konva from "konva";
import styles from './Canvas.module.scss'

interface CanvasProps {
  tool: ToolType;
  stageRef: React.RefObject<Konva.Stage>;
}

const Canvas = ({ tool, stageRef }: CanvasProps) => {
  return (
    <div className={styles.canvas}>
      <Stage
        ref={stageRef}
        className={styles.canvas__stage}
        width={window.innerWidth}
        height={window.innerHeight}
        draggable={tool === "cursor"}
      >
      </Stage>
    </div>
  );
};

export default Canvas; 