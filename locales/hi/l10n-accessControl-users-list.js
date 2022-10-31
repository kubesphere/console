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
  USER_DESC: 'उपयोगकर्ताओं और उनकी भूमिकाओं को प्रबंधित करें।',
  USER_PL: 'उपयोगकर्ताओं',
  // List
  NOT_LOGIN_YET: 'अभी तक लॉग इन नहीं है',
  USER_EMPTY_DESC: 'कृपया एक उपयोगकर्ता बनाएं।',
  USER_ACTIVE: 'सक्रिय',
  USER_AUTHLIMITEXCEEDED: 'लॉगिन प्रतिबंधित',
  USER_PENDING: 'लंबित',
  USER_DISABLED: 'अक्षम',
  LAST_LOGIN: 'अंतिम लॉगइन',
  // List > Create
  USERNAME_DESC: 'उपयोगकर्ता नाम में केवल लोअरकेस अक्षर, संख्याएं, हाइफ़न (-), और डॉट्स (.) हो सकते हैं, और उन्हें लोअरकेस अक्षर या संख्या के साथ शुरू और समाप्त होना चाहिए। अधिकतम लंबाई 32 वर्ण है।',
  PASSWORD_DESC: 'The password must contain at least one number, one lowercase letter, one uppercase letter, and one special character (~!@#$%^&*()-_=+\\|[{}];:\'",<.>/? or space). The length must be 8 to 64 characters.',
  PASSWORD_INVALID_DESC: 'अवैध पासवर्ड। पासवर्ड में कम से कम एक नंबर, एक लोअरकेस अक्षर और एक अपरकेस अक्षर होना चाहिए। लंबाई 8 से 64 वर्णों की होनी चाहिए।',
  PLATFORM_ROLE_DESC: 'KubeSphere प्लेटफॉर्म पर उपयोगकर्ता की भूमिका निर्धारित करें।',
  USER_SETTING_EMAIL_DESC: 'ईमेल पते का उपयोग KubeSphere वेब कंसोल में लॉग इन करने के लिए किया जा सकता है।',
  USERNAME_EXISTS: 'उपयोगकर्ता नाम पहले से ही मौजूद है। कृपया कोई अन्य उपयोगकर्ता नाम दर्ज करें',
  USERNAME_EMPTY_DESC: 'कृपया उपयोगकर्तानाम डालें।',
  PLATFORM_ROLE: 'प्लेटफार्म भूमिका',
  CREATE_USER: 'उपयोगकर्ता बनाइये',
  EMAIL: 'ईमेल',
  EMAIL_EXISTS: 'ईमेल पता पहले से मौजूद है। कृपया कोई अन्य ईमेल पता दर्ज करें।',
  USERNAME_INVALID: 'अमान्य उपयोगकर्ता नाम। {message}',
  USERNAME: 'उपयोगकर्ता नाम।',
  PASSWORD: 'पासवर्ड',
  // List > Edit
  EDIT_USER: 'उपयोगकर्ता को संपादित करो',
  // List > Delete
  USER_LOW: 'उपयोगकर्ता',
  DELETING_CURRENT_USER_NOT_ALLOWED: 'The current user cannot be deleted.'
};