/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */
module.exports = {
  // Navigation pane
  STORAGE: 'Speicher',
  // Banner
  PERSISTENT_VOLUME_CLAIM_DESC: 'Ansprüche auf persistente Volumen definieren Speicheranforderungen. Das System erstellt persistente Volumen gemäß den Ansprüchen der persistenten Volumen.',
  PERSISTENT_VOLUME_CLAIM: 'Dauerhafter Volumenanspruch',
  PERSISTENT_VOLUME_CLAIM_PL: 'Dauerhafte Volumenansprüche',
  WHAT_IS_STORAGE_CLASS_Q: 'Was ist eine Speicherklasse?',
  WHAT_IS_STORAGE_CLASS_A: 'Eine Speicherklasse ist ein vom Cluster-Administrator konfigurierter Speichertyp. Unterschiedliche Speicherklassen bieten Clusterbenutzern unterschiedliche Arten von Volumen.',
  WHAT_IS_LOCAL_VOLUME_Q: 'Was ist ein lokales Volumen?',
  WHAT_IS_LOCAL_VOLUME_A: 'Ein lokales Volumen ist ein Volumen, das im lokalen Dateisystem des Clusters erstellt wird.',
  // List
  VOLUME_STATUS_BOUND: 'Gebunden',
  VOLUME_STATUS_LOST: 'Verloren',
  VOLUME_STATUS_PENDING: 'Ausstehend',
  VOLUME_STATUS_TERMINATING: 'Terminierung',
  VOLUME_STATUS_UPDATING: 'Aktualisierung',
  VOLUME_CONDITION_FILESYSTEMRESIZEPENDING: 'Festplattenerweiterung',
  PERSISTENT_VOLUME_CLAIM_EMPTY_DESC: 'Bitte erstellen Sie einen persistenten Volumenanspruch.',
  MOUNT_STATUS: 'Einhängestatus',
  MOUNTED: 'Eingehängt',
  NOT_MOUNTED: 'Nicht eingehängt',
  ACCESS_MODE_TCAP: 'Zugriffsmodus',
  RWO_DESC: 'RWO: Single-Node lesen und schreiben',
  ROX_DESC: 'ROX: Multi-Node schreibgeschützt',
  RWX_DESC: 'RWX: Multi-Node lesen und schreiben',
  // List > Create > Basic Information
  CREATE: 'Erstellen',
  CREATE_PERSISTENT_VOLUME_CLAIM: 'Persistenten Volumenanspruch erstellen',
  // List > Create > Storage Settings
  CREATION_METHOD: 'Erstellungsmethode',
  CREATE_VOLUME_BY_STORAGE_CLASS: 'Von Speicherklasse',
  CREATE_VOLUME_BY_SNAPSHOT: 'Von Volumen Snapshot',
  SELECT_SNAPSHOT_TO_CREATE_VOLUME: 'Wählen Sie einen Snapshot, um ein Volumen zu erstellen.',
  SELECT_STORAGE_CLASS_CREATE_VOLUME: 'Wählen Sie eine Speicherklasse aus, um ein Volumen zu erstellen.',
  VOLUME_CAPACITY: 'Volumenkapazität',
  PARAM_REQUIRED: 'Dieser Parameter ist erforderlich.',
  VOLUME_SIZE_TIP: 'Die Volumenkapazität muss größer als 0 sein.',
  VOLUME_STORAGE_CLASS_DESC: 'Wählen Sie eine Speicherklasse aus, um ein Volumen eines bestimmten Typs zu erstellen.',
  // List > Advanced Settings
  // List > Edit
  // List > Edit YAML
  // List > Delete
  PERSISTENT_VOLUME_CLAIM_LOW: 'persistenten volumenanspruch'
};