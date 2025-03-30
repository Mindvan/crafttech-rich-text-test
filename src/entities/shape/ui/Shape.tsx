import html2canvas from "html2canvas";
import Konva from "konva";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Group, Rect } from "react-konva";
import { Html } from "react-konva-utils";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import HtmlText from "../../../shared/types/ui/htmlText/HtmlText";
import { ShapeProps } from "../model/types";
import styles from './Shape.module.scss'

const Size = Quill.import('attributors/style/size');
Size.whitelist = ['8px', '12px', '14px', '18px'];
Quill.register(Size, true);

const SHAPE_COLORS = ['#ffffff', '#ffd700', '#90ee90', '#87ceeb', '#dda0dd', '#f08080'];

const QUILL_MODULES = {
  toolbar: {
    container: [
      [{ 'size': Size.whitelist }],
      [{ 'color': [] }],
      ['bold', 'italic'],
    ],
    handlers: {}
  }
};

const QUILL_FORMATS = ['bold', 'italic', 'size', 'color'];

const HTML2CANVAS_OPTIONS = {
  backgroundColor: "rgba(0,0,0,0)",
  scale: window.devicePixelRatio * 2,
  useCORS: true,
  logging: false,
  allowTaint: true,
};

const Shape = (props: ShapeProps) => {
  const { x, y, width, height, tool, id, text } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);
  const [displayValue, setDisplayValue] = useState(text);
  const [shouldRender, setShouldRender] = useState(false);
  const [shapeColor, setShapeColor] = useState('#ffffff');

  const groupRef = useRef<Konva.Group | null>(null);
  const imageRef = useRef<Konva.Image | null>(null);
  const htmlRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<ReactQuill | null>(null);

  const clearImages = useCallback(() => {
    if (groupRef.current) {
      const images = groupRef.current.find('Image');
      images.forEach(img => img.destroy());
      imageRef.current = null;
    }
  }, []);

  const renderImage = useCallback(async () => {
    clearImages();
    const htmltext = document.getElementById(`htmltext_${id}`);
    if (htmltext) {
      const innerhtml = htmltext.innerHTML;
      if (innerhtml && groupRef.current) {
        const canvas = await html2canvas(htmltext, HTML2CANVAS_OPTIONS);
        const shape = new Konva.Image({
          x: 8,
          y: -6.5,
          scaleX: 0.5 / window.devicePixelRatio,
          scaleY: 0.5 / window.devicePixelRatio,
          image: canvas,
        });
        groupRef.current.add(shape);
        imageRef.current = shape;
      }
    }
  }, [id, clearImages]);

  useEffect(() => {
    if (!isEditing && shouldRender) {
      renderImage();
      setShouldRender(false);
    }
  }, [shouldRender, isEditing, renderImage]);

  useEffect(() => {
    if (isEditing) {
      clearImages();
    }
  }, [isEditing, clearImages]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      isEditing && 
      editorRef.current && 
      !editorRef.current.contains(event.target as Node) &&
      !(event.target as Element).closest('.ql-toolbar')
    ) {
      setIsEditing(false);
      setDisplayValue(value);
      setShouldRender(true);
    }
  }, [isEditing, value]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleClick = useCallback(() => {
    if (tool === "shape") {
      return;
    }
    if (!isEditing) {
      setIsEditing(true);
      clearImages();
    }
  }, [tool, isEditing, clearImages]);

  const handleChange = useCallback((content: string) => {
    setValue(content);
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setShapeColor(color);
  }, []);

  const colorButtons = useMemo(() => (
    SHAPE_COLORS.map((color) => (
      <button
        key={color}
        className={styles.shape__colorButton}
        style={{ backgroundColor: color }}
        onClick={() => handleColorChange(color)}
      />
    ))
  ), [handleColorChange]);

  return (
    <>
      <Group x={x} y={y} onClick={handleClick} ref={groupRef} draggable>
        <Rect stroke={"black"} fill={shapeColor} width={width} height={height} />
        {isEditing && (
          <Html>
            <div style={{ position: 'relative', width, height }}>
              <div className={styles.shape__editor} ref={editorRef}>
                <ReactQuill
                  ref={quillRef}
                  value={value}
                  onChange={handleChange}
                  modules={QUILL_MODULES}
                  formats={QUILL_FORMATS}
                  theme="snow"
                  style={{ height: '100%' }}
                />
                <div className={styles.shape__colorPicker}>
                  {colorButtons}
                </div>
              </div>
            </div>
          </Html>
        )}
      </Group>
      <Html>
        <HtmlText ref={htmlRef} html={displayValue} id={id} width={width} height={height} />
      </Html>
    </>
  );
};

export default Shape;
