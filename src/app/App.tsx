import { useRef, useState } from "react";
import Canvas from "../features/canvas/ui/Canvas";
import Control from "../features/control/ui/Control";
import { ToolType } from "../shared/types/tool";
import Konva from "konva";
import styles from './App.module.scss';

function App() {
  const [tool, setTool] = useState<ToolType>("cursor");
  const stageRef = useRef<Konva.Stage>(null);

  return (
    <div className={styles.appContainer}>
      <Canvas tool={tool} stageRef={stageRef} />
      <Control tool={tool} setTool={setTool} />
    </div>
  );
}

export default App;
