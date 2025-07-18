export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  image?: {
    asset: {
      _ref: string
      url: string
    }
    alt?: string
  }
  mainImage?: {
    asset: {
      _ref: string
      url: string
    }
    alt?: string
  }
  categories?: Category[]
  tags?: Tag[]
  author?: Author
  publishedAt: string
  body?: PortableTextBlock[]
  markdown?: string // Markdownコンテンツ用のフィールド
  seo?: SEO
  _createdAt: string
  _updatedAt: string
}

export interface PortableTextBlock {
  _type: string
  _key: string
  style?: string
  markDefs?: PortableTextMarkDef[]
  children?: PortableTextSpan[]
}

export interface PortableTextSpan {
  _type: string
  _key: string
  text: string
  marks?: string[]
}

export interface PortableTextMarkDef {
  _type: string
  _key: string
  href?: string
}

export interface Author {
  name: string
  image?: {
    asset: {
      _ref: string
      url: string
    }
    alt?: string
  }
  bio?: unknown
  social?: SocialLink[]
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  color?: string
  postCount?: number
}

export interface Tag {
  _id: string
  name: string
  slug: {
    current: string
  }
  description?: string
  color?: string
  postCount?: number
}

export interface Work {
  _id: string
  title: string
  slug?: {
    current: string
  }
  description?: string
  image?: {
    asset: {
      _ref: string
      url: string
    }
    alt?: string
  }
  technologies?: string[]
  projectUrl?: string
  githubUrl?: string
  githubUrl2?: string
  featured?: boolean
  order?: number
}

export interface Hero {
  _id: string
  _type: 'hero'
  title: string
  subtitle?: string
  description?: string
  image?: {
    asset: {
      _ref: string
      url: string
    }
    alt?: string
  }
  ctaText?: string
  ctaUrl?: string
}

export interface About {
  _id: string
  _type: 'about'
  title: string
  content?: PortableTextBlock[]
  image?: {
    asset: {
      _ref: string
      url: string
    }
    alt?: string
  }
  skills?: string[]
  resume?: {
    asset: {
      _ref: string
      url: string
    }
  }
}

export interface SocialLink {
  _id: string
  platform: string
  url: string
  username?: string
  icon?: {
    asset: {
      _ref: string
      url: string
    }
    alt?: string
  }
}

export interface SEO {
  title?: string
  description?: string
  image?: {
    asset: {
      _ref: string
      url: string
    }
    alt?: string
  }
  keywords?: string[]
  noIndex?: boolean
}