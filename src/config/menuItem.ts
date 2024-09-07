interface IMenuLang {
    id: number
    key: string
    name: string
    icon: string
}

export const menuLang: IMenuLang[] = [
    {
        id: 1,
        key: 'EN',
        name: 'LOCALE_EN',
        icon: '🇬🇧'
    },
    {
        id:2,
        key: 'TH',
        name: 'LOCALE_TH',
        icon: '🇹🇭'
    }
]