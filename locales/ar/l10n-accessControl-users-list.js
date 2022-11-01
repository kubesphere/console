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
  USER_DESC: 'إدارة المستخدمين وأدوارهم.',
  USER_PL: 'المستخدمين',
  // List
  NOT_LOGIN_YET: 'لم يتم تسجيل الدخول بعد',
  USER_EMPTY_DESC: 'يرجى إنشاء مستخدم.',
  USER_ACTIVE: 'نشيط',
  USER_AUTHLIMITEXCEEDED: 'تسجيل الدخول مقيد',
  USER_PENDING: 'قيد الانتظار',
  USER_DISABLED: 'معطَّل',
  LAST_LOGIN: 'آخر تسجيل دخول',
  // List > Create
  USERNAME_DESC: 'اسم المستخدم يمكن أن يحتوي فقط على أحرف صغيرة وأرقام ووصلات (-) ونقاط (.) ، ويجب أن تبدأ وتنتهي بحرف صغير أو عدد. أقصى طول هو 32 حرفاً.',
  PASSWORD_DESC: 'The password must contain at least one number, one lowercase letter, one uppercase letter, and one special character (~!@#$%^&*()-_=+\\|[{}];:\'",<.>/? or space). The length must be 8 to 64 characters.',
  PASSWORD_INVALID_DESC: 'كلمة المرور غير صالحة. يجب أن تحتوي كلمة المرور على رقم واحد على الأقل، وحرف صغير واحد، وحرف كبير واحد. يجب أن يكون الطول 8 إلى 64 حرفاً.',
  PLATFORM_ROLE_DESC: 'تعيين دور المستخدم على منصة KubeSphere.',
  USER_SETTING_EMAIL_DESC: 'يمكن استخدام عنوان البريد الإلكتروني لتسجيل الدخول إلى وحدة تحكم KubeSphere.',
  USERNAME_EXISTS: 'اسم المستخدم موجود بالفعل. الرجاء إدخال اسم مستخدم آخر.',
  USERNAME_EMPTY_DESC: 'يُرجى إدخال اسم مستخدم.',
  PLATFORM_ROLE: 'دور المنصة',
  CREATE_USER: 'إنشاء مستخدم',
  EMAIL: 'البريد الإلكتروني',
  EMAIL_EXISTS: 'عنوان البريد الإلكتروني موجود بالفعل. الرجاء إدخال عنوان بريد إلكتروني آخر.',
  USERNAME_INVALID: 'اسم المستخدم غير صالح. {message}',
  USERNAME: 'اسم المستخدم',
  PASSWORD: 'كلمة المرور',
  // List > Edit
  EDIT_USER: 'تعديل المستخدم',
  // List > Delete
  USER_LOW: 'مستخدم',
  DELETING_CURRENT_USER_NOT_ALLOWED: 'The current user cannot be deleted.'
};