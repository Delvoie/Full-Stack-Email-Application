const { useEffect, useState, useCallback } = React;

function App() {
    const [mail, setMail] = useState([]);
    const [accessToken, setAccessToken] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // User is not logged in
    const [error, setError] = useState('');

    /* Handle and log errors (console.log is fine) from this form submission (POST to /node/login) */
    const handleLogin = async (event) => {
        event.preventDefault();
        setError(''); // clear errors

        try {
            const response = await fetch('/node/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setAccessToken(data.accessToken);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Login error:', error);
            setError('Incorrect username or password.');
        }
    };

    /* Display all mail entries (just the name is fine) that the user is allowed to see (GET /api/mail) */
    const fetchMail = useCallback(async () => {
        if (!accessToken) return;

        try {
            const response = await fetch('/api/mail', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setMail(data);
        } catch (error) {
            console.error('Error fetching mail:', error);
            setError('Error fetching mail');
        }
    }, [accessToken]);

    /* Allow the user to create new entries (requiring the access token in the header) (POST /api/mail) */
    const handleMailInsert = useCallback(async (event) => {
        event.preventDefault();
        setError('');

        const {
            name: { value: name },
            message: { value: message },
        } = event.target;
// Clear the input fields after submitting
        event.target.name.value = '';
        event.target.message.value = '';

        try {
            const response = await fetch('/api/mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ name, message }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            event.target.name.value = '';
            event.target.message.value = '';

            fetchMail();
        } catch (error) {
            console.error('Error inserting mail:', error);
            setError('Error inserting mail');
        }
    }, [accessToken, fetchMail]);

    useEffect(() => {
        if (accessToken) {
            fetchMail();
        }
    }, [accessToken, fetchMail]);

    /* Display a login form on a load that accepts a username and password */
    function renderLoginForm() {
        return (
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        src="https://images.metmuseum.org/CRDImages/as/original/DP130155.jpg"
                        alt="Katsushika Hokusai artwork"
                        className="rounded-full md:object-cover mx-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm/6 font-medium text-black">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm/6 font-medium text-black">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }


    const handleLogout = () => {
        setAccessToken(null);
        setIsLoggedIn(false);
        setMail([]);
        setUsername('');
        setPassword('');
        setError('');
    };

// Logged in user
    function renderDashboard() {
        return (
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h1>Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-400"
                    >
                        Logout
                    </button>
                </div>
                <form onSubmit={handleMailInsert}>
                    <input name="name" placeholder="Name" required />
                    <input name="message" placeholder="Message" required />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md transition-colors duration-200"
                    >Add Mail</button>
                </form>
                <div>
                    <h2>Mail:</h2>
                    {mail.map((entry, index) => (
                        <div key={index}>
                            <strong>{entry.name}</strong>: {entry.message}
                        </div>
                    ))}
                </div>
            </div>
        );
    }


    function renderContent() {
        return isLoggedIn ? renderDashboard() : renderLoginForm();
    }

    return renderContent();
}

ReactDOM.render(<App />, document.getElementById("root"));