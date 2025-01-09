# Meeting Mates

Meeting Mates is a web application built with React, Vite, and Tailwind CSS. It provides a scheduling interface with various UI components and hooks.

## Project Structure

```
.gitignore
bun.lockb
components.json
eslint.config.js
index.html
package.json
postcss.config.js
public/
README.md
src/
	App.css
	App.jsx
	components/
		scheduling/
			Calendar.jsx
			MeetingForm.jsx
			TimeSlot.jsx
			UpcomingMeetings.jsx
		ui/
			accordion.tsx
			alert-dialog.tsx
			alert.tsx
			chart.tsx
			...
	hooks/
		use-mobile.tsx
		use-toast.ts
	index.css
	lib/
		utils.ts
	main.jsx
	pages/
		Index.jsx
	types/
		meeting.ts
	utils/
		date.js
	vite-env.d.ts
tailwind.config.ts
vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

```sh
git clone <repository-url>
cd meeting-mates
```

2. Install dependencies:

```sh
npm install
# or
yarn install
```

### Running the Development Server

To start the development server, run:

```sh
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:8080`.

### Building for Production

To build the project for production, run:

```sh
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

### Linting

To lint the project, run:

```sh
npm run lint
# or
yarn lint
```

## Project Configuration

### Vite Configuration

The Vite configuration is located in

vite.config.ts

. It includes settings for the development server, plugins, and module resolution.

### ESLint Configuration

The ESLint configuration is located in

eslint.config.js

. It includes rules and plugins for linting JavaScript and React code.

### Tailwind CSS Configuration

The Tailwind CSS configuration is located in

tailwind.config.ts

. It includes customizations for the Tailwind CSS framework.

## Components

### Scheduling Components

- Calendar.jsx
- MeetingForm.jsx
- TimeSlot.jsx
- UpcomingMeetings.jsx

### UI Components

- Accordion
- AlertDialog
- Alert
- Chart
- ...

## Hooks

- useMobile
- useToast

## Utilities

- utils.ts
- date.js

## Types

- meeting.ts

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Contact

For any questions or inquiries, please contact the project maintainer.

---

This documentation provides an overview of the project structure, setup instructions, and key components. For more detailed information, refer to the source code and comments within the files.
