# TechClan Website

This is the official website for TechClan, a student club from the Data Science department. The site showcases our community, projects, and provides a way for interested students to apply for membership.

## Tech Stack

- **Framework**: Next.js 15.1.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom utilities
- **Database**: MongoDB (for application submissions)
- **Deployment**: Vercel (recommended)
- **Other Libraries**: Headless UI for modals, AOS for animations

## Project Structure

```
/
├── app/                          # Next.js App Router directory
│   ├── (default)/                # Default route group
│   │   ├── layout.tsx            # Layout for home page
│   │   └── page.tsx              # Home page component
│   ├── apply/                    # Application page
│   │   └── page.tsx              # Application form page
│   ├── contact/                  # Contact page
│   │   └── page.tsx              # Contact form page
│   ├── css/                      # Global styles
│   │   ├── style.css             # Main stylesheet
│   │   └── additional-styles/    # Custom CSS files
│   │       ├── theme.css         # AOS animations
│   │       └── utility-patterns.css # Button and form styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Root page (redirects to home)
│   └── api/                      # API routes
│       └── applications/         # Application submission endpoint
│           └── route.ts          # POST/GET handlers
├── components/                   # Reusable React components
│   ├── ui/                       # UI components
│   │   ├── header.tsx            # Site navigation
│   │   ├── footer.tsx            # Site footer
│   │   └── logo.tsx              # Logo component
│   ├── hero-home.tsx             # Hero section with slideshow
│   ├── modal-gallery.tsx         # Image gallery modal
│   ├── recruitment-form.tsx      # Application form
│   ├── contact-section.tsx       # Contact form
│   ├── workflows.tsx             # Workflows showcase
│   └── spotlight.tsx             # Spotlight component
├── lib/                          # Utility libraries
│   └── mongodb.ts                # Database connection
├── public/                       # Static assets
│   ├── fonts/                    # Custom fonts
│   ├── images/                   # Images and logo
│   └── videos/                   # Video files
├── utils/                        # Utility functions
│   └── useMousePosition.tsx      # Mouse position hook
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies and scripts
└── pnpm-lock.yaml                # Package lock file
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (package manager)
- MongoDB database (for application storage)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/TechClan-CSDS/mainwebsite.git
   cd mainwebsite
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Run the development server:
   ```
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```
pnpm build
pnpm start
```

## How to Contribute

We welcome contributions from all members! Here's how to get started:

### 1. Understand the Codebase

- **Components**: All reusable UI elements are in the `components/` folder. Use TypeScript for type safety.
- **Pages**: Routes are defined in the `app/` directory using Next.js App Router.
- **Styling**: Use Tailwind CSS classes. Custom styles go in `app/css/`.
- **API**: Backend logic is in `app/api/`. Currently handles application submissions.

### 2. Making Changes

1. Create a new branch for your feature:
   ```
   git checkout -b feature/your-feature-name
   ```

2. Make your changes. Follow these guidelines:
   - Use TypeScript for all new code
   - Keep components small and focused
   - Use Tailwind for styling
   - Test your changes locally

3. Commit your changes:
   ```
   git add .
   git commit -m "Add: brief description of your changes"
   ```

4. Push and create a pull request:
   ```
   git push origin feature/your-feature-name
   ```

### 3. Code Style

- Use descriptive variable and function names
- Add comments for complex logic
- Keep lines under 100 characters
- Use consistent indentation (2 spaces)

### 4. Testing

- Run the development server to test UI changes
- Check that forms submit correctly
- Test on different screen sizes
- Verify accessibility (use semantic HTML, alt text for images)

### 5. Common Tasks

- **Adding a new page**: Create a new folder in `app/` with `page.tsx`
- **Adding a component**: Place it in `components/` and export from there
- **Styling**: Use Tailwind classes in JSX, or add custom CSS if needed
- **Database changes**: Modify the API routes in `app/api/`

## Deployment

The site is designed to deploy on Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Additional Notes

- The site uses a dark theme with a custom color scheme
- Images are optimized using Next.js Image component
- Forms include client-side validation
- The application form connects to MongoDB for data storage

If you have questions, ask in our Discord or create an issue on GitHub.## Live demo

Check the live demo here 👉️ [https://open.cruip.com/](https://open.cruip.com/)

## Open PRO

[![Open Pro](https://github.com/user-attachments/assets/2062c728-95f1-4d59-aa2d-d63556f625d5)](https://cruip.com/)

## Design files

If you need the design files, you can download them from Figma's Community 👉 https://bit.ly/401KSUS

## Usage

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
pnpm dev (recommended)
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Support notes

This template has been developed with the App Router (`app`) and React Server Components. If you’re unfamiliar with these beta features, you can find more information about them on the Next.js beta documentation page. So, please note that any request dealing with React (e.g. extra features, customisations, et cetera) is to be considered out of the support scope.

For more information about what support covers, please see our (FAQs)[https://cruip.com/faq/].

## Credits

- [Nucleo](https://nucleoapp.com/)

## Terms and License

- Released under the [GPL](https://www.gnu.org/licenses/gpl-3.0.html).
- Copyright 2024 [Cruip](https://cruip.com/).
- Use it for personal and commercial projects, but please don’t republish, redistribute, or resell the template.
- Attribution is not required, although it is really appreciated.

## About Us

We're an Italian developer/designer duo creating high-quality design/code resources for developers, makers, and startups.

## Stay in the loop

If you would like to know when we release new resources, you can follow [@pacovitiello](https://x.com/pacovitiello) and [@DavidePacilio](https://x.com/DavidePacilio) on X, or you can subscribe to our [newsletter](https://cruip.com/newsletter/).
