import { RefObject } from "react";
import Konva from "konva";
import { ToolType } from "../../../shared/types/tool";

export interface CanvasProps {
  tool: ToolType;
  stageRef: RefObject<Konva.Stage>;
}
