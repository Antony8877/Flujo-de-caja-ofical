/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenType = 'login' | 'signup' | 'confirmation' | 'dashboard';

export interface UserRegistrationData {
  fullname: string;
  email: string;
  role: string;
  systemNode: string;
  experienceLevel: string;
  acceptTerms: boolean;
}

export type TransactionType = 'ingreso' | 'egreso';

export interface Transaction {
  id: string;
  concept: string;
  amount: number;
  currency: string;
  date: string;
  account: string;
  type: TransactionType;
  annulled: boolean;
  annulmentReason?: string;
  annulmentDate?: string;
}

export type ScreenId = 'anulacion' | 'registro';

export interface AppState {
  currentScreen: ScreenId;
  transactions: Transaction[];
  currentTransactionIdToAnnul: string;
  navigationTransition: 'none' | 'push_back' | 'slide_left';
}

