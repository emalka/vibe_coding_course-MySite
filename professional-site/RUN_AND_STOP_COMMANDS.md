# Run and Stop Commands

## 1) Install dependencies (one-time or after package changes)

From workspace root:
```bash
cd /Users/emalka/Data/Dev/AI/courses/Vibe_Coder_to_Agentic_Enginner/code/vibe_coding_course-MySite
npm --prefix professional-site install
```
Short explanation: Installs all required packages for the Next.js app inside `professional-site`.

From app folder:
```bash
cd /Users/emalka/Data/Dev/AI/courses/Vibe_Coder_to_Agentic_Enginner/code/vibe_coding_course-MySite/professional-site
npm install
```
Short explanation: Same install step, but run directly from the app directory.

## 2) Start the development server

From workspace root:
```bash
cd /Users/emalka/Data/Dev/AI/courses/Vibe_Coder_to_Agentic_Enginner/code/vibe_coding_course-MySite
npm --prefix professional-site run dev
```
Short explanation: Starts Next.js dev server for the app in `professional-site`.

From app folder:
```bash
cd /Users/emalka/Data/Dev/AI/courses/Vibe_Coder_to_Agentic_Enginner/code/vibe_coding_course-MySite/professional-site
npm run dev
```
Short explanation: Starts the same server when you are already in the app directory.

## 3) Stop the development server

Stop server on port 3000:
```bash
kill $(lsof -tiTCP:3000 -sTCP:LISTEN)
```
Short explanation: Kills the process currently listening on port 3000.

Stop server on port 3001 (if 3000 was busy and Next.js switched):
```bash
kill $(lsof -tiTCP:3001 -sTCP:LISTEN)
```
Short explanation: Kills the process listening on port 3001.

Safer version (no error if nothing is running):
```bash
pid=$(lsof -tiTCP:3000 -sTCP:LISTEN); [[ -n "$pid" ]] && kill "$pid"
pid=$(lsof -tiTCP:3001 -sTCP:LISTEN); [[ -n "$pid" ]] && kill "$pid"
```
Short explanation: Stops the server only if a process exists on each port.
