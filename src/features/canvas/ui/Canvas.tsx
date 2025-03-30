import { useState } from "react";
import Konva from "konva";
import { Layer, Stage } from "react-konva";
import Shape from "../../../entities/shape/ui/Shape";
import { CanvasProps } from "../model/types";
import { Figure } from "../../../shared/types/figure";

const Canvas = ({ tool, stageRef }: CanvasProps) => {
  const [figures, setFigures] = useState<Figure[]>([]);

  const handleOnClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (tool === "cursor") return;

    const stage = e.target.getStage();
    const stageOffset = stage?.absolutePosition();
    const point = stage?.getPointerPosition();
    if (!stageOffset || !point) return;

    setFigures((prev) => [
      ...prev,
      {
        id: Date.now().toString(36),
        width: 100,
        height: 100,
        type: "rect",
        x: point.x - stageOffset.x,
        y: point.y - stageOffset.y,
        html: "",
        text: "",
      },
    ]);
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={tool === "cursor"}
      onClick={handleOnClick}
      ref={stageRef}
    >
      <Layer>
        {figures.map((figure: Figure, i: number) => (
          <Shape key={i} {...figure} stageRef={stageRef} tool={tool} />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
