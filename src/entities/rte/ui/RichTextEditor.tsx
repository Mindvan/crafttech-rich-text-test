import styles from './TextEditorToolbar.module.scss';

interface TextEditorToolbarProps {
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onFontSize: (size: string) => void;
  onColor: (color: string) => void;
}

const TextEditorToolbar = ({
  onBold,
  onItalic,
  onUnderline,
  onFontSize,
  onColor,
}: TextEditorToolbarProps) => {
  return (
    <div className={styles.toolbar}>
      <button onClick={onBold} className={styles.toolbar__button}>
        B
      </button>
      <button onClick={onItalic} className={styles.toolbar__button}>
        I
      </button>
      <button onClick={onUnderline} className={styles.toolbar__button}>
        U
      </button>
      <select 
        onChange={(e) => onFontSize(e.target.value)}
        className={styles.toolbar__select}
      >
        <option value="12px">12px</option>
        <option value="14px">14px</option>
        <option value="16px">16px</option>
        <option value="18px">18px</option>
        <option value="24px">24px</option>
      </select>
      <input
        type="color"
        onChange={(e) => onColor(e.target.value)}
        className={styles.toolbar__color}
      />
    </div>
  );
};

export default TextEditorToolbar; 