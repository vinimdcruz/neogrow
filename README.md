# neogrow/README.md

# Neogrow

Neogrow is a full-stack application that consists of a backend built with TypeScript and a frontend built with React. This project aims to provide a robust platform for managing and growing your projects efficiently.

## Project Structure

```
neogrow
├── backend
│   ├── src
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── frontend
│   ├── src
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── docker-compose.yml
└── README.md
```

## Getting Started

To get started with the Neogrow project, follow the instructions below:

### Prerequisites

- Node.js (version 14 or higher)
- Docker and Docker Compose

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd neogrow
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

### Running the Application

You can run the application using Docker Compose:

```
docker-compose up
```

This command will start both the backend and frontend services.

### Usage

- The backend service will be available at `http://localhost:8000`.
- The frontend service will be available at `http://localhost:3000`.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License

This project is licensed under the MIT License. See the LICENSE file for details.