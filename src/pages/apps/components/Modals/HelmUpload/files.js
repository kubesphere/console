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

export default [
  {
    name: 'Chart.yaml',
    description: 'CHART_FILE_DESC',
  },
  {
    name: 'LICENSE',
    description: 'LICENSE_FILE_DESC',
    isOptional: true,
  },
  {
    name: 'README.md',
    description: 'README_FILE_DESC',
    isOptional: true,
  },
  {
    name: 'requirements.yaml',
    description: 'REQUIREMENTS_FILE_DESC',
    isOptional: true,
  },
  { name: 'values.yaml', description: 'VALUES_FILE_DESC' },
  {
    name: 'charts/',
    description: 'CHARTS_FILE_DESC',
    isOptional: true,
    check: 'none',
  },
  {
    name: 'templates/',
    description: 'TEMPLATES_FILE_DESC',
    isOptional: true,
  },
  {
    name: 'templates/NOTES.txt',
    description: 'NOTES_FILE_DESC',
    isOptional: true,
  },
]
