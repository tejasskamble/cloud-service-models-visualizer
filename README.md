# Cloud Service Models Visualizer

An animated, interactive guide to **IaaS, PaaS and SaaS** for beginners, told through Ravi, who wants to start an online business. Pure HTML, CSS, vanilla JavaScript and inline SVG: no frameworks, no build, no backend.

## Features
- One inline SVG (`viewBox 0 0 1400 850`): three stacks × nine layers, colour-coded, with `animateMotion`/`mpath` flows and cloud, server, developer and user icons
- Nine learning steps with sidebar, progress, Auto-play (5 s), Pause and Reset
- Beginner/Technical toggle, clickable layers, model explorer, comparison switcher, scenario simulator, glossary search, five-question quiz
- Light/dark theme, responsive layout, keyboard focus outlines, `prefers-reduced-motion` support

## The three models
| Model | Idea | Analogy | Examples |
|---|---|---|---|
| IaaS | Rent infrastructure, run everything above it | Renting an apartment | EC2, Azure VMs, Compute Engine |
| PaaS | Deploy code on a managed platform | A fully equipped kitchen | Elastic Beanstalk, App Engine, App Service |
| SaaS | Use a finished application | Eating at a restaurant | Gmail, Microsoft 365, Salesforce |

Other analogies: servers = computers, storage = warehouse, networking = roads, OS = foundation, runtime = execution environment, cloud provider = infrastructure owner.

## Responsibility (P = provider, C = customer)
| Layer | IaaS | PaaS | SaaS |
|---|---|---|---|
| Networking, Storage, Servers, Virtualization | P | P | P |
| Operating System | C | P | P |
| Middleware, Runtime | C | P | P |
| Applications | C | C | P |
| Data | C | C | C (plus accounts, permissions, settings) |

## Cloud examples
| Cloud | IaaS | PaaS | SaaS |
|---|---|---|---|
| AWS | EC2 | Elastic Beanstalk | Amazon Connect |
| Azure | Virtual Machines | App Service | Microsoft 365 |
| Google Cloud | Compute Engine | App Engine | Google Workspace |

## Nine steps
1 Cloud Computing · 2 Traditional Computing · 3 IaaS · 4 PaaS · 5 SaaS · 6 Shared Responsibility · 7 Real-World Examples · 8 Comparison · 9 Knowledge Quiz

## Structure
```text
index.html  css/style.css  assets/favicon.svg  .nojekyll  LICENSE  README.md
js/app.js (UI) · architecture.js (layers + SVG) · animations.js · steps.js (content) · quiz.js
```

## Run locally
```bash
python3 -m http.server 8000
```
Open http://localhost:8000

## Deploy to GitHub Pages
Settings → Pages → Deploy from a branch → main → / (root) → Save.

## Customise
- Text, examples, glossary, scenarios: `js/steps.js`
- Layers, ownership codes (`codes` string per model) and colours: `js/architecture.js`
- Quiz questions: `js/quiz.js`; theme colours: CSS variables in `css/style.css`

## License
MIT
