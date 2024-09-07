/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useCallback, useState } from 'react';

import EditYamlModal from '../../components/Modals/EditYaml';
import { EditYamlConfig } from '../../types';
import yaml from '../../utils/yaml';

export default function useYamlModal<T, V extends EditYamlConfig<T>>({
  data,
  useYamlMutation,
}: {
  data: V;
  useYamlMutation: any;
}) {
  const [editYamlConfig, setEditYamlConfig] = useState<V>(data);

  const handleCloseModal = useCallback(() => {
    setEditYamlConfig({
      ...editYamlConfig,
      visible: false,
    });
  }, []);

  const { mutate: mutateEditYaml, isLoading: isEditYamlLoading } = useYamlMutation(editYamlConfig);

  const handleEditYaml = useCallback(value => {
    const yamlData: T = yaml.load(value);
    mutateEditYaml(yamlData);
  }, []);

  const renderYamlModal = () =>
    editYamlConfig.visible && (
      <EditYamlModal
        visible={editYamlConfig.visible}
        yaml={editYamlConfig.yaml}
        readOnly={editYamlConfig.readOnly}
        onOk={handleEditYaml}
        confirmLoading={isEditYamlLoading}
        onCancel={handleCloseModal}
      />
    );

  return { renderYamlModal, setEditYamlConfig };
}
