"use client";

import config from "@/lib/config";
import { IKUpload, IKImage, IKContext, IKVideo } from "imagekitio-react";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  const ikUploadRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });
  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const onError = (error: any) => {
    console.error(error);
    toast({
      title: `${type} upload failed`,
      description: `Your ${type} could not be uploaded. Please try again.`,
      variant: "destructive",
    });
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: `${type} uploaded successfully`,
      description: `${res.filePath} uploaded successfully!`,
    });
  };

  const onValidate = (file: File) => {
    const sizeLimitMB = type === "image" ? 20 : 50;
    if (file.size > sizeLimitMB * 1024 * 1024) {
      toast({
        title: "File size too large",
        description: `Please upload a file less than ${sizeLimitMB}MB in size.`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
        fileName="test-upload.png"
      />

      <button
        className={cn("upload-btn", styles.button)}
        onClick={(e) => {
          e.preventDefault();
          ikUploadRef.current?.click();
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
        {file.filePath && (
          <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
        )}
      </button>

      {progress > 0 && progress != 100 && (
        <div className="mt-2 w-full  rounded-full bg-green-200 ">
          <div
            className="progress text-sm text-center rounded-full bg-green-500 text-white "
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      {file.filePath &&
        (type === "image" ? (
          <IKImage
            alt="uploaded-image"
            path={file.filePath}
            width={500}
            height={500}
            className="mt-4 rounded-xl"
          />
        ) : (
          <IKVideo
            path={file.filePath}
            controls
            className="h-96 w-full rounded-xl mt-4"
          />
        ))}
    </IKContext>
  );
};

export default FileUpload;
