export type Language = 'en' | 'ru' | 'cn';

export interface Translations {
    title: string;
    subtitle: string;
    configuration: string;
    secretKey: string;
    digits: string;
    period: string;
    configureSettings: string;
    copyCode: string;
    copied: string;
    refreshesIn: string;
    invalidSecret: string;
    enterSecret: string;
    footerCredit: string;
}

export const translations: Record<Language, Translations> = {
    en: {
        title: "TOTP Generator",
        subtitle: "Secure, client-side 2FA token generation",
        configuration: "Configuration",
        secretKey: "Secret Key",
        digits: "Digits",
        period: "Period (s)",
        configureSettings: "Configure Settings",
        copyCode: "Copy Code",
        copied: "Copied",
        refreshesIn: "Refreshes in",
        invalidSecret: "Invalid Secret Key",
        enterSecret: "Enter a secret key to generate a token",
        footerCredit: "prompted by dev-yash using anti gravity",
    },
    ru: {
        title: "TOTP Генератор",
        subtitle: "Безопасная генерация 2FA токенов на клиенте",
        configuration: "Настройки",
        secretKey: "Секретный ключ",
        digits: "Цифры",
        period: "Период (с)",
        configureSettings: "Настроить параметры",
        copyCode: "Копировать",
        copied: "Скопировано",
        refreshesIn: "Обновление через",
        invalidSecret: "Неверный секретный ключ",
        enterSecret: "Введите секретный ключ для генерации токена",
        footerCredit: "создано dev-yash с помощью anti gravity",
    },
    cn: {
        title: "TOTP 生成器",
        subtitle: "安全、客户端 2FA 令牌生成",
        configuration: "配置",
        secretKey: "密钥",
        digits: "位数",
        period: "周期 (秒)",
        configureSettings: "配置设置",
        copyCode: "复制代码",
        copied: "已复制",
        refreshesIn: "刷新时间",
        invalidSecret: "无效的密钥",
        enterSecret: "输入密钥以生成令牌",
        footerCredit: "由 dev-yash 使用 anti gravity 提示",
    }
};
