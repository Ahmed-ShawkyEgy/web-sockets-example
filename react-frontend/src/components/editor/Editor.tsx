import './Editor.scss';
import { InfiniteViewerWrapper } from 'components/infinite-viewer/InfiniteViewer';
import { Ruler } from 'components/ruler/Ruler';
import React from 'react';

export const Editor = () => {
  return (
    <div className="editor">
      <Ruler
        type="horizontal"
        backgroundColor="#09141d"
        className="ruler horizontal guides"
        rulerStyle={{
          left: '30px',
          width: 'calc(100% - 30px)',
          height: '30px',
        }}
        style={{ height: '30px' }}
      />
      <div className="infinite-viewer-hor">
        <Ruler
          type="vertical"
          backgroundColor="#09141d"
          className="ruler vertical guides"
          rulerStyle={{
            // height: 'calc(100% - 30px)',
            height: 'calc(100vh - 35px)',
            // height:'100%',
            width: '30px',
          }}
          //   style={{ height: '30px' }}
        />
        <InfiniteViewerWrapper />
      </div>
    </div>
  );
};
