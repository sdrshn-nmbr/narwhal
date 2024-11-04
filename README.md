# Narwhal File Manager

A modern, responsive file management system built with Next.js 14, TypeScript, and shadcn/ui components.

![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC)

## Features

- 🎨 Modern, clean UI with dark/light mode support
- 📁 Grid and list view for files
- 🔍 File search functionality
- 🤖 AI Assistant integration
- 📱 Responsive design
- 🔒 Secure file management
- ⚡ Real-time updates
- 🎯 Context menus for quick actions
- 📊 Storage usage tracking
- 🔄 Drag and drop file upload

## Features in Detail

### File Management

- Upload files and folders
- Grid and list view options
- Sort files by various criteria
- Quick actions via context menu
- File selection and bulk operations

### Theme Support

- Light/dark mode toggle
- System theme detection
- Smooth theme transitions

### AI Assistant

- Built-in AI helper
- File search and suggestions
- Natural language queries
- Voice input support

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme**: Next Themes
- **Animations**: Tailwind CSS Animate

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/narwhal.git
cd narwhal
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
narwhal/
├── src/
│   ├── app/
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   └── narwhal-homepage.tsx  # Main file manager component
│   └── providers/
│       └── theme-provider.tsx    # Theme context provider
├── public/
│   └── assets/          # Static assets
└── package.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
