# Neuronika - AI-Driven Intelligent Note-Taking and Organization System

## Introduction

1.1 Project Overview

Neuronika is an innovative AI-powered note-taking and organization proof-of-concept application de-
signed to revolutionize personal knowledge management. Leveraging advancements in natural language
processing and machine learning, Neuronika aims to enhance information categorization and retrieval, ad-
dressing the limitations of traditional note-taking applications by demonstrating how AI-powered tagging
can improve upon folder-based organization systems.

1.1.1 What is Neuronika?

Neuronika is a frontend-only application that focuses on showcasing core features without the complexities
of backend infrastructure. The application operates entirely in the user’s session, with no permanence
between sessions, eliminating the need for user authentication or data storage. This approach allows for
concentrated development on the application’s main functionalities.

1.1.2 Key Features

• Endless pool interface for seamless browsing, searching and editing notes

• AI-powered automatic tag generation for new and existing notes

• Interactive network/graph view for visualizing relationships between notes and tags

• Intelligent search functionality using AI-generated tags and natural language processing

• Automatically generated folder hierarchies that categorize notes based on their AI-generated tags

1.2 Project Summary

Neuronika aims to provide a seamless, intelligent note-taking experience that demonstrates how AI-
driven organization can enhance productivity. By focusing on the core features and eliminating backend
complexities, the project emphasizes the advantages of AI-powered tagging and organization capabilities
in a proof-of-concept application.

## Technical Stack and Architecture

2.1 Core Technologies

Neuronika leverages a modern, modular technology stack optimized for performance, scalability, and
developer experience. The architecture is structured to maintain a lightweight, frontend-focused approach
while allowing future enhancements, such as backend integrations and self-hosted AI models.

2.1.1 Frontend

The frontend is responsible for rendering the user interface, managing the note-taking environment, and
interacting with AI-powered features. It is built using:

• React: A declarative JavaScript library for building dynamic user interfaces.

• Vite: Fast build tool providing near-instant hot module replacement and optimized production
builds.

• TypeScript: A typed superset of JavaScript enhancing code maintainability and robustness.

2.1.2 AI and Machine Learning

Neuronika integrates AI to enhance user experience through automatic tagging, semantic search, and
contextual recommendations. The following services and tools are used:

• Pinecone (Future Upgrade): A high-performance vector database for AI-powered semantic search
and knowledge retrieval.

• Hugging Face Inference API: Hosted machine learning models for tasks such as natural language
understanding and content classification.

• OpenRouter: API providing access to multiple AI models, offering flexibility in AI integration.

2.2 Frontend Technologies

2.2.1 User Interface and Styling

Neuronika’s UI is designed for a smooth, customizable, and visually appealing user experience:

• Tailwind CSS: Utility-first CSS framework enabling rapid and responsive UI development.

• shadcn/ui: Prebuilt, accessible UI components based on Radix UI and Tailwind CSS.

• Framer Motion: Animation library for smooth transitions and interactive UI elements.

2.2.2 Endless Pool Note Interface

The application features a dynamic, non-paginated, masonry-style layout to display and organize notes
efficiently:

• React-Grid-Layout: A highly customizable grid-based layout system enabling note repositioning
and resizing.

2.2.3 Text Editing and Markdown Processing

Neuronika uses a lightweight Markdown-based approach for rich text editing, supporting mathematical
equations and code blocks:

• react-markdown: Renders Markdown content dynamically.

• remark-math: Parses LaTeX-style mathematical expressions.

• rehype-katex: Displays mathematical equations using KaTeX.

• react-syntax-highlighter: Provides syntax highlighting for code blocks.

This implementation allows users to write notes in Markdown format and view the formatted result in
real time. Clicking on a note enables raw Markdown editing, while clicking outside renders the formatted
text.

2.2.4 Graph-Based Knowledge Visualization

Neuronika includes an interactive, scalable knowledge graph to visualize relationships between notes:

• vis.js: A browser-based graph visualization library supporting interactive node manipulation.

2.2.5 Search and Information Retrieval

Neuronika incorporates both lexical and semantic search to enhance information retrieval:

• Fuse.js: Lightweight fuzzy search library providing typo tolerance and fast keyword-based lookup.

• Pinecone (Future Upgrade): AI-powered vector search enabling advanced semantic search capa-
bilities.

2.2.6 State Management and Data Fetching

Neuronika maintains efficient state handling and asynchronous data fetching:

• Zustand: Lightweight state management solution for storing session-based note data and metadata.

• TanStack Query (React Query): Asynchronous state management library for efficient API
fetching and caching.

2.3 Development and Deployment

2.3.1 Hosting and Deployment

Neuronika follows a serverless, frontend-centric deployment model:

• Vercel: A cloud-based platform for frontend deployment with global CDN distribution and auto-
matic optimizations.

2.3.2 Version Control and Project Management

Code collaboration and task management are handled using:

• GitHub: Centralized repository for version control and source code collaboration.

• GitHub Projects: Agile project management tool for issue tracking and feature planning.

2.3.3 Continuous Integration / Continuous Deployment (CI/CD)

Neuronika employs automated workflows to ensure code quality and streamlined deployments:

• GitHub Actions: CI/CD pipeline for testing, building, and deploying code changes automatically.

## UI/UX Design Elements

3.1 Design Philosophy

Neuronika’s design is rooted in minimalism, elegance, and modernity. Key principles include:

• Lightweight visual design to reduce cognitive load

• Focus on user content rather than interface elements

• Modern, clean interfaces inspired by high-quality web applications

3.2 Color Scheme and Typography

3.2.1 Color Palette

• Primary: Dark gray (#1E1E1E) for the main interface background

• Secondary: Light gray (#E0E0E0) for primary text

• Accent: Vibrant contrasting color for highlights (TBD)

3.2.2 Typography

• Primary Font: Inter—modern, highly readable sans-serif

• Secondary Font: Montserrat—clean, professional headings

• Font Sizes:

– Body text: 16px

– Headings: 24px, 20px, 18px (H1, H2, H3)

– UI elements: 14px

3.3 Main Interface Components

3.3.1 Top Bar

• Search Bar: Centered, occupying 75% of the top bar width

• Content View Slider: Top left corner, allows switching between column, folder and graph views

3.3.2 Main Content Area

• Default View: 8 columns of note cards, size of the card depends on the amount of content within
the card, relative to all other cards. This means cards with the most number of characters/words
are biggest while ones with the least number of words/characters are the smallest.

• Note Card:

– Title: Bold, 18px

– Card content: 14px, will display as many lines of the actual note as it fits

– Tags: Displayed at the bottom of the card, will be able to edit, remove or add tags

3.3.3 Semantic Search Bar

• A simple search bar that is more than just a ”fuzzy search”

3.3.4 Folder View

• Dynamic folder hierarchy generated with the tags

• Top level folders have the most number of items, so if a tag exists on more notes than another tag,
it would be the top folder

• An example is if there are 2 documents under ”Exercise”, one with the additional tag ”Cardio”
and one with the additional tag ”Strength Training”, the top folder would be ”Exercise” with the
subfolders ”Cardio” and ”Strength Training” and the subfolders would contain the respective files.

3.3.5 Graph View

• Interactive network diagram representing notes and tags

• Nodes represent tags; leaves represent individual notes

• Supports dragging, zooming, and clicking to open notes

3.3.6 Note Taking

• You will be able to click on any note in the masonry board layout and edit it

• This way you get to decide how large you want to keep the note while writing in it

3.4 Responsive Design

3.4.1 Desktop

• Full feature set with optimal layout for large screens

• Keyboard navigation support

3.4.2 Tablet and Mobile

• Adjusted number of columns in the main view

• Touch-optimized interactions

• Simplified graph view with enhanced touch areas

## Features and Requirements

4.1 Tier 1: Critical Core Features

4.1.1 Extra Large (XL)

• AI-powered automatic tag generation Implemented using AI APIs such as OpenRouter and
Hugging Face Inference API to dynamically generate relevant tags based on note content.

4.1.2 Large (L)

• Endless pool interface Features a masonry-style, dynamic note display layout without pagination,
implemented using react-grid-layout. Optimised for efficient rendering of large datasets.

• Typo-tolerant full-text search Provides a flexible, error-resilient search experience using Fuse.js
for fuzzy matching and typo correction.

4.1.3 Medium (M)

• Rich text note creation and editing Users can create and edit text notes with Markdown sup-
port. Implemented using react-markdown alongside remark-math, rehype-katex, and react-syntax-highlighter
for mathematical notation and syntax highlighting.

4.2 Tier 2: Important Features

4.2.1 Extra Large (XL)

• Adaptive tagging system Collects all existing tags and their associated files to prioritise fre-
quently used tags for new notes, minimising tag fragmentation and improving relevance.

• AI-generated folder hierarchies Dynamically organises notes into structured folders based on
AI-generated tags. This feature is coded from scratch to enable automatic categorisation.

4.2.2 Large (L)

• Full context-aware semantic search Leverages Pinecone for high-performance vector-based
search, enabling semantic understanding and retrieval of notes.

• Interactive knowledge graph Generates a dynamic knowledge graph for visualising relationships
between notes, implemented using vis.js. Nodes are automatically assigned based on AI-generated
folder structures.

• Intelligent tag suggestions Utilises AI models via OpenRouter and Hugging Face APIs to suggest
relevant tags dynamically based on content.

4.2.3 Medium (M)

• Dynamic view switching Allows users to toggle between column, folder, and graph-based views
for enhanced note organisation. This feature is custom-coded and optimised for a seamless UI
experience.

## Implementation Plan and Roadmap

5.1 Project Background and Description

Traditional note-taking applications tend to rely on manual tagging and static folder structures, often
leading to inefficiencies and duplicated effort. Neuronika aims to resolve these issues by providing infi-
nite note storage, AI-powered tagging, semantic search, adaptive folder hierarchies, and an interactive
knowledge graph. This chapter details our redesigned plan and roadmap, aligning precisely with the
twelve-week Gantt chart (shown separately) and the accompanying evaluation framework.

5.2 Implementation Steps and Phases

5.2.1 Phase 1: Core Infrastructure and Basic Note-Taking (Weeks 1–3)

Project Setup (1 week)

• Initial Configuration: Establish the React + Vite project structure with TypeScript.

• Styling and Components: Integrate Tailwind CSS and shadcn/ui for a consistent, maintainable
UI.

• Deployment Pipeline: Configure Vercel for automated builds and continuous delivery; activate
GitHub Actions for CI.

• State Management Framework: Install and set up Zustand to manage note data in-memory.

Core Note Interface (2 weeks)

• Infinite Note Storage (Interactive Masonry Board): Implement a scrollable, responsive
layout using react-grid-layout so files can expand or contract based on word count. Notes with
more text become larger tiles in the “endless pool.”

• Basic Text Editing: Provide headings, paragraphs, and simple formatting (bold/italic) with a
lightweight Markdown approach (react-markdown).

• Performance Optimisation: Include virtual or lazy loading for large numbers of notes to ensure
responsive scrolling.

5.2.2 Phase 2: Note Organisation and Retrieval (Weeks 3–6)

Search and Filtering System (2 weeks)

• Semantic Search Bar: Introduce Fuse.js for quick fuzzy keyword lookups.

• Context-Aware Semantic Search (Initial Integration): Begin using Pinecone to index note
embeddings, enabling deeper context-based retrieval.

• Relevance-Based Ranking: Combine lexical matches with vector similarities to present the most
pertinent results first.

• Tag-Based Filtering: Allow users to filter by existing or newly created tags, refining the result
set rapidly.

Manual and Multi-Level Tagging (1 week)

• Manual Tag Editing: Ensure users can add or remove tags freely, aligning the system with
real-world note structures.

• Multi-Level Tag Categorisation: Lay groundwork for hierarchical or nested tags, paving the
way for advanced folder functionality.

• Tag Visual Indicators: Colour-code or group tags for clearer organisation.

Enhancements to the “Endless Pool” Interface (1 week)

• Dynamic Note Organisation and Sizing: Adjust note tile sizes in real time based on content
length or user interaction.

• Responsive Layout Testing: Validate across mobile, tablet, and desktop to guarantee a consis-
tent user experience.

5.2.3 Phase 3: AI Integration and Advanced Features (Weeks 6–9)

Automatic Adaptive Tagging (3 weeks)

• Context-Aware Tag Generation: Integrate OpenRouter/Hugging Face APIs to propose intel-
ligent tags based on each note’s content.

• Adaptive Tagging Logic: Track whether automatically generated tags are accepted, merged, or
altered by users; refine subsequent tag suggestions accordingly.

• Multi-Note Batch Processing: Handle multiple notes at once to reduce API overhead and
expedite tag generation for large-scale projects.

Enhanced Search Implementation (1 week)

• Vector-Based Search Expansion: Incorporate deeper Pinecone queries, improving semantic
understanding of user queries (natural language).

• Relevance Tuning: Balance short-tail keyword queries with longer, contextual queries, showing
best matches consistently.

• Performance Metrics: Track retrieval times, especially under large note loads, to optimise the
search pipeline.

5.3 Phase 4: Visualisation and Final Integration (Weeks 9–12)

Dynamic Folder Generation (2 weeks)

• Automatic Multi-Level Folder Hierarchy: Transform parent-child tags into nested folders,
where each note can reside under multiple relevant branches.

• Multiple Folder Inclusion: Ensure that a single file can appear across different folders without
duplication (using references to unify them).

• Scalability and Robustness Checks: Test folder generation performance with hundreds or
thousands of notes.

Interactive Visual Graph (2 weeks)

• Tag-Based Graph Generation: Use vis.js (or a similar library) to represent each note and
tag as interconnected nodes.

• Automatic Relationship Mapping: Create links where notes share tags or contexts, allowing
users to discover related content visually.

• Optimised Rendering: Implement panning, zooming, and minimal re-renders for a smooth user
experience, even with large note graphs.

5.3.1 Ongoing Throughout Development

• Performance Monitoring: Regularly test memory usage and load times using browser profiling
tools.

• Code Quality and Collaboration: Maintain consistent linting (ESLint), code reviews, and
GitHub Projects for task tracking.

• User Feedback Loop: Gather input from alpha/beta users, addressing any concerns or new
requirements swiftly.

5.4 Evaluation Methodology

The Neuronika Evaluation Chart designates each feature’s measurement method and success criteria:

• Infinite Note Storage (Objective Evaluation)

– Measurement Method: Verify if note tiles are resized in proportion to their content and freely
movable on the interactive board.

– Definition of Success: Larger notes expand automatically; performance remains stable even
with many large tiles.

• Note-Taking (User-Based Evaluation)

– Measurement Method: Survey users regarding the editor’s capability to handle headings, text
formatting, code blocks, and mathematical notation.

– Definition of Success: Users confidently create any type of note (from simple text to multi-line
code snippets).

• Automatic Adaptive Tagging (Objective Evaluation)

– Measurement Method: Examine assigned tags for accuracy and reuse across similar notes,
minimising fragmentation.

– Definition of Success: AI captures core contexts and reuses existing tags where applicable;
new tags only emerge for genuinely unique content.

• Semantic Search Bar (User-Based Evaluation)

– Measurement Method: Compare user retrieval times and satisfaction against alternative plat-
forms like Notion or Obsidian.

– Definition of Success: Neuronika proves faster or more intuitive for discovering notes with
both keyword and context-based queries.

• Dynamic Folder Hierarchy (User-Based Evaluation)

– Measurement Method: Track how effortlessly users navigate or reorganise notes through auto-
matically generated folder structures.

– Definition of Success: Majority find the folder hierarchy aligns well with their mental models,
reducing manual classification effort.

• Interactive Visual Graph (User-Based Evaluation)

– Measurement Method: Record qualitative feedback on the clarity and usefulness of the graph’s
connections; measure whether it aids discovering related notes.

– Definition of Success: Users report an improved understanding of note relationships; perfor-
mance remains smooth as data scales.

5.5 Potential Challenges and Mitigation Strategies

5.5.1 Ensuring High-Quality Tag Generation

• Model Selection and Tuning: Choose suitable OpenRouter or Hugging Face models and refine
them if tags repeatedly miss context.

• API Reliability: Implement fallback handling (caching, retries) to mitigate service downtime or
latency spikes.

5.5.2 Balancing Visual Complexity with Performance

• Progressive Loading: Render incremental chunks of notes in the infinite board and partial graph
loading for large datasets.

• Virtualisation Techniques: Reduce DOM elements in view at once to retain smooth scrolling
and panning.

5.5.3 Maintaining Clarity in Multi-Level Tag Structures

• Merge and Split Tags: Provide user-friendly ways to combine or separate tags if misclassifications
occur.

• Adaptive Refresh: Rebuild folder hierarchies dynamically while preserving user-driven reassign-
ments.

5.6 Total Estimated Duration

Based on the updated Gantt chart structure:

• Phase 1 (Weeks 1–3): Core infrastructure, infinite board, basic note creation.

• Phase 2 (Weeks 3–6): Advanced text editing, semantic search foundation, manual/multi-level
tagging.

• Phase 3 (Weeks 6–9): Adaptive tagging refinement, enhanced vector-based retrieval.

• Phase 4 (Weeks 9–12): Dynamic folder generation, interactive visual graph, final integration.

This design ensures Neuronika can be deployed with fully functional features within a 12-week time-
frame. Continuous evaluations will verify that each milestone meets both functional and performance
criteria, culminating in a robust, intelligent note-taking system.
