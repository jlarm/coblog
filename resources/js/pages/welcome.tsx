import { Head } from '@inertiajs/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState, useEffect } from 'react';

interface Post {
    uuid: string,
    title: string,
    body: string,
    created_at: string,
}

interface WelcomeProps {
    posts: Post[];
}

export default function Welcome({ posts }: WelcomeProps) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check initial theme
        setIsDark(document.documentElement.classList.contains('dark'));

        // Watch for theme changes
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-background">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <header className="mb-12 text-center">
                        <h1 className="text-4xl font-bold text-foreground mb-4">
                            CoBlog
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            A simple markdown blog built with Laravel & React
                        </p>
                    </header>

                    {posts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">
                            No posts yet.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {posts.map((post) => (
                            <article key={post.uuid} className="bg-card border border-border rounded-lg p-6 shadow-sm">
                                <header className="mb-4">
                                    <h2 className="text-2xl font-semibold text-foreground mb-1">
                                        {post.title}
                                    </h2>
                                    <time className="text-sm text-muted-foreground">
                                        {post.created_at}
                                    </time>
                                </header>

                                <div className="prose prose-neutral textsm dark:prose-invert max-w-none">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            h1: ({ children }) => (
                                                <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
                                            ),
                                            h2: ({ children }) => (
                                                <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
                                            ),
                                            h3: ({ children }) => (
                                                <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
                                            ),
                                            code: ({ inline, className, children, ...props }) => {
                                                const match = /language-(\w+)/.exec(className || '');
                                                const language = match ? match[1] : '';
                                                
                                                if (inline) {
                                                    return (
                                                        <code
                                                            className="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground"
                                                            {...props}
                                                        >
                                                            {children}
                                                        </code>
                                                    );
                                                }
                                                
                                                return (
                                                    <div className="relative my-4">
                                                        {language && (
                                                            <div className="absolute top-0 right-0 bg-muted-foreground text-background text-xs px-2 py-1 rounded-bl-md rounded-tr-lg font-medium">
                                                                {language}
                                                            </div>
                                                        )}
                                                        <SyntaxHighlighter
                                                            style={isDark ? oneDark : oneLight}
                                                            language={language}
                                                            PreTag="div"
                                                            className="!mt-0 !mb-0"
                                                            customStyle={{
                                                                margin: 0,
                                                                borderRadius: '8px',
                                                                fontSize: '13px',
                                                                lineHeight: '1.4',
                                                                padding: '16px',
                                                                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                                                            }}
                                                            {...props}
                                                        >
                                                            {String(children).replace(/\n$/, '')}
                                                        </SyntaxHighlighter>
                                                    </div>
                                                );
                                            },
                                            blockquote: ({ children }) => (
                                                <blockquote className="border-l-4 border-muted-foreground pl-4 italic text-muted-foreground">
                                                    {children}
                                                </blockquote>
                                            ),
                                        }}
                                    >
                                        {post.body}
                                    </ReactMarkdown>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
                </div>
            </div>
        </>
    );
}
