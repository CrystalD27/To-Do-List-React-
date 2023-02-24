import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <main>
            <h2>Page Not Found</h2>
            <p>
                <Link to="/">Visit Our Homepage</Link>
            </p>
        </main>
    );
};
