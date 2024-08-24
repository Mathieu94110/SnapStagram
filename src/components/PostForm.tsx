import * as z from "zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-hot-toast'
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormField,
    FormItem,
    FormMessage,
    Button,
    Input,
    Textarea,
} from '@/components/ui'
import FileUploader from "./FileUploader"
import { useUserContext } from '@/context/AuthContextProvider'
import { useCreatePost, useUpdatePost } from '@/lib/react-query/queries'
import Loader from "./Loader"
import { TNewPostData } from "@/types"

type PostFormProps = {
    post?: TNewPostData,
    action: "Créer" | "Mettre à jour";
};

const MAX_FILE_SIZE = 10000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/svg", "image/webp"];

const PostValidation = z.object({
    caption: z.string().min(5, { message: "Minimum 5 caractères" }).max(200, { message: "Maximum 200 caractères" }),
    file: z
        .instanceof(File)
        .optional()
        .refine(
            (file) => !file || file.size !== 0 || file.size <= MAX_FILE_SIZE,
            `Max image size is ${MAX_FILE_SIZE / 1000}MB`
        )
        .refine(
            (file) =>
                !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only .jpg, .jpeg, and .png formats are supported"
        ),
    location: z.string().min(1, { message: "Ce champs est requis" }).max(100, { message: "Maximum 100 caractères" }),
    tags: z.string(),
});

const PostForm = ({ post, action }: PostFormProps) => {
    const navigate = useNavigate();
    const { user } = useUserContext()
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post && post.data ? post.data.caption : "",
            file: undefined,
            location: post && post.data ? post.data.location : "",
            tags: post && post.data ? Array.isArray(post.data.tags) ? post.data.tags.join(",") : post.data.tags : "",
        },
    });
    const { mutateAsync: createPost, isLoading: isLoadingCreate } =
        useCreatePost();
    const { mutateAsync: updatePost, isLoading: isLoadingUpdate } =
        useUpdatePost();

    const handleSubmit = async (value: z.infer<typeof PostValidation>) => {
        const formData = new FormData();
        if (post && post.data) {
            formData.append('idpost', JSON.stringify(post.data.idpost));
        };
        formData.append('caption', value.caption)
        formData.append('location', value.location)
        formData.append('tags', value.tags)
        if (value.file) {
            formData.append('file', value.file)
        }
        formData.append('author', user.userName);
        formData.append('authorId', JSON.stringify(user.iduser));
        if (post && action === "Mettre à jour") {
            const response = await updatePost(formData);
            if (response.status === 1) {
                toast.success('Post mis à jour !');
            }
        } else {
            try {
                if (user.iduser) {
                    const response = await createPost(formData);
                    if (response.status === 1) {
                        toast.success('Post créer avec succès !');
                        navigate("/home")
                    }
                }
            } catch (error) {
                let message = "Erreur lors de la création du post";
                if (error instanceof Error) message = error.message
                console.error(message)
            }
        }
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-9 w-full  max-w-5xl">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <label className="shad-form_label">Légende</label>
                            <Textarea
                                className="shad-textarea custom-scrollbar"
                                {...field}
                            />
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <label className="shad-form_label">Ajouter des photos</label>
                            <FileUploader
                                fieldChange={field.onChange}
                                mediaUrl={post?.data?.image ? `http://localhost:8888/api/${JSON.stringify(post?.data.image).slice(4, -1)}` : ''}
                            />
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <label className="shad-form_label">Ajouter le lieu</label>
                            <Input type="text" className="shad-input" {...field} />
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <label className="shad-form_label">
                                Ajouter des tags (separarés par des virgules)
                            </label>
                            <Input
                                placeholder="Art, politique, sport ..."
                                type="text"
                                className="shad-input"
                                {...field}
                            />
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4 items-center justify-end">
                    <Button
                        type="button"
                        className="shad-button_dark_4"
                        onClick={() => navigate(-1)}>
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        className="shad-button_primary whitespace-nowrap"
                        disabled={isLoadingCreate}>
                        {isLoadingCreate || isLoadingUpdate && <Loader />}
                        {action} le post
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default PostForm;