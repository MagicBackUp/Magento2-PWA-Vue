export interface Logo {
    url: string
    href: string
    title: string
}

export interface CategoryItem {
    id: string
    name: string
    meta_description: string | null
    meta_keywords: string | null
    meta_title: string | null
    include_in_menu: boolean
    children_count: number
    url_key: string | null
    url_path: string | null
    children: any[]
}