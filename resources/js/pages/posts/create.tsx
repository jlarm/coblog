import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '@/components/ui/button';
import PostController from '@/actions/App/Http/Controllers/PostController';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Post',
        href: 'create-post',
    },
];

export default function CreatePost() {
    const [body, setBody] = useState('');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Post" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-semibold">Create New Post</h1>
                    <p className="text-muted-foreground">
                        Write your post using markdown formatting
                    </p>
                </div>

                <Form
                    action={PostController.store.url()}
                    method="post"
                    className="flex flex-col gap-6"
                >
                    {({ errors, processing}) => (
                        <>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder="Enter your post title"
                                    className="w-full"
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title}</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="body">Content</Label>
                                <div data-color-mode="light" className="dark:data-color-mode-dark">
                                    <MDEditor
                                        value={body}
                                        onChange={(value) => setBody(value || '')}
                                        preview="edit"
                                        visibleDragbar={false}
                                        textareaProps={{
                                            name: 'body',
                                            placeholder: 'Write your post content in markdown...',
                                        }}
                                        height={400}
                                    />
                                </div>
                                {errors.body && (
                                    <p className="text-sm text-destructive">{errors.body}</p>
                                )}
                            </div>

                            <div className="flex justify-end gap-3">
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Post'}
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
