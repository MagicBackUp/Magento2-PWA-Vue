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

export interface CookiesConfig {
    lifetime: number
    domain?: string
    path?: string,
    secure?: boolean
}

export interface Router {
    name: string
    path: string
}

export interface IOSOptions {
    defaultOption: string
    title?: string | null
    text?: string | null
    input?: boolean
    placeholder?: string
    cancelText?: string
    okText?: string
    remindDuration?: number
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

export interface Cart {
    items: Array<CartItem>
    total_quantity: number
    applied_coupons?: CouponCode
    shipping_addresses?: any[]
}

export interface CartItem {
    id: string
    product: Product
    quantity: number
}

export interface CouponCode {
    code?: string
}

export interface Links {
    title: string
    url: string
}

export interface Description {
    html: string | null
}

export interface Product {
    id: string
    name: string | null
    sku: string
    type_id: string
    stock_status: string | null
    short_description: Description
    description: Description
}

export interface API {
    key?: string
    host?: string
    url?: string
    version?: string
    async?: boolean
    defer?: boolean
    protocol?: string
    callback?: Function
}

export interface ProductAttribute {
    attribute_code: string
    attribute_id: string
    id: number
    product_id: number
    label: string
    values: Array<AttributeLabel>
}

export interface AttributeLabel {
    label: string
    value_index: number
}

export interface ProductOption {
    id?: number
    value_string?: string
}

export interface I18n {
    productInfo?: string
    customerReivew?: string
    noReviews?: string
    writeReview?: string
    addTocart?: string
    buyNow?: string
    shoppingCart?: string
    summary?: string
    clearCart?: string
    delete?: string
    item?: string
    qty?: string
    price?: string
    subtotal?: string
    shippingFee?: string
    tax?: string
    grandTotal?: string
    goCheckout?: string
    removeItem?: string
    comfirmCheckout?: string
}