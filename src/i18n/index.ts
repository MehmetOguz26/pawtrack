import { getLocales } from 'expo-localization';
import { en } from './en';
import { tr } from './tr';

export type Dictionary = typeof en;

const locale = getLocales()[0]?.languageCode;

export const dictionary: Dictionary = locale === 'tr' ? tr : en;
