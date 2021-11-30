import locales from '@/app/utils/i18n/locales';
import { Language } from '@/domain/content/contentItem';

export const getText = (locale: string | Language, key: string) => locales[locale][key] ?? key;