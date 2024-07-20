import { useCallback, useState } from "react"
import { FileWithPath, useDropzone } from "react-dropzone"
import { Button } from "./ui"
import { convertFileToUrl } from "@/lib/utils"

type FileUploaderProps = {
    fieldChange: (files: File) => void;
    mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
    const [file, setFile] = useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            console.log('acceptedFiles', acceptedFiles)
            setFile(acceptedFiles);
            fieldChange(acceptedFiles[0]);
            const convertedFileUrl = convertFileToUrl(acceptedFiles[0]);

            setFileUrl(convertedFileUrl);
        },
        [file]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpeg", ".jpg"],
        },
    });

    return (
        <div
            {...getRootProps()}
            className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer">
            <input {...getInputProps()} className="cursor-pointer" type="file" name="image" />

            {fileUrl ? (
                <>
                    <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
                        <img src={fileUrl} alt="image" className="file_uploader-img" />
                    </div>
                    <p className="file_uploader-label">Selectionner une nouvelle photo</p>
                </>
            ) : (
                <div className="file_uploader-box ">
                    <img
                        src="public/assets/images/file-upload.svg"
                        width={96}
                        height={77}
                        alt="file upload"
                    />

                    <h3 className="base-medium text-light-2 mb-2 mt-6">
                        Déplacer la photo içi
                    </h3>
                    <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

                    <Button type="button" className="shad-button_dark_4">
                        Selectionner la photo
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
