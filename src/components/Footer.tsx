import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer" aria-label="Site footer">
            <div className="footer__container">
                <p className="footer__copy">© {new Date().getFullYear()} Alex — Built with React</p>
                <ul className="footer__links">
                    <li><a href="/projects/project-1.html">Project 1</a></li>
                    <li><a href="/projects/project-2.html">Project 2</a></li>
                    <li><a href="/projects/project-3.html">Project 3</a></li>
                    <li><a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                </ul>
            </div>
        </footer>
    );
}
