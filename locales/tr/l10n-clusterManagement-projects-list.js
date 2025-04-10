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
  PROJECT_DESC: 'Projeler, kaynakları gruplamak ve farklı kullanıcıların kaynak yönetimi izinlerini kontrol etmek için kullanılır.',
  SYSTEM_PROJECTS: 'Sistem Projeleri',
  USER_PROJECTS: 'Kullanıcı Projeleri',
  // List
  EMPTY_WRAPPER: 'Kaynak Bulunamadı{kaynak}',
  TERMINATING: 'Yıkılıyor',
  ACTIVE: 'Aktif',
  // List > Assign Workspace
  PROJECT_ADMINISTRATOR: 'Proje Yöneticisi',
  PROJECT_ADMINISTRATOR_DESC: 'Proje yöneticisi olarak çalışma alanında bir kullanıcı seçin.',
  PROJECT_ASSIGN_DESC: 'Proje bir çalışma alanına atandıktan sonra çalışma alanı değiştirilemez.',
  // List > Create
  CREATE_PROJECT_DESC: 'Kaynakları gruplamak ve farklı kullanıcıların kaynak yönetimi izinlerini kontrol etmek için bir proje oluşturun.',
  PROJECT_NAME_DESC: 'Ad yalnızca küçük harf, sayı ve kısa çizgi (-) içerebilir, küçük harfle başlamalı ve küçük harf veya sayı ile bitmelidir. Maksimum uzunluk 63 karakterdir.',
  PROJECT_NAME_INVALID_DESC: 'Geçersiz isim. Ad yalnızca küçük harf, sayı ve kısa çizgi (-) içerebilir, küçük harfle başlamalı ve küçük harf veya sayı ile bitmelidir. Maksimum uzunluk 63 karakterdir.',
  CANCEL: 'İptal',
  CREATE_NAME: 'Yaratılan {name}',
  DESCRIPTION: 'Açıklama',
  NAME_VALIDATION_FAILED: 'Ad, Kubernetes sistemi için ayrılmış olan kube- ile başlayamaz.',
  PROJECT_NAME_EXIST_DESC: 'The name already exists. Please enter another name. Project names must be unique on the entire platform.',
  NAME_EMPTY_DESC: 'Lütfen bir ad girin.',
  OK: 'Tamam',
  NAME_DESC: 'Ad yalnızca küçük harfler, sayılar ve kısa çizgiler (-) içerebilir ve küçük harf veya sayı ile başlayıp bitmelidir. Maksimum uzunluk 63 karakterdir.',
  DESCRIPTION_DESC: 'Açıklama herhangi bir karakter içerebilir ve maksimum uzunluk 256 karakterdir.',
  ALIAS_DESC: 'The alias name can contain only letters, numbers, and hyphens (-), and cannot start or end with a hyphen. The maximum length is 63 characters.',
  // List > Edit Information
  EDIT_INFORMATION: 'Bilgi Düzenle',
  // List > Delete
  DELETE_TITLE_SI: 'Sil {type}',
  DELETE_TITLE_PL: 'Çoklu Sil {type}',
  DELETE: 'Sil',
  PROJECT_LOW: 'proje',
  DELETED_SUCCESSFULLY: 'Deleted successfully.',
  STOP_SUCCESS_DESC: 'Durdurma Başarılı.',
  DELETE_RESOURCE_TYPE_DESC_SI: 'Bu işlemin risklerini anladığınızı doğrulamak için {type} adını <strong>{resource}</strong> girin.',
  DELETE_RESOURCE_TYPE_DESC_PL: 'Bu işlemin risklerini anladığınızı doğrulamak için {type} adlarını <strong>{resource}</strong> girin.',
  DELETE_RESOURCE_TYPE_DESC_GW: 'Bu işlemin risklerini anladığınızı doğrulamak için {type} adlarını <strong>{resource}</strong> girin.'
};