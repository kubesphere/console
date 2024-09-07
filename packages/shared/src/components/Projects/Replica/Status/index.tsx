/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import NumberControl from '../NumberControl';
import NotifyConfirm from '../../../NotifyConfirm';
import SimpleCircle from '../../../Charts/SimpleCircle';
import { Card, CardImg, Scale, Status, StatusDetail, StatusTitle } from './styles';

interface Props {
  theme?: 'light' | 'dark';
  className?: string;
  name?: string;
  current?: number;
  desire?: number;
  onScale?: null | ((replica: number) => void);
}

const initialSeconds = 5;

const getInter = (value?: number) => Number(value || 0);

function ReplicaStatus({
  theme = 'dark',
  className,
  name = 'REPLICA_PL',
  current = 0,
  desire = 0,
  onScale,
}: Props) {
  const [prevPropDesire, setPrevPropDesire] = useState<number>(getInter(desire));
  const [selfDesire, setSelfDesire] = useState<number>(getInter(desire));
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const timerRef = useRef<any>();

  const nameText = t(name);
  const currentText = t('REPLICAS_CURRENT');
  const desireText = t('REPLICAS_DESIRED');

  useEffect(() => {
    if (desire !== prevPropDesire) {
      const $desire = getInter(desire);
      setPrevPropDesire($desire);
      setSelfDesire($desire);
    }
  }, [desire]);

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  const showConfirm = useCallback(() => setConfirmVisible(true), []);
  const hideConfirm = useCallback(() => setConfirmVisible(false), []);
  const handleConfirm = () => {
    onScale?.(selfDesire);
    hideConfirm();
  };
  const handleCancel = () => {
    setSelfDesire(getInter(desire));
    hideConfirm();
  };
  const handleScale = (value: number) => {
    if (value >= 0) {
      setSelfDesire(value);
      setSeconds(initialSeconds);
      showConfirm();
    }
  };

  const updateTime = () => {
    timerRef.current = setTimeout(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        handleConfirm();
        handleCancel();
      }
    }, 1000);
  };

  useEffect(() => {
    updateTime();
  }, [seconds]);

  const stopTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const startTimer = () => {
    if (timerRef.current) {
      stopTimer();
    }
    updateTime();
  };

  useEffect(() => {
    if (confirmVisible) {
      startTimer();
    } else stopTimer();
  }, [confirmVisible, selfDesire]);

  const scaleOperation = useMemo(() => {
    if (!onScale) return null;

    return (
      <Scale>
        <NumberControl value={selfDesire} onChange={handleScale} />
      </Scale>
    );
  }, [onScale, selfDesire, handleScale]);

  return (
    <Card className={classNames(className, theme)}>
      <CardImg src="/assets/banner-icon-1.svg" />
      <div>
        <SimpleCircle
          theme={theme}
          title={nameText}
          categories={[currentText, desireText]}
          value={current}
          total={selfDesire}
        />
      </div>
      <Status>
        <StatusTitle>{nameText}</StatusTitle>
        <StatusDetail>
          <p>
            <label>{desireText}:</label> {selfDesire}
          </p>
          <p>
            <label>{currentText}:</label> {current}
          </p>
        </StatusDetail>
      </Status>
      {scaleOperation}
      <NotifyConfirm
        visible={confirmVisible}
        width={400}
        title={t('ADJUST_REPLICAS')}
        content={
          <span
            dangerouslySetInnerHTML={{
              __html: t('REPLICAS_SCALE_NOTIFY_CONTENT', {
                num: selfDesire,
              }),
            }}
          ></span>
        }
        cancelText={t('REPLICAS_SCALE_NOTIFY_CANCEL')}
        confirmText={t('REPLICAS_SCALE_NOTIFY_CONFIRM', { seconds })}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      ></NotifyConfirm>
    </Card>
  );
}

export default ReplicaStatus;
