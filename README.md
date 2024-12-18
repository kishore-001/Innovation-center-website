# Innovation Center Website

A dynamic web platform designed for managing and displaying data collected via Microsoft Forms, enabling streamlined operations for admins, staff, and visitors. The website uses modern technologies like **ReactJS**, **FastAPI**, and **PostgreSQL** to ensure scalability and efficiency.

---

## Features

### Admin Dashboard
- Manage data collected from Microsoft Forms.
- Oversee user activities and platform settings.

### Staff Portal
- Access and analyze form data.
- View reports and collaborate on tasks.

### Visitor Interface
- Explore innovation center events.
- Submit forms and view public insights.

---

## Tech Stack

- **Frontend**: ReactJS
- **Backend**: FastAPI
- **Database**: PostgreSQL
- **Data Integration**: Microsoft Graph API for accessing form data from OneDrive
- **Hosting**: TBD (e.g., AWS, Azure, or similar)

---

## Installation and Setup

### Prerequisites
1. Python 3.8 or higher
2. Node.js and npm
3. PostgreSQL database
4. Git

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/username/innovation-center-website.git
    cd innovation-center-website
    ```

2. Set up the backend:
    ```bash
    cd backend
    pip install -r requirements.txt
    ```

3. Create a `.env` file for backend environment variables (e.g., database URL, API keys).

4. Set up the frontend:
    ```bash
    cd ../frontend
    npm install
    ```

5. Run the project:
    - Start the backend:
        ```bash
        uvicorn main:app --reload
        ```
    - Start the frontend:
        ```bash
        npm start
        ```

### Environment Variables
Create a `.env` file in the backend directory with the following variables:
```dotenv
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
MS_GRAPH_API_KEY=your-microsoft-graph-api-key
SECRET_KEY=your-secret-key