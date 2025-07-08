import { groq } from 'next-sanity'

export const heroQuery = groq`
  *[_type == "hero" && _id == "hero"][0] {
    title,
    subtitle,
    description,
    image {
      asset->,
      alt
    },
    ctaText,
    ctaUrl
  }
`

export const aboutQuery = groq`
  *[_type == "about" && _id == "about"][0] {
    title,
    content,
    image {
      asset->,
      alt
    },
    skills,
    resume {
      asset->
    }
  }
`

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    image {
      asset->,
      alt
    },
    mainImage {
      asset->,
      alt
    },
    categories[]-> {
      title,
      slug,
      color
    },
    tags[]-> {
      name,
      slug,
      color
    },
    author-> {
      name,
      image {
        asset->,
        alt
      }
    },
    publishedAt,
    _createdAt,
    _updatedAt
  }
`

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    image {
      asset->,
      alt
    },
    mainImage {
      asset->,
      alt
    },
    categories[]-> {
      title,
      slug,
      color
    },
    tags[]-> {
      name,
      slug,
      color
    },
    author-> {
      name,
      image {
        asset->,
        alt
      },
      bio,
      social[]-> {
        platform,
        url,
        username
      }
    },
    publishedAt,
    body,
    seo {
      title,
      description,
      image {
        asset->,
        alt
      },
      keywords,
      noIndex
    },
    _createdAt,
    _updatedAt
  }
`

export const worksQuery = groq`
  *[_type == "work"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    image {
      asset->,
      alt
    },
    technologies,
    projectUrl,
    githubUrl,
    featured,
    order
  }
`

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`

export const tagsQuery = groq`
  *[_type == "tag"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    color,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`

export const socialLinksQuery = groq`
  *[_type == "social"] | order(platform asc) {
    _id,
    platform,
    url,
    username,
    icon {
      asset->,
      alt
    }
  }
`

export const relatedPostsQuery = groq`
  *[_type == "post" && _id != $currentPostId && (
    count(categories[]._ref[@ in $categories]) > 0 ||
    count(tags[]._ref[@ in $tags]) > 0
  )] | order(publishedAt desc) [0..5] {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset->,
      alt
    },
    categories[]-> {
      title,
      slug,
      color
    },
    tags[]-> {
      name,
      slug,
      color
    },
    publishedAt
  }
`