import './Ruler.scss';
import React, { useEffect, useRef } from 'react';
import Guides from '@scena/react-guides';
import { useSelector } from 'react-redux';
import {
  viewerLocSelector,
  viewerZoomSelector,
} from 'store/slices/viewer/selectors';

const GuidesComponent = Guides as any;

export const Ruler = ({
  className,
  type,
  rulerStyle = {},
  style = {},
  backgroundColor,
}) => {
  const ref = useRef(null);
  const zoom = useSelector(viewerZoomSelector);
  const { x, y } = useSelector(viewerLocSelector);

  useEffect(() => {
    if (ref.current) {
      (ref.current as any).scrollGuides(type === 'vertical' ? x : y);
      (ref.current as any).scroll(type === 'vertical' ? y : x);
    }
  }, [type, x, y]);

  return (
    <div className={className} style={{ backgroundColor }}>
      <GuidesComponent
        ref={ref}
        type={type}
        zoom={zoom}
        unit={100}
        backgroundColor={backgroundColor}
        textFormat={(v) => `${v / 10}`}
        dragPosFormat={(v) => (v / 10).toFixed(2) + 'm'}
        digit={1}
        rulerStyle={rulerStyle}
        style={style}
        displayDragPos={true}
      />
    </div>
  );
};
