import * as z from "zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
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
import { useCreatePost } from '@/lib/react-query/queries'
import Loader from "./Loader"

type PostFormProps = {
    post?: any,
    action: "Créer" | "Mettre à jour";
};

const PostValidation = z.object({
    caption: z.string().min(5, { message: "Minimum 5 caractères" }).max(200, { message: "Maximum 200 caractères" }),
    file: z.string().min(1),
    location: z.string().min(1, { message: "Ce champs est requis" }).max(100, { message: "Maximum 100 caractères" }),
    tags: z.string(),
});

const PostForm = ({ post, action }: PostFormProps) => {
    const navigate = useNavigate();
    const { user } = useUserContext()
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: "",
            file: "",
            location: "",
            tags: "",
        },
    });
    const { mutateAsync: createPost, isLoading: isLoadingCreate } =
        useCreatePost();

    const handleSubmit = async (value: z.infer<typeof PostValidation>) => {
        try {
            const response = await createPost({
                ...value,
                author: user.iduser!
            });
            if (response.status && response.status === 1) {
                navigate("/")
            }
        } catch (error) {
            let message = "Erreur lors de la création du post";
            if (error instanceof Error) message = error.message
            console.error(message)
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
                                mediaUrl={post?.imageUrl}
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
                        {isLoadingCreate && <Loader />}
                        {action} un post
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default PostForm;