import "./not_found.css";

export default function NotFound() {
	return (
		<div className="nf-body">
			<div className="nf-container">
				<h1 className="nf-heading">404</h1>
				<p className="nf-message">
					The page you are looking for cannot be found.
				</p>
				<a href="/signin" className="nf-button">
					Go Back Home
				</a>
				<footer className="nf-footer">
					&copy; 2024 Innovation center. All rights reserved.
				</footer>
			</div>
		</div>
	);
}
