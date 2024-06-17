import React, { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop, PercentCrop } from "react-image-crop";
import { canvasPreview } from "./CanvasPreview";
import s from "./ImageCrop.module.scss";
import ButtonMain from "../../ui/Button/ButtonMain/ButtonMain";

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: "px",
                width: 150,
                height: 150,
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
}

interface IImageCropProps {
    imageSrc: string;
    aspect: number;
    asyncDrawPreview?: boolean;
    circularCrop?: boolean;
    previewWidth?: number;
    onSave: (image: Blob | null) => void;
    onCancel?: () => void;
}
const ImageCrop: FC<IImageCropProps> = ({
    imageSrc,
    aspect,
    asyncDrawPreview = false,
    circularCrop = false,
    previewWidth = 150,
    onSave,
    onCancel,
}) => {
    const [load, setLoad] = useState(false);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (load) {
            canvasPreview(imgRef.current!, previewCanvasRef.current!, completedCrop!, 1, 0);
        }
    }, [load]);

    const imageLoadHandler = async (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = e.currentTarget;
        const pixelCrop = centerAspectCrop(width, height, aspect);
        if (!crop || !completedCrop) {
            setCrop(pixelCrop);
            setCompletedCrop(pixelCrop);
            setLoad(true);
        }
    };
    const completeHandler = async (crop: PixelCrop) => {
        setCompletedCrop(crop);
        if (imgRef.current && previewCanvasRef.current && asyncDrawPreview) {
            await canvasPreview(imgRef.current, previewCanvasRef.current, crop, 1, 0);
        }
    };

    const changeHandler = async (pixelCrop: PixelCrop, percentCrop: PercentCrop) => {
        setCrop(percentCrop);
        if (imgRef.current && previewCanvasRef.current && !asyncDrawPreview) {
            await canvasPreview(imgRef.current, previewCanvasRef.current, pixelCrop, 1, 0);
        }
    };

    const clickSaveHandler = useCallback(() => {
        previewCanvasRef.current?.toBlob(onSave);
    }, []);

    return (
        <div>
            <div className={s.crop_container}>
                <ReactCrop
                    crop={crop}
                    onChange={changeHandler}
                    onComplete={completeHandler}
                    circularCrop={circularCrop}
                    aspect={aspect}
                >
                    <img
                        key={"crop-image"}
                        ref={imgRef}
                        alt="Crop me"
                        src={imageSrc}
                        onLoad={imageLoadHandler}
                    />
                </ReactCrop>
                {!!completedCrop && (
                    <canvas
                        ref={previewCanvasRef}
                        style={{
                            borderRadius: circularCrop ? "50%" : "0",
                            objectFit: "contain",
                            width: previewWidth,
                            height: 149,
                        }}
                    />
                )}
            </div>
            <div className={s.actions_container}>
                <ButtonMain
                    variant={"invert"}
                    onClick={onCancel}
                >
                    Отменить
                </ButtonMain>
                <ButtonMain onClick={clickSaveHandler}>Сохранить</ButtonMain>
            </div>
        </div>
    );
};

export default memo(ImageCrop);
