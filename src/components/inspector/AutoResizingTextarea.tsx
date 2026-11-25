import React, { useCallback, useEffect, useRef } from "react";

interface AutoResizingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minHeight?: number;
  maxHeight?: number;
}

const AutoResizingTextarea: React.FC<AutoResizingTextareaProps> = ({
  value,
  style,
  className = 'form-input',
  rows = 2,
  minHeight = 48,
  maxHeight = 240,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      const targetHeight = Math.max(minHeight, Math.min(el.scrollHeight + 2, maxHeight));
      el.style.height = `${targetHeight}px`;
    }
  }, [minHeight, maxHeight]);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      rows={rows}
      className={className}
      style={{
        width: '100%',
        minWidth: '100%',
        maxWidth: '100%',
        resize: 'vertical',
        minHeight: `${minHeight}px`,
        maxHeight: `${maxHeight}px`,
        boxSizing: 'border-box',
        overflowY: 'auto',
        lineHeight: '1.4',
        ...style,
      }}
      onInput={(e) => {
        adjustHeight();
        props.onInput?.(e);
      }}
      {...props}
    />
  );
};

export default AutoResizingTextarea;