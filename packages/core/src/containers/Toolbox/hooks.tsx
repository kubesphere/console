/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useDisclosure } from '@kubed/hooks';
import { Wallet, File, Thunder } from '@kubed/icons';
import { KubectlModal, KubeConfigModal } from '@ks-console/shared';
import { Action } from './types';
import ToolsModal from './ToolsModal';

export function useActions(): Record<string, Action> {
  const logModal = useDisclosure();
  const eventModal = useDisclosure();
  const auditingModal = useDisclosure();
  const billModal = useDisclosure();
  const kubeConfigModal = useDisclosure();
  const kubectlModal = useDisclosure();

  return {
    'log-query': {
      ...logModal,
      modal: logModal.isOpen && (
        <ToolsModal
          visible={logModal.isOpen}
          title={t('CONTAINER_LOG_SEARCH')}
          key="toolbox.logquery"
          icon={<File />}
          onCancel={logModal.close}
          path="logquery"
        />
      ),
    },
    'event-search': {
      ...eventModal,
      modal: eventModal.isOpen && (
        <ToolsModal
          visible={eventModal.isOpen}
          title={t('RESOURCE_EVENT_SEARCH')}
          key="toolbox.eventsearch"
          icon={<Thunder />}
          onCancel={eventModal.close}
          path="eventsearch"
        />
      ),
    },
    'auditing-search': {
      ...auditingModal,
      modal: auditingModal.isOpen && (
        <ToolsModal
          visible={auditingModal.isOpen}
          title={t('AUDIT_LOG_SEARCH')}
          key="toolbox.auditingsearch"
          icon={<Thunder />}
          onCancel={auditingModal.close}
          path="auditingsearch"
        />
      ),
    },
    bill: {
      ...billModal,
      modal: billModal.isOpen && (
        <ToolsModal
          visible={billModal.isOpen}
          title={t('RESOURCE_CONSUMPTION_STATISTICS')}
          key="toolbox.bill"
          icon={<Wallet />}
          onCancel={billModal.close}
          path="bill"
        />
      ),
    },
    kubeconfig: {
      ...kubeConfigModal,
      modal: kubeConfigModal.isOpen && (
        <KubeConfigModal
          key="toolbox.kubeConfig"
          visible={kubeConfigModal.isOpen}
          onCancel={kubeConfigModal.close}
          params={{ cluster: globals.currentCluster }}
        />
      ),
    },
    kubectl: {
      ...kubectlModal,
      modal: kubectlModal.isOpen && (
        <KubectlModal
          key="toolbox.kubectl"
          visible={kubectlModal.isOpen}
          title="kubectl"
          params={{ cluster: globals.currentCluster, isClusterQuery: true }}
          onCancel={kubectlModal.close}
        />
      ),
    },
  };
}
