declare var I18n:
{
    currentLocale(): string;
    locale: string;
    translations: {
        en: {
            layers: {
                name: any;
            }
        }
    };
    t(key: string, options?: any): string;
}