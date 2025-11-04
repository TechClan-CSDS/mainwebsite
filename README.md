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
   Example: `git checkout -b add-new-button`

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

If you have questions, ask in our Discord or create an issue on GitHub.
