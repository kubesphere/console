/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Card, Tooltip } from '@kubed/components';
import { ChevronDown, ChevronUp, Cluster, Enterprise, PlugCircle, Project } from '@kubed/icons';
import React, { useCallback, useState } from 'react';

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { DashBoardHistoryItem, Icon, StarDuotone, useDashboardHistory } from '@ks-console/shared';
import SortableItem from './SortableItem';
import * as styles from './index.styles';

const iconConfig = {
  Cluster: <Cluster size={40} />,
  Workspace: <Enterprise size={40} />,
  Project: <Project size={40} />,
  FedProject: <Project size={40} />,
  devops: <Project size={40} />,
};
const QuickAccess = () => {
  const [items, setItems] = useDashboardHistory(globals.user.username);
  const [open, setOpen] = useState(false);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId((event?.active?.id as string) ?? null);
  }, []);
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setItems(items1 => {
        const oldIndex = items1.findIndex(i => i.id === active.id);
        const newIndex = items1.findIndex(i => i.id === over!.id);
        return arrayMove(items1, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }, []);
  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);
  const handleRemove = useCallback((index: number) => {
    setItems(items1 => {
      return [...items1.slice(0, index), ...items1.slice(index + 1)];
    });
  }, []);

  const renderFooter = () => {
    if (items.length <= 10) return null;
    return (
      <styles.Footer
        onClick={() => {
          setOpen(!open);
        }}
      >
        {open ? (
          <>
            <ChevronUp size={16} />
            <span>{t('Collapse')}</span>
          </>
        ) : (
          <>
            <ChevronDown size={16} />
            <span>{t('UNFOLD')}</span>
          </>
        )}
      </styles.Footer>
    );
  };

  const renderItem = (item: DashBoardHistoryItem, idx?: number, isDragOver?: boolean) => {
    // @ts-ignore
    const icon = item.icon ? (
      <Icon name={item.icon} size={40} />
    ) : iconConfig[item.type as 'Cluster'] ? (
      iconConfig[item.type as 'Cluster']
    ) : item.iconPath ? (
      <img src={item.iconPath} width={40} height={40} />
    ) : (
      <PlugCircle size={40} />
    );

    const name = item.aliasName ? `${item.aliasName}(${item.name})` : item.name;
    const renderDesc = {
      Cluster: item.isHost ? t('HOST_CLUSTER') : t('MEMBER_CLUSTER'),
      Workspace: t('WORKSPACE'),
      Project: t('PROJECT'),
      FedProject: t('MULTI_CLUSTER_PROJECT'),
      Devops: t('DEVOPS_PROJECT'),
    };
    return (
      <styles.Item key={item.id} $isDragOver={isDragOver} to={item.url}>
        <styles.Icon>
          {icon}
          {item.isMulti && (
            <styles.FedIcon>
              <img src="/assets/cluster.svg" />
            </styles.FedIcon>
          )}
        </styles.Icon>
        <styles.TitleWrapper>
          <styles.Title>{name}</styles.Title>
          <Tooltip content={t('CANCEL_QUICK_ACCESS')}>
            <div
              style={{ cursor: 'pointer', zIndex: 1, height: 16 }}
              onClick={
                idx !== undefined
                  ? e => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleRemove(idx);
                    }
                  : undefined
              }
            >
              <StarDuotone size={16} color="#F5A623" />
            </div>
          </Tooltip>
        </styles.TitleWrapper>
        <styles.Desc>{item.desc ?? renderDesc[item.type] ?? ''}</styles.Desc>
      </styles.Item>
    );
  };

  const renderActiveItem = () => {
    if (!activeId) return null;
    const item = items.find(i => i.id === activeId);
    if (!item) return null;
    return renderItem(item, undefined, true);
  };

  const renderEmpty = () => {
    return (
      <styles.Empty>
        <div>
          <styles.Title>{t('NO_HISTORY_TITLE')}</styles.Title>
          <styles.EmptyText>{t('NO_HISTORY_DESC')}</styles.EmptyText>
        </div>
      </styles.Empty>
    );
  };

  return (
    <Card padding={0} className="mt12">
      <styles.H4 className="mb8">{t('QUICK_ACCESS')}</styles.H4>
      {items.length === 0 ? (
        renderEmpty()
      ) : (
        <>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext items={items} strategy={rectSortingStrategy}>
              <styles.Wrapper>
                {(open ? items : items.slice(0, 10)).map((item, idx) => {
                  return (
                    <SortableItem key={item.id} id={item.id}>
                      {renderItem(item, idx)}
                    </SortableItem>
                  );
                })}
              </styles.Wrapper>
              <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                {renderActiveItem()}
              </DragOverlay>
            </SortableContext>
          </DndContext>
          {renderFooter()}
        </>
      )}
    </Card>
  );
};

export default QuickAccess;
