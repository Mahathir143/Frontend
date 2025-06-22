const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <p className="mb-0 text-muted">
                            © {currentYear} Frontend App. All rights reserved. Built with React + Vite + Bootstrap
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;