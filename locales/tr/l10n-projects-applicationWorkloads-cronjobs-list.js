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
  CRONJOBS: 'Cron işleri',
  CRONJOB_DESC: 'Cronjobs, işleri zamana dayalı bir programa göre yönetir ve periyodik veya yinelenen görevleri gerçekleştirmek için kullanılabilir.',
  // List
  CRONJOB_PAUSED: 'Duraklatıldı',
  CRONJOB_RUNNING: 'Çalışıyor',
  CRONJOB_FAILED: 'Başarısız',
  // List > Create > Basic Information
  SCHEDULE: 'Planla',
  ENTER_SCHEDULE_TIP: 'Lütfen bir zamanlayıcı seçin.',
  CRONJOB_CRON_DESC: 'Cronjob için bir zamanlama ayarlayın. KubeSphere varsayılan olarak UTC kullanır ve zaman diliminize göre zamanlamayı ayarlamanız gerekir. <a href="//en.wikipedia.org/wiki/Cron" target="_blank">Daha Fazla Bilgi Edinin</a>',
  // List > Create > Advanced settings
  MAXIMUM_DELAY: 'Maksimum Başlatma Gecikmesi (s)',
  SUCCESSFUL_JOBS_RETAINED: 'Başarılı İşler Tutuldu',
  FAILED_JOBS_RETAINED: 'Başarısız İşler Tutuldu',
  CONCURRENCY_POLICY: 'Eşzamanlılık Politikası',
  MAXIMUM_DELAY_DESC: 'İş belirli nedenlerle kaçırıldığında, planlanmış bir işe başlamadan önce maksimum gecikme.',
  CONCURRENCY_POLICY_DESC: 'Birden fazla cronjob işi birbiriyle örtüştüğünde sistem tarafından benimsenen politika.',
  FAILED_JOBS_RETAINED_DESC: 'Alıkonmasına izin verilen başarısız işlerin sayısı. Varsayılan değer 1\'dir.',
  SUCCESSFUL_JOBS_RETAINED_DESC: 'Elde tutulmasına izin verilen başarılı işlerin sayısı. Varsayılan değer 3\'tür.',
  RUN_JOBS_CONCURRENTLY: 'İşleri aynı anda çalıştırın',
  SKIP_NEW_JOB: 'Yeni işi atla',
  SKIP_OLD_JOB: 'Eski işi atla',
  // List > Create > Strategy Settings
  STRATEGY_SETTINGS: 'Strateji Ayarları',
  MAXIMUM_RETRIES: 'Maksimum Yeniden Deneme',
  MAXIMUM_RETRIES_DESC: 'Maksimum Yeniden Deneme.',
  PARALLEL_PODS_DESC: 'İşte paralel olarak çalışan bölmelerin sayısı.',
  COMPLETE_PODS_DESC: 'İşin tamamlandı olarak işaretlenmesi için gereken eksiksiz bölme sayısı.',
  MAXIMUM_DURATION_DESC: 'İşin maksimum süresi. Maksimum süreye ulaştığında iş sonlandırılır.',
  PARALLEL_PODS: 'Paralel Podlar',
  COMPLETE_PODS: 'Tamamlanan Podlar',
  MAXIMUM_DURATION: 'Maksimum süre {0}',
  // List > Create > Pod Settings
  RESTART_POLICY: 'Yeniden Başlatma Politikası',
  RESTART_POLICY_DESC: 'Bölmedeki bir kapsayıcı anormal şekilde çıktığında sistem tarafından benimsenen ilkeyi seçin.',
  // List > Create > Storage Settings
  // List > Create > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Pause
  // List > Delete
  CRONJOB_PL: 'Cron işleri',
  CRONJOB_LOW: 'cronişi'
};