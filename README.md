<div align="center">

# SIMAPRO_SOB

_Empowering Innovation, Accelerating Impact Every Step Forward_

![last commit](https://img.shields.io/github/last-commit/fahrulrz/SiMaPro_SOB?style=flat-square)
![TypeScript](https://img.shields.io/badge/typescript-98.7%25-blue?style=flat-square)
![languages](https://img.shields.io/github/languages/count/fahrulrz/SiMaPro_SOB?style=flat-square)

**Built with the tools and technologies:**

![JSON](https://img.shields.io/badge/JSON-000000?style=flat-square&logo=json&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-000000?style=flat-square&logo=markdown&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white)
![Composer](https://img.shields.io/badge/Composer-885630?style=flat-square&logo=composer&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GNU Bash](https://img.shields.io/badge/GNU%20Bash-4EAA25?style=flat-square&logo=gnubash&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![XML](https://img.shields.io/badge/XML-FF6600?style=flat-square&logo=xml&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

</div>

## Table of Contents

• [Overview](#overview)  
• [Getting Started](#getting-started)  
 • [Prerequisites](#prerequisites)  
 • [Installation](#installation)  
 • [Usage](#usage)  
• [Features](#features)  
• [Technology Stack](#technology-stack)  
• [Architecture](#architecture)  
• [API Documentation](#api-documentation)  
• [Deployment](#deployment)  
• [Contributing](#contributing)  
• [Testing](#testing)  
• [License](#license)  
• [Support](#support)

---

## Overview

SiMaPro_SOB is a comprehensive project management web application built with modern technologies and best practices. Designed for efficiency, scalability, and seamless deployment, this application empowers teams to manage projects with precision and collaborate effectively.

**Live Demonstrations:**

- **Beta Version:** [simapro.fahrulhehehe.my.id](https://simapro.fahrulhehehe.my.id)
- **Production:** [pad.simapro.web.id](https://pad.simapro.web.id)

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your development machine:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher) or **yarn**
- **Docker** (optional, for containerized deployment)
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/fahrulrz/SiMaPro_SOB.git
   cd SiMaPro_SOB
   ```

2. **Environment Configuration**

   ```bash
   cp .env.example .env
   # Configure your environment variables in .env file
   ```

3. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

### Usage

**Development Mode:**

```bash
npm run dev
# or
yarn dev
```

Access the application at `http://localhost:3000`

**Production Build:**

```bash
npm run build
npm start
# or
yarn build
yarn start
```

---

## Features

### Core Capabilities

- **TypeScript Integration** - Full TypeScript support with 98.7% coverage
- **Modern UI/UX** - Responsive design with Tailwind CSS
- **Containerization** - Docker support for consistent deployment
- **Modular Architecture** - Clean, maintainable code structure
- **Multi-Environment** - Deployed across multiple domains
- **Performance Optimized** - Built with Next.js for optimal performance

### Project Management Tools

- Task tracking and assignment
- Project timeline visualization
- Team collaboration features
- Real-time updates and notifications
- Comprehensive reporting and analytics

---

## Technology Stack

| Category               | Technologies                |
| ---------------------- | --------------------------- |
| **Frontend Framework** | Next.js 14+ with React 18+  |
| **Language**           | TypeScript (98.7% coverage) |
| **Styling**            | Tailwind CSS, PostCSS       |
| **Development Tools**  | ESLint, Prettier            |
| **Containerization**   | Docker                      |
| **Build Tools**        | Vite, npm/yarn              |
| **Version Control**    | Git, GitHub                 |

---

## Architecture

```
SiMaPro_SOB/
├── 📁 public/                 # Static assets and public files
├── 📁 src/                    # Application source code
│   ├── 📁 app/                # Next.js App Router pages
│   ├── 📁 components/         # Reusable UI components
│   ├── 📁 lib/                # Utility functions and configurations
│   ├── 📁 hooks/              # Custom React hooks
│   ├── 📁 types/              # TypeScript type definitions
│   └── 📁 styles/             # Global styles and theme
├── 📁 docs/                   # Documentation files
├── 📄 Dockerfile             # Container configuration
├── 📄 docker-compose.yml     # Multi-container orchestration
├── 📄 package.json           # Project dependencies and scripts
├── 📄 tsconfig.json          # TypeScript configuration
├── 📄 tailwind.config.ts     # Tailwind CSS configuration
├── 📄 next.config.js         # Next.js configuration
└── 📄 .eslintrc.json         # ESLint configuration
```

---

## API Documentation

The application provides a comprehensive RESTful API. For detailed documentation:

- **Development API:** Available at `/api-docs` when running locally
- **OpenAPI Specification:** Located in `/docs/openapi.yaml`
- **Postman Collection:** Available in `/docs/postman/`

### Key Endpoints

- `GET /api/projects` - Retrieve all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

---

## Deployment

### Docker Deployment

**Build and run with Docker:**

```bash
# Build the Docker image
docker build -t simapro-sob .

# Run the container
docker run -d -p 3000:3000 --name simapro-container simapro-sob
```

**Using Docker Compose:**

```bash
docker-compose up -d
```

### Production Deployment

**Manual Deployment:**

```bash
npm run build
npm run start
```

**Environment Variables:**
Ensure all required environment variables are configured in your production environment.

---

## Contributing

We welcome contributions from the community! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   npm run test
   ```
5. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Code Standards

- Follow TypeScript best practices
- Use conventional commit messages
- Ensure all tests pass
- Maintain code coverage above 80%

---

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Quality Assurance

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

---

## License

This project is currently under development and does not have a formal license. For educational and non-commercial use only.

For commercial licensing inquiries, please contact the maintainer.

---

## Support

### Getting Help

- **Documentation:** Check our [Wiki](https://github.com/fahrulrz/SiMaPro_SOB/wiki)
- **Issues:** Report bugs or request features via [GitHub Issues](https://github.com/fahrulrz/SiMaPro_SOB/issues)
- **Discussions:** Join community discussions in [GitHub Discussions](https://github.com/fahrulrz/SiMaPro_SOB/discussions)

### Maintainer

**Muhamad Fahrul Razi**

- LinkedIn: [muhamad-fahrul-razi-6a2706290](https://www.linkedin.com/in/muhamad-fahrul-razi-6a2706290)
- GitHub: [@fahrulrz](https://github.com/fahrulrz)
- Email: Contact via GitHub for project-related inquiries

---

### Acknowledgments

Built with 💻 passion and ☕ dedication by the development team.

_"Empowering Innovation, Accelerating Impact Every Step Forward"_

---

<div align="center">

**⭐ If you find this project useful, please consider giving it a star! ⭐**

[⬆ Back to Top](#simapro_sob)

</div>
