# Premium TOTP Generator

A secure, client-side Time-based One-Time Password (TOTP) generator built with Next.js, Tailwind CSS, and a premium Glassmorphism design. Inspired by `totp.danhersam.com` but reimagined with a modern "wow" factor.

## Features

- 🔐 **Secure**: All generation happens client-side. No keys are ever sent to a server.
- 🌍 **Localization**: Support for English (EN), Russian (RU), and Chinese (CN).
- 🎨 **Premium UI**: Dark mode, glassmorphism, and smooth animations.
- 🔗 **URL Support**: Pre-fill settings via URL parameters (`?key=...`, `?digits=...`, `?period=...`).
- ⚡ **Offline Ready**: Works entirely in the browser.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dev-Yashwant/totp-generator.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Usage

### URL Parameters

You can configure the generator using URL query parameters:

- `key` (or `secret`): The Base32 secret key.
- `digits` (or `l`): Number of digits (default: 6).
- `period`: Time period in seconds (default: 30).

**Example:**
`http://localhost:3000/?key=JBSWY3DPEHPK3PXP&digits=6`

## Credits

- Prompted by [dev-yash](https://github.com/dev-Yashwant) using Anti Gravity.
- Icons by Lucide React.
- TOTP logic by `otpauth`.

## License

MIT
