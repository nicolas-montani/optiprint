This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

The project is organized as follows:

- **`/app`**: Contains the main application pages and layouts.
  - **`page.tsx`**: The main landing page of the application.
  - **`game/page.tsx`**: A game page for interactive gameplay.
  - **`layout.tsx`**: Defines the root layout for the application.
  - **`api/`**: Contains API routes, such as `carusel-images/route.js` for fetching carousel images.

- **`/components`**: Reusable UI components.
  - **`ThreeJsHero.tsx`**: Displays a 3D model using Three.js in the hero section.
  - **`VideoSection.tsx`**: A video player with custom controls and autoplay functionality.
  - **`image-carousel.tsx`**: A carousel component for displaying images.
  - **`timeline.tsx`**: A timeline component showcasing milestones.
  - **`linkedin-feed.tsx`**: Displays LinkedIn posts.
  - **`footer.tsx`**: The footer section of the application.
  - **`CeoText.tsx`**: A section for the CEO's message.

- **`/public`**: Static assets such as images, videos, and 3D models.
  - **`/video`**: Contains video files used in the `VideoSection`.
  - **`/carusel`**: Contains images for the image carousel.
  - **`.glb` files**: 3D models used in the `ThreeJsHero` component.

- **`/styles`**: Global and component-specific styles.
  - **`globals.css`**: Global Tailwind CSS styles.
  - **`page.module.css`**: Styles specific to the main page.

- **`/lib`**: Utility functions.
  - **`utils.ts`**: Contains helper functions like `cn` for class name merging.

- **`/config`**: Configuration files.
  - **`tailwind.config.ts`**: Tailwind CSS configuration.
  - **`postcss.config.js`**: PostCSS configuration.
  - **`next.config.ts`**: Next.js configuration.

- **`/`**: Root-level files.
  - **`package.json`**: Project dependencies and scripts.
  - **`tsconfig.json`**: TypeScript configuration.
  - **`.gitignore`**: Specifies files and directories to ignore in version control.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
