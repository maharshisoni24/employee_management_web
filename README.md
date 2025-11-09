# Stock Management System

A comprehensive stock management system built with React, Node.js, and MySQL.

## Features

- Dashboard with real-time statistics
- Stock management (Add, Edit, Delete)
- Employee management
- Transaction tracking
- Reports generation
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/maharshisoni24/employee_management_web.git
cd stock-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
- Create a MySQL database
- Import the schema from `server/database.sql`
- Update the `.env` file with your database credentials

4. Start the backend server:
```bash
npm run server
```

5. Start the frontend development server:
```bash
npm run dev
```

## Database Setup

1. Log in to MySQL:
```bash
mysql -u root -p
```

2. Create the database and tables:
```bash
source server/database.sql
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=stock_management
PORT=3000
```

## Usage

1. Access the application at `http://localhost:5173`
2. Log in with your credentials
3. Navigate through the sidebar menu to access different features
4. Use the dashboard to get an overview of your inventory
5. Manage stocks, employees, and transactions through their respective pages

## API Endpoints

- `GET /api/stocks` - Get all stocks
- `POST /api/stocks` - Create new stock
- `GET /api/employees` - Get all employees
- `GET /api/transactions` - Get all transactions

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request# employee_management_web
