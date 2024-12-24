## How to Run
### Backend
1. Open the `back` folder in your terminal.
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Start the backend server:
   ```bash
   python app.py
   ```

### Frontend
1. Open the `front` folder in your terminal.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```
4. Your browser should open automatically with the webpage. If not, navigate to `http://localhost:3000`.

---

## Notes

### Backend
- **Service Design**: 
  - I opted to split the logic into separate services for better maintainability, readability, and adherence to the **Separation of Concerns (SOC)** principle, even though posts were our only resource.
- **Testing**: 
  - I did not include tests for the backend (honestly, I was just lazy), but the structure is ready for tests to be easily added in the future.
- **Response Format**: 
  - All responses are returned in **camelCase** instead of the traditional **snake_case** for Python APIs. This decision aligns with the frontend's JavaScript convention of using camelCase.
- **Simplified Design**: 
  - The backend design prioritizes simplicity and clarity over advanced features.
- **Test Data**:
  - A `testdata.json` file is included for testing additional cases. To use it, replace the commented code in `posts_service`.

### Frontend
- **Simple Design**:
  - The frontend is kept short and simple, following the project requirements.
- **Performance**:
  - I didn’t use `useCallback` or `useMemo` as the current scope and complexity didn’t demand them.
- **Responsiveness**:
  - The frontend is not responsive, as this was not part of the project requirements.

---

## Features
### Backend
- Fetches and processes data from a JSONPlaceholder API to simulate a database.
- Includes endpoints for:
  - `/posts`: Fetch raw data (not in use in frontend).
  - `/anomalies`: Identify anomalies in post data.
  - `/summary`: Provide a summary of top users and trending words.
  
### Frontend
- Displays anomalies in a table with flags for each issue.
- Shows a word cloud of trending words.
- Highlights top users based on their unique word usage.
