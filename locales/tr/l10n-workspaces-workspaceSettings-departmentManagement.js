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
  // Banner
  DEPARTMENT_PL: 'Bölümler',
  DEPARTMENT_DESC: 'Çalışma alanındaki bölümler, yetki denetimi için kullanılan mantıksal birimlerdir. Bir bölüm içerisinde çalışma alanı rolü, birden fazla proje ve DevOps projesi rolü tanımlayabilir, kullanıcıları bu bölüme ekleyerek yetkilerini yığın halde denetim altında tutabilirsiniz.',
  // List
  // List > Not Assigned
  NOT_ASSIGNED_TCAP: 'Atanmamış',
  ADD_MEMBER_TIP_SI: 'Kullanıcıyı bölümüne atamak istediğinizden emin misiniz?<strong>{group}</strong> ',
  ADD_MEMBER_TIP_PL: 'Kullanıcıyı <strong>{group}</strong> bölümüne atamak istediğinizden emin misiniz?',
  // List > Assigned
  ASSIGNED: 'Atanmış',
  DEPARTMENT: 'Bölüm',
  // List > Set Departments
  SET_DEPARTMENTS: 'Bölümlere Ata',
  DEPARTMENT_EMPTY_DESC: 'Müsait Bölüm Yok',
  NO_DEPARTMENT_TIP: 'Müsait bölüm yok. Lütfen sağ taraftan bir bölüm oluşturunuz.',
  CREATE_DEPARTMENT: 'Bölüm Oluştur',
  DELETE_GROUP_TIP: '<strong>{group_name}</strong> bölümünü silmek istediğinizden emin misiniz? İlişkilendirilmiş tüm roller kullanıcılardan kaldırılacaktır.',
  DELETE_PARENT_GROUP_TIP: '<strong>{group_name}</strong> bölümünü silmek istediğinizden emin misiniz? Tüm alt bölümleri de silinecek ve tanımlanmış roller kullanıcılardan kaldırılacaktır.',
  PROJECT_VALUE: 'Proje: {value}',
  PROJECT_ROLE_VALUE: 'Proje rolü: {value}',
  DEVOPS_VALUE: 'DevOps projesi: {value}',
  DEVOPS_PROJECT_ROLES_VALUE: 'DevOps projesi rolü: {value}',
  // List > Set Departments > Workspace Role
  WORKSPACE_ROLE: 'Çalışma Alanı Rolü',
  GROUP_WORKSPACE_ROLE_DESC: 'Çalışma alanı rolü, bölüm içerisindeki tüm kullanıcılara atanacaktır.',
  MEMBER_CLUSTER_UPGRADE_TIP: 'Sürüm numarası {version} \'dan küçük olan üye kümeler bu fonksiyonu desteklememektedir. Lütfen üye kümeleri {version} veya daha yüksek bir sürüme yükseltiniz.',
  // List > Set Departments > Project Role
  PROJECT_ROLE: 'Proje Rolü',
  SELECT_ROLE_TIP: 'Lütfen rol seçiniz.',
  ADD_PROJECT: 'Proje Ekle',
  CLUSTER_UPGRADE_REQUIRED: 'Mevcut KubeSphere sürümü bu fonksiyonu desteklememektedir. Lütfen KubeSphere {version} veya daha yüksek bir sürüme güncelleme yapınız.',
  // List > Set Departments > DevOps Project Role
  DEVOPS_PROJECT_ROLE: 'DevOps Proje Rolü',
  ADD_DEVOPS_PROJECT: 'DevOps Projesi Ekle'
};