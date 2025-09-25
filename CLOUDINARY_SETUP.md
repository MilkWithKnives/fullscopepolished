# Cloudinary Hybrid Setup

This project now supports both local images (existing) and Cloudinary images (new) in a hybrid system.

## How It Works

### Existing Images (No Changes Required)

All your existing `/Towebsite/...` images continue working exactly as before:

```typescript
// These continue working as-is:
{ src: '/Towebsite/exterior/Exterior4.jpeg', alt: 'Exterior', tag: 'exterior' }
{ src: '/Towebsite/interior/Interior34.jpg', alt: 'Interior', tag: 'interior' }
```

### New Cloudinary Images

For new images, you can now use Cloudinary public IDs for automatic optimization:

```typescript
// New Cloudinary images (auto-optimized):
{ src: 'portfolio/new-exterior-1', alt: 'New exterior photo', tag: 'exterior' }
{ src: 'portfolio/new-interior-1', alt: 'New interior photo', tag: 'interior' }
```

## Adding New Cloudinary Images

1. **Upload to Cloudinary** using their web interface or API
2. **Use the public ID** (not the full URL) in your portfolio configuration
3. **Add to portfolio.ts** like any other image

Example:

```typescript
// In lib/portfolio.ts, add to the PHOTOS array:
{
  src: 'portfolio/kitchen-renovation-2024',  // Cloudinary public ID
  alt: 'Modern kitchen renovation',
  tag: 'interior',
  w: 1600,
  h: 1067
}
```

## Benefits of Cloudinary Images

- **Automatic optimization**: WebP/AVIF conversion, compression
- **Responsive images**: Automatic sizing for different devices
- **Global CDN**: Faster loading worldwide
- **Transformations**: Auto-cropping, format conversion on-the-fly

## File Structure

```
lib/
├── portfolio.ts        # Main configuration (hybrid support)
├── cloudinary.ts       # Cloudinary utilities
```

## Environment Variables

Already configured in `.env.local`:

- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLOUDINARY_URL`

## Migration Strategy

**Recommended approach**: Keep existing local images, use Cloudinary for new images only. This gives you:

- Zero disruption to existing setup
- Ability to test Cloudinary benefits on new content
- Option to migrate individual images later if desired
