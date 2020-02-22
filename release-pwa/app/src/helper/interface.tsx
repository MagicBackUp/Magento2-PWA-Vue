export interface StoreConfig {
    header_logo_src?: string
    logo_width?: number
    logo_height?: number
    logo_alt?: string
    base_url: string
    base_media_url: string
    secure_base_url: string
    secure_base_media_url: string
}

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