# Assessment Module Three 
A Single Page Application (SPA) created with HTML, CSS and modular JavaScript, with an authentication and role control system (admin vs Visitor). Based on JSON Server as backend mock.

##  Begin

### 1. Clone the repository

```bash
git clone https://github.com/Aandres831/Assessment-Module-Three--RIWI.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Raise the development server

```bash
npm run dev
```

This will start a development server using **Vite**. You can open the app in your browser at:

```
http://localhost:5173
```

##  Project structure

```
/
│
├── src/
│   ├── html/
│   │   ├── login.html
│   │   ├── users.html
│   │   ├── newuser.html
│   │   └── events.html
│   ├── js/
│   │   ├── script.js      ← Router+auth+logout (ES module)
│   │   ├── login.js       ← Login y form
│   │   ├── users.js       ← CRUD admin / lectura usuarios
│   │   └── newuser.js     ← Registro de nuevos usuarios
│   └── style/
│       └── style.css
│
├── imgs/                 ← Images (avatar, UI etc.)
├── user.json               ← Database for JSON Server
└── README.md
```
##🛠 Personalization
In user.json, I defined at least one admin user:
```Json
{
  "id": 1,
  "name": "Admin David",
  "email": "david@admin.com",
  "password": "1234",
  "role": "admin"
}

```

##  Technologies used

- **JavaScript**: SPA main logic
- **Vite**: Fast packer for modern development
- **HTML and CSS**: Interface structure and styles

##  🧠 How does localStorage work in this project?
This app uses localStorage to temporarily save the logged-in user. This allows the user to navigate between pages without having to log in again each time.
```Js
localStorage.setItem("loggedUser", JSON.stringify(found));

```
The saved value (loggedUser) contains data such as id, name, email and role. Then, anywhere in the app, you can get it with:

```
const user = JSON.parse(localStorage.getItem("loggedUser"));
```
This storage persists even if the page is reloaded, until the user logs out.

##  🔐 Roles: Admin vs visitorVisitors in this app can have a role field that defines their permissions:

admin:
You have full access. Can:

See all visitors.

Create new visitors.

Edit and delete visitor from list.

Access the route /newuser.

user:
You have limited access. Can only:

View the visitor list.

You cannot edit, delete, or access /newuser.

Role logic applies both visually (hiding buttons and links) and functionally (blocking protected paths).

## Personal Information

- Name: Andrés Severino Isaza 
- Clan: Lovelace
- Email: andresseverino646@gmail.com
- ID: 1000307252
