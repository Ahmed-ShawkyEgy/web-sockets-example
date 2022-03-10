import './InfiniteViewer.scss';
import React, { useRef, useState } from 'react';
import InfiniteViewer from 'react-infinite-viewer';
import { useDispatch, useSelector } from 'react-redux';
import {
  viewerLocSelector,
  viewerZoomSelector,
} from 'store/slices/viewer/selectors';
import { setViewerLocation, setViewerZoom } from 'store/slices/viewer/actions';

export const InfiniteViewerWrapper = () => {
  const viewerRef = useRef(null);
  const dispatch = useDispatch();
  const { x, y } = useSelector(viewerLocSelector);
  const zoom = useSelector(viewerZoomSelector);

  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <div
      className="infinite-container"
      onMouseDown={(e) => {
        setMousePos({ x: e.pageX, y: e.pageY });
        setIsDragging(true);
      }}
      onMouseMove={(e) => {
        if (isDragging) {
          const newX = x - (e.pageX - mousePos.x) / zoom;
          const newY = y - (e.pageY - mousePos.y) / zoom;
          dispatch(setViewerLocation(newX, newY));

          setMousePos({ x: e.pageX, y: e.pageY });
          if (viewerRef.current) {
            (viewerRef.current as any).scrollTo(newX, newY);
          }
        }
      }}
      onMouseUp={() => {
        setIsDragging(false);
      }}
    >
      <InfiniteViewer
        className="infinite-viewer"
        ref={viewerRef}
        rangeX={[-1000, 1000]}
        rangeY={[-1000, 1000]}
        zoom={zoom}
        useForceWheel
        onScroll={(e) => {
          dispatch(setViewerLocation(e.scrollLeft, e.scrollTop));
        }}
        onPinch={(e) => {
          let newZoom = e.zoom;
          newZoom = Math.max(0.5, newZoom);
          newZoom = Math.min(4, newZoom);
          dispatch(setViewerZoom(newZoom));
        }}
        displayHorizontalScroll
        displayVerticalScroll
      >
        <svg></svg>
      </InfiniteViewer>
    </div>
  );
};
