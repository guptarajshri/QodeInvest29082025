import blogs from '@/data/blogs.mock.json';

export default function Home() {
    return (
        <>
            <div className="h1">Home</div>

            {/* Cards row */}
            <div className="row cols-3">
                <div className="col-md-12 col-lg-4 col-xl-4">
                    <div className="card" style={{ position: 'relative' }}>
                        <a
                            href="/not-found"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="material-symbols-outlined"
                            style={{ position: 'absolute', top: 12, right: 12, fontSize: 20, color: '#6b7280' }}
                        >
                            open_in_new
                        </a>

                        <div className="h2">Get started</div>
                        <div className="muted">
                            Read our getting started guide to get the most out of your subscription.
                        </div>
                    </div>
                </div>

                <div className="col-md-12 col-lg-4 col-xl-4">
                    <div className="card" style={{ position: 'relative' }}>
                        <a
                            href="/not-found"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="material-symbols-outlined"
                            style={{ position: 'absolute', top: 12, right: 12, fontSize: 20, color: '#6b7280' }}
                        >
                            open_in_new
                        </a>

                        <div className="h2">Community</div>
                        <div className="muted">
                            Join the conversation on our exclusive community on Slack for subscribers.
                        </div>
                    </div>
                </div>

                <div className="col-md-12 col-lg-4 col-xl-4">
                    <div className="card" style={{ position: 'relative' }}>
                        <a
                            href="/not-found"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="material-symbols-outlined"
                            style={{ position: 'absolute', top: 12, right: 12, fontSize: 20, color: '#6b7280' }}
                        >
                            open_in_new
                        </a>

                        <div className="h2">Visit website</div>
                        <div className="muted">
                            Keep up with our latest content on our website.
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Section */}
            <div style={{ marginTop: 24 }} className="h2">
                Latest Posts
            </div>
            <div className="blog-grid col-md-12 col-lg-12 col-xl-12">
                {blogs.map((b) => (
                    <article key={b.id} className="blog ">
                        {/* <img src={b.image} alt="blog" /> */}
                        <div >
                            <div className="muted">{new Date(b.date).toDateString()}</div>
                            <h4>{b.title}</h4>
                            <p>{b.excerpt}</p>
                            <a className="button" href={b.href} target="_blank" rel="noopener noreferrer">
                                Read full post
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </>
    );
}
