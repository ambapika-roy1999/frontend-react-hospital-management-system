import React from 'react';
import ForceGraph3D  from 'react-force-graph-3d';

const ForceGraph = () => {
  const data = {
    nodes: [
        { id: 'Node 1' },
        { id: 'Node 2' },
        { id: 'Node 3' },
        { id: 'Node 4' },
        { id: 'Node 5' },
        { id: 'Node 6' },
    ],
    links: [
        { source: 'Node 1', target: 'Node 2' },
        { source: 'Node 2', target: 'Node 3' },
        { source: 'Node 2', target: 'Node 4' },
        { source: 'Node 4', target: 'Node 5' },
        { source: 'Node 4', target: 'Node 6' }
    ],
  };

  return (
    <ForceGraph3D
      graphData={data}
      nodeLabel="id"
      linkAutoColorBy="source"
    />
  );
};

export default ForceGraph;
