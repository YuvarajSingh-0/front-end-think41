import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [userMessage, setUserMessage] = useState("");
  const [dbSchemaMessage, setDbSchemaMessage] = useState("");
  const [sqlResponse, setSqlResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/generate-sql", {
        userMessage: userMessage,
        dbSchema: dbSchemaMessage,
      });
      setSqlResponse(response.data.sqlQuery.content);
    } catch (error) {
      console.error("Error generating SQL query:", error);
      setSqlResponse("Failed to generate SQL query.");
    }
  };

  return (
    <div className="container">
      <h1>AI SQL Query Generator</h1>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="userMessage">Paste the DB Schema</label>
        <textarea
          id="dbSchema"
          rows="4"
          value={dbSchemaMessage}
          onChange={(e) => setDbSchemaMessage(e.target.value)}
          placeholder="CREATE TABLE employees (
                              id INT PRIMARY KEY,
                              name VARCHAR(100),
                              role VARCHAR(50),
                              salary DECIMAL(10, 2),
                              department_id INT
                            );
                            CREATE TABLE departments (
                              id INT PRIMARY KEY,
                              department_name VARCHAR(100)
                            );"
        />
        <label htmlFor="userMessage">Ask your question:</label>
        <textarea
          id="userMessage"
          rows="4"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="E.g., List all employees in the 'Engineering' department"
        />
        <button type="submit">Generate SQL</button>
      </form>
      {sqlResponse && (
        <div className="result">
          <h2>Generated SQL Query:</h2>
          <pre>{sqlResponse}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
