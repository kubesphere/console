/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import * as React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem(props: { id: string; children: React.ReactElement }) {
  const { id, children } = props;
  const { attributes, listeners, isDragging, setNodeRef, transform, transition } = useSortable({
    id: id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {React.cloneElement(children as React.ReactElement, {
        ...(children?.props ?? {}),
        $isDragging: isDragging,
      })}
    </div>
  );
}

export default SortableItem;
