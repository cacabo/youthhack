# YouthHack

Website developed in Node with Handlebars, Express, and SCSS. The site leverages local JSON files for storing data on my education, posts, experience, and work. The app is hosted on Heroku.

------

### Architecture
```
│
├─ public               # Files accessible from the frontend
│  ├─ img               # Images
│  │  └─ ...
│  ├─ js                # Frontend scripts
│  │  └─ ...
│  ├─ index.css         # Compiled CSS file
│  └─ ...               # Favicon files
│
├─ src                  # Assets, data, and content
│  ├─ assets
│  │  └─ scss           # Styles written in SCSS
│  │     └─ ...
│  ├─ json              # Data for posts, projects, etc.
│  │  └─ ...
│  └─ views             # Handlebars files
│     ├─ layouts        # Data for posts, projects, etc.
│     │  └─ layout.hbs  # Wrapper HTML for all pages
│     ├─ partials       # Data for posts, projects, etc.
│     │  └─ ...
│     └─ ...            # Page components
│
├─ .eslintrc            # Documentation
├─ .gitignore           # Files not included in git repo
├─ index.js             # Configure express server
├─ package.json         # Layout dependencies
├─ routes.js            # App API's and routing
├─ ...                  # Yarn config files
└─ README.md            # Documentation
```

------

### Planned features
- [ ] Favicon

### Completed features
- [x] Deploy and push to GitHub
