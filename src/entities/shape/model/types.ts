import Konva from "konva";
import { RefObject } from "react";
import { Figure } from "../../../shared/types/figure";
import { ToolType } from "../../../shared/types/tool";

export interface ShapeProps extends Figure {
  tool: ToolType;
  stageRef: RefObject<Konva.Stage>;
}
