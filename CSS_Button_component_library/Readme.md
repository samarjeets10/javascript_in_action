# CSS Button Components Library

A data-driven, component-oriented UI system for building reusable button components using vanilla HTML, CSS, and JavaScript.

This project is structured to reflect real-world frontend architecture — focusing on scalability, maintainability, and clean separation of concerns.

---

## Overview

This is not a static UI showcase.

It is a structured frontend system where:
- UI components are generated dynamically from data
- Rendering logic is separated from data definitions
- Features are built in isolated layers
- The system is designed to scale beyond buttons

---

## Objectives

- Avoid hardcoded UI patterns  
- Build reusable and composable components  
- Implement a clean data → render → interaction flow  
- Practice scalable frontend architecture  
- Create a strong, production-style portfolio project  

---

## Architecture

The system follows a layered architecture:

### Data Layer
Defines all components in JSON format.

- Acts as the single source of truth  
- Stores metadata and structure  
- Keeps UI independent from hardcoded HTML  

---

### Fetch Layer
Handles data retrieval.

- Uses async/await  
- Isolated from rendering logic  
- Easily replaceable with API calls  

---

### Render Layer
Responsible for converting data into DOM elements.

- Maps data → UI  
- Keeps rendering predictable  
- Prevents scattered DOM manipulation  

---

### Component Layer
Encapsulates UI structures.

Each component:
- Receives structured data  
- Returns consistent DOM output  

---

### Interaction Layer
Handles user behavior.

Includes:
- Copy-to-clipboard  
- Like system (localStorage)  
- Navigation  

---

### State Layer
Manages persistent data.

- Uses localStorage  
- Stores like state per component  
- Designed to be replaceable  

---

### Routing Layer
Handles navigation between pages.

- Uses query parameters  
- Example: `preview.html?id=btn-001`  
- Dynamically renders selected component  

---

## Folder Structure
````
CSS_Button_components_library/
├── data/
│ └── buttons.json

├── pages/
│ ├── index.html
│ └── preview.html

├── styles/
│ ├── global.css
│ ├── buttons.css
│ └── components/
│ └── card.css

├── scripts/
│ ├── main.js
│ ├── router.js
│
│ ├── api/
│ │ └── fetchButtons.js
│
│ ├── components/
│ │ ├── Card.js
│ │ └── ButtonPreview.js
│
│ ├── render/
│ │ ├── renderCards.js
│ │ └── renderPreview.js
│
│ ├── utils/
│ │ ├── createElement.js
│ │ └── copyToClipboard.js
│
│ └── state/
│ └── likes.js

└── assets/
````
---

## Data Design

Components are defined declaratively instead of storing raw HTML.

Example:
```
{
"id": "btn-001",
"name": "Primary Button",
"category": "solid",
"text": "Click Me",
"classes": ["btn", "btn-primary"]
}
```

This ensures:
- Clean structure  
- Reusability  
- Scalability  

---

## Rendering Flow

1. Fetch data  
2. Iterate through dataset  
3. Pass data into component functions  
4. Generate DOM nodes  
5. Append to container  

---

## Code Generation Strategy

The “Get Code” feature:

- Generates HTML dynamically  
- Maps required CSS classes  
- Outputs formatted code  

Avoids:
- Hardcoded snippets  
- Inconsistent UI output  

---

## State Management

Each component stores:
```
{
count: number,
liked: boolean
}
```

- Uses localStorage for persistence
- State is isolated from rendering logic

---

## Routing Strategy
preview.html?id=btn-001


Flow:
- Extract ID  
- Fetch data  
- Render preview  

---

## Styling Approach

- CSS variables for theming  
- Reusable base classes  
- Variant-based styling  
- Dark mode via class toggle  

---

## Limitations

- No backend integration  
- No framework abstraction  
- Minimal state management  

---

## Future Scope

- Search and filtering  
- Category-based navigation  
- Code export  
- Backend integration  
- Migration to React  

---

## What This Project Demonstrates

- Scalable frontend architecture  
- Data-driven UI design  
- Separation of concerns  
- Maintainable code practices  

---

## Author
@samarjeetDevs