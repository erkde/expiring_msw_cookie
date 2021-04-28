import './App.css';
import React from 'react';

function App() {
  const [ session, setSession ] = React.useState({ authenticated: false })

  React.useEffect(() => {
    async function fetchSession() {
      const response = await fetch("/api/session")
      const data = await response.json();

      setSession({ ...data });
    }

    fetchSession();
  }, [setSession]);

  async function handleLogin() {
    const response = await fetch("/api/session", { method: "POST" })
    const data = await response.json()

    setSession({ ...data })
  }

  async function handleLogout() {
    const response = await fetch("/api/session", { method: "DELETE" })
    const data = await response.json()

    setSession({ ...data })
  }

  return (
    <div className="App">
      <h2>You are {session.authenticated ? `` : `not`} authenticated</h2>

      {session.authenticated ? (
        <button onClick={handleLogout}>Log out</button>
      ) : (
        <button onClick={handleLogin}>Log in</button>
      )}

    </div>
  );
}

export default App;
