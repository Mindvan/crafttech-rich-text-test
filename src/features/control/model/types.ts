import { ToolType } from "../../../shared/types/tool";

export interface ControlProps {
  tool: ToolType;
  setTool: (tool: ToolType) => void;
}
